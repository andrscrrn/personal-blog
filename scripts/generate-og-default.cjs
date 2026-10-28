#!/usr/bin/env node
/*
  Generate the default Open Graph image (public/og/default.png, 1200x630)
  used by pages without their own image. Dark editorial card matching the
  site's dark theme. Serif falls back to Georgia since librsvg cannot load
  the site's WOFF2 files.
*/
const path = require('node:path');
const sharp = require('sharp');

const OUT = path.join(process.cwd(), 'public', 'og', 'default.png');

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="120%">
      <stop offset="0%" stop-color="#1b2740"/>
      <stop offset="100%" stop-color="#0c1220"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="140" r="46" fill="none" stroke="#3ECF6E" stroke-width="18" opacity="0.9"/>
  <circle cx="1050" cy="140" r="20" fill="#3ECF6E" opacity="0.9"/>
  <text x="90" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="#e8e8e6">Andres Carreño</text>
  <text x="90" y="384" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="40" fill="#a3a3a0">Engineer, team builder, and endlessly curious.</text>
  <rect x="90" y="470" width="1020" height="1" fill="#2a2a28"/>
  <text x="90" y="540" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="4" fill="#8f8f8c">ANDRESCARRENO.CO</text>
</svg>`;

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT)
  .then(() => console.log(`Wrote ${OUT}`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
