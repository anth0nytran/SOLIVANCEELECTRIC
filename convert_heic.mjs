import convert from 'heic-convert';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  { src: 'public/photos_new/concrete_katy.HEIC', dest: 'public/photos_new_web/concrete/concrete-9.jpg' },
  { src: 'public/photos_new/concrete_katy2.HEIC', dest: 'public/photos_new_web/concrete/concrete-10.jpg' },
  { src: 'public/photos_new/concrete_katy3.HEIC', dest: 'public/photos_new_web/concrete/concrete-11.jpg' },
  { src: 'public/photos_new/patio_richmond.HEIC', dest: 'public/photos_new_web/patio-cover/patio-cover-10.jpg' },
  { src: 'public/photos_new/patio_richmond2.HEIC', dest: 'public/photos_new_web/patio-cover/patio-cover-11.jpg' },
];

for (const f of files) {
  const srcPath = path.join(__dirname, f.src);
  const destPath = path.join(__dirname, f.dest);
  try {
    console.log(`Converting ${f.src}...`);
    const inputBuffer = fs.readFileSync(srcPath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85,
    });
    // Use sharp to resize for web (max 2000px wide) and optimize
    await sharp(Buffer.from(outputBuffer))
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(destPath);
    const stats = fs.statSync(destPath);
    console.log(`  -> OK: ${f.dest} (${(stats.size / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  -> FAIL: ${e.message}`);
  }
}

console.log('All done!');
