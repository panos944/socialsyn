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
  const re = /['"`](\/images\/[\w\-./%\s]+)['"`]/g;
  const used = new Set<string>();

  for (const f of files) {
    const text = await fs.readFile(f, 'utf8');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      used.add(m[1].replace(/\\s/g, ' ')); // keep encoded spaces as-is if present
    }
  }

  console.log(`Found ${used.size} referenced images.`);
  await ensureDir(usedRoot);

  let copied = 0, missing: string[] = [];
  for (const rel of used) {
    const relRaw = rel.startsWith('/images/') ? rel.slice('/images/'.length) : rel;
    const relPath = decodeURIComponent(relRaw);
    const srcPath = path.join(publicDir, 'images', relPath);
    const dstPath = path.join(usedRoot, relPath);
    try {
      await ensureDir(path.dirname(dstPath));
      await fs.copyFile(srcPath, dstPath);
      copied++;
    } catch {
      missing.push(rel);
    }
  }

  await fs.writeFile(path.join(usedRoot, 'manifest.txt'),
    Array.from(used).sort().join('\n'), 'utf8');

  console.log(`Copied ${copied} files to images-used.`);
  if (missing.length) {
    console.warn('Missing in public:', missing);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });