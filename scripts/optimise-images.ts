#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface SizeConfig {
  width: number;
  height: number;
  suffix: string;
}

interface QualityConfig {
  webp: number;
  jpeg: number;
  png: number;
}

interface OptimizationConfig {
  inputDir: string;
  outputDir: string;
  sizes: Record<string, SizeConfig>;
  quality: QualityConfig;
  supportedExtensions: string[];
  skipFiles: string[];
}

interface OptimizationResult {
  size: string;
  filename: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
}

// Configuration
const config: OptimizationConfig = {
  inputDir: path.join(__dirname, '../public'),
  outputDir: path.join(__dirname, '../public/optimized'),
  sizes: {
    small: { width: 300, height: 300, suffix: '-300' },
    medium: { width: 600, height: 600, suffix: '-600' },
    large: { width: 1200, height: 1200, suffix: '-1200' }
  },
  quality: {
    webp: 85,
    jpeg: 85,
    png: 90
  },
  // File extensions to process
  supportedExtensions: ['.jpg', '.jpeg', '.png', '.heic', '.JPG', '.JPEG', '.PNG', '.HEIC'],
  // Files to skip (logos, icons, etc.)
  skipFiles: ['logo.svg', 'vite.svg', 'favicon.ico']
};

/**
 * Ensure directory exists
 */
async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

/**
 * Get all image files from input directory recursively
 */
async function getImageFiles(dir: string): Promise<{path: string, relativePath: string}[]> {
  const imageFiles: {path: string, relativePath: string}[] = [];
  
  async function scanDirectory(currentDir: string, relativePath: string = ''): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip optimized directory
        if (entry.name !== 'optimized') {
          await scanDirectory(fullPath, relPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (config.supportedExtensions.includes(ext) && 
            !config.skipFiles.includes(entry.name) &&
            !entry.name.includes('-300') && 
            !entry.name.includes('-600') && 
            !entry.name.includes('-1200')) { // Skip already optimized files
          imageFiles.push({
            path: fullPath,
            relativePath: relPath
          });
        }
      }
    }
  }
  
  await scanDirectory(dir);
  return imageFiles;
}

/**
 * Get file size in KB
 */
async function getFileSize(filePath: string): Promise<number> {
  const stats = await fs.stat(filePath);
  return Math.round(stats.size / 1024);
}

/**
 * Sanitize filename for web use
 */
function sanitizeFilename(filename: string): string {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  
  // Replace Greek characters and special characters with ASCII equivalents
  const sanitized = name
    .replace(/[Αα]/g, 'A')
    .replace(/[Ββ]/g, 'B')
    .replace(/[Γγ]/g, 'G')
    .replace(/[Δδ]/g, 'D')
    .replace(/[Εε]/g, 'E')
    .replace(/[Ζζ]/g, 'Z')
    .replace(/[Ηη]/g, 'H')
    .replace(/[Θθ]/g, 'Th')
    .replace(/[Ιι]/g, 'I')
    .replace(/[Κκ]/g, 'K')
    .replace(/[Λλ]/g, 'L')
    .replace(/[Μμ]/g, 'M')
    .replace(/[Νν]/g, 'N')
    .replace(/[Ξξ]/g, 'X')
    .replace(/[Οο]/g, 'O')
    .replace(/[Ππ]/g, 'P')
    .replace(/[Ρρ]/g, 'R')
    .replace(/[Σσς]/g, 'S')
    .replace(/[Ττ]/g, 'T')
    .replace(/[Υυ]/g, 'Y')
    .replace(/[Φφ]/g, 'F')
    .replace(/[Χχ]/g, 'Ch')
    .replace(/[Ψψ]/g, 'Ps')
    .replace(/[Ωω]/g, 'O')
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]/g, '') // Remove special characters
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .toLowerCase();
    
  return sanitized;
}

/**
 * Optimize single image
 */
async function optimizeImage(inputPath: string, relativePath: string): Promise<OptimizationResult[]> {
  const originalSize = await getFileSize(inputPath);
  const filename = path.basename(relativePath);
  console.log(`\nProcessing: ${relativePath} (${originalSize}KB)`);
  
  const sanitizedName = sanitizeFilename(filename);
  const results: OptimizationResult[] = [];
  
  for (const [sizeName, sizeConfig] of Object.entries(config.sizes)) {
    try {
      const outputFilename = `${sanitizedName}${sizeConfig.suffix}.webp`;
      const outputPath = path.join(config.outputDir, outputFilename);
      
      // Process image with Sharp - disable auto-rotation to preserve original orientation
      await sharp(inputPath)
        .rotate() // Apply EXIF rotation first, then we can control it
        .resize(sizeConfig.width, sizeConfig.height, {
          fit: 'contain',  // Changed from 'cover' to 'contain'
          position: 'center',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
        })
        .webp({ 
          quality: config.quality.webp,
          effort: 6 // Higher effort for better compression
        })
        .toFile(outputPath);
      
      const optimizedSize = await getFileSize(outputPath);
      const savings = Math.round(((originalSize - optimizedSize) / originalSize) * 100);
      
      results.push({
        size: sizeName,
        filename: outputFilename,
        originalSize,
        optimizedSize,
        savings
      });
      
      console.log(`${sizeName}: ${outputFilename} (${optimizedSize}KB, ${savings}% smaller)`);
      
    } catch (error) {
      console.error(`Error processing ${sizeName}:`, error instanceof Error ? error.message : String(error));
    }
  }
  
  return results;
}

/**
 * Generate usage examples
 */
function generateUsageExamples(results: OptimizationResult[][]): void {
  if (results.length === 0) return;
  
  const exampleFile = results[0];
  const baseName = exampleFile[0]?.filename?.replace('-300.webp', '') || 'example';
  
  console.log(`\nUsage example for "${baseName}":`);
  console.log(`
<img 
  src="/optimized/${baseName}-600.webp"
  srcSet="
    /optimized/${baseName}-300.webp 300w,
    /optimized/${baseName}-600.webp 600w,
    /optimized/${baseName}-1200.webp 1200w
  "
  sizes="
    (max-width: 768px) 300px,
    (max-width: 1024px) 600px,
    1200px
  "
  alt="Description"
  className="w-full h-full object-cover"
/>`);
}

/**
 * Main optimization function
 */
async function optimizeImages(): Promise<void> {
  console.log('Starting image optimization...\n');
  
  try {
    // Ensure output directory exists
    await ensureDir(config.outputDir);
    
    // Get all image files
    const imageFiles = await getImageFiles(config.inputDir);
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to optimize:`);
    imageFiles.forEach(file => console.log(`   • ${file.relativePath}`));
    
    // Process each image
    const allResults: OptimizationResult[] = [];
    for (const imageFile of imageFiles) {
      const results = await optimizeImage(imageFile.path, imageFile.relativePath);
      allResults.push(...results);
    }
    
    // Summary
    console.log('\nOptimization Summary:');
    console.log(`   • Processed: ${imageFiles.length} original images`);
    console.log(`   • Generated: ${allResults.length} optimized versions`);
    
    const totalOriginalSize = allResults.reduce((sum, result) => sum + result.originalSize, 0);
    const totalOptimizedSize = allResults.reduce((sum, result) => sum + result.optimizedSize, 0);
    const totalSavings = Math.round(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100);
    
    console.log(`   • Original total: ${totalOriginalSize}KB`);
    console.log(`   • Optimized total: ${totalOptimizedSize}KB`);
    console.log(`   • Total savings: ${totalSavings}%`);
    
    // Generate usage examples
    generateUsageExamples([allResults]);
    
    console.log(`\nAll images optimized successfully!`);
    console.log(`Optimized images saved to: ${config.outputDir}`);
    
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeImages();