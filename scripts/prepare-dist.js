import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function prepareDist() {
  try {
    // Create dist directory if it doesn't exist
    await mkdir('dist', { recursive: true });

    // Copy necessary files for deployment
    const filesToCopy = [
      '.env.production', // If you have environment-specific configs
      'package.json',
      'package-lock.json'
    ];

    for (const file of filesToCopy) {
      try {
        await copyFile(file, join('dist', file));
        console.log(`✓ Copied ${file} to dist`);
      } catch (err) {
        console.warn(`⚠ Warning: Could not copy ${file}:`, err.message);
      }
    }

    console.log('✨ Build prepared for deployment');
  } catch (err) {
    console.error('Error preparing build:', err);
    process.exit(1);
  }
}

prepareDist();