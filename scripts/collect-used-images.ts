import { promises as fs } from 'fs';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const publicDir = path.join(projectRoot, 'public');
const usedRoot = path.join(publicDir, 'images-used');

async function readFilesRec(dir: string, exts = ['.ts', '.tsx', '.js', '.jsx', '.md', '.json']) {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await readFilesRec(p, exts));
    else if (exts.includes(path.extname(e.name))) out.push(p);
  }
  return out;
}

async function ensureDir(p: string) { await fs.mkdir(p, { recursive: true }).catch(() => {}); }

async function main() {
  const files = await readFilesRec(srcDir);
  // Capture both /images/... and /images-used/... references
  const re = /['"`](\/(?:images|images-used)\/[\w\-./%\s]+)['"`]/g;
  const usedUrlRefs = new Set<string>();
  const usedFsPaths = new Set<string>(); // relative to images-used

  for (const f of files) {
    const text = await fs.readFile(f, 'utf8');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const ref = m[1].replace(/\\s/g, ' ');
      usedUrlRefs.add(ref);
      if (ref.startsWith('/images/')) {
        const relRaw = ref.slice('/images/'.length);
        const relDecoded = decodeURIComponent(relRaw);
        usedFsPaths.add(relDecoded);
      } else if (ref.startsWith('/images-used/')) {
        const relRaw = ref.slice('/images-used/'.length);
        usedFsPaths.add(relRaw);
        usedFsPaths.add(decodeURIComponent(relRaw));
      }
    }
  }

  console.log(`Found ${usedUrlRefs.size} referenced image URLs.`);
  await ensureDir(usedRoot);

  let copied = 0, missing: string[] = [];
  // Copy from /images to /images-used
  for (const ref of usedUrlRefs) {
    if (!ref.startsWith('/images/')) continue;
    const relRaw = ref.slice('/images/'.length);
    const relPath = decodeURIComponent(relRaw);
    const srcPath = path.join(publicDir, 'images', relPath);
    const dstPath = path.join(usedRoot, relPath);
    try {
      await ensureDir(path.dirname(dstPath));
      await fs.copyFile(srcPath, dstPath);
      copied++;
    } catch {
      missing.push(ref);
    }
  }

  await fs.writeFile(path.join(usedRoot, 'manifest.txt'),
    Array.from(usedUrlRefs).sort().join('\n'), 'utf8');

  console.log(`Copied ${copied} files to images-used.`);
  if (missing.length) {
    console.warn('Missing in public:', missing);
  }

  // Cleanup: remove files in images-used that aren't referenced anymore
  async function listFilesRec(dir: string): Promise<string[]> {
    const out: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) out.push(...(await listFilesRec(p)));
      else out.push(p);
    }
    return out;
  }

  async function removeEmptyDirs(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await removeEmptyDirs(p);
    }
    const remaining = await fs.readdir(dir);
    if (dir !== usedRoot && remaining.length === 0) await fs.rmdir(dir).catch(() => {});
  }

  const existing = (await listFilesRec(usedRoot)).filter(p => path.basename(p) !== 'manifest.txt');
  let removed = 0;
  for (const abs of existing) {
    const rel = path.relative(usedRoot, abs);
    if (!usedFsPaths.has(rel)) {
      await fs.unlink(abs).catch(() => {});
      removed++;
    }
  }
  await removeEmptyDirs(usedRoot);
  console.log(`Removed ${removed} stale files from images-used.`);
}

main().catch((e) => { console.error(e); process.exit(1); });