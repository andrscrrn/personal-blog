#!/usr/bin/env node
/*
  Optimize Open Graph images in public/og:
  - If file size > 400KB or width > 1200, resize to max width 1200
  - Convert to WebP with quality 82
  - Write <slug>.webp alongside originals
  - Optionally update frontmatter `image` if pointing to non-webp existing file
*/
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const matter = require('gray-matter');

const ROOT = process.cwd();
const OG_DIR = path.join(ROOT, 'public', 'og');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const MAX_WIDTH = 1200;
const MAX_SIZE_BYTES = 400 * 1024;

async function optimizeOne(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = path.basename(inputPath, ext);
  const outPath = path.join(OG_DIR, `${base}.webp`);

  try {
    const buf = fs.readFileSync(inputPath);
    const img = sharp(buf);
    const meta = await img.metadata();

    let pipeline = img;
    if ((meta.width || 0) > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH });
    }
    // Decide whether to convert based on size or if not already webp
    const needConvert = ext !== '.webp' || buf.byteLength > MAX_SIZE_BYTES || (meta.width || 0) > MAX_WIDTH;
    if (!needConvert) return null;

    await pipeline.webp({ quality: 82 }).toFile(outPath);
    // Remove original non-webp file after successful conversion
    if (ext !== '.webp') {
      try {
        fs.unlinkSync(inputPath);
        console.log(`Deleted original ${path.basename(inputPath)}`);
      } catch (e) {
        console.warn(`Could not delete original ${path.basename(inputPath)}:`, e.message);
      }
    }
    return outPath;
  } catch (err) {
    console.error(`Failed optimizing ${inputPath}:`, err.message);
    return null;
  }
}

function updateFrontmatterIfNeeded(slug, outWebpPath) {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : (fs.existsSync(mdPath) ? mdPath : null);
  if (!filePath) return false;

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const desired = `/og/${slug}.webp`;
  if (parsed.data.image === desired) return false;
  parsed.data.image = desired;
  const nextContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, nextContent);
  return true;
}

async function main() {
  if (!fs.existsSync(OG_DIR)) {
    console.log('No public/og directory, nothing to optimize.');
    return;
  }
  const files = fs.readdirSync(OG_DIR).filter(f => !f.startsWith('.'));
  let changed = false;
  for (const f of files) {
    const full = path.join(OG_DIR, f);
    const stat = fs.statSync(full);
    if (!stat.isFile()) continue;
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const slug = path.basename(f, ext);
    const out = await optimizeOne(full);
    if (out) {
      console.log(`Optimized ${f} -> ${path.basename(out)}`);
      changed = true;
    }
    if (updateFrontmatterIfNeeded(slug, path.join(OG_DIR, `${slug}.webp`))) {
      console.log(`Updated frontmatter image for ${slug}`);
      changed = true;
    }
  }
  if (!changed) console.log('No changes needed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


