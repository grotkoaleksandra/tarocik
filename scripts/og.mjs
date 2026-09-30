// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from inline SVG. Run once locally: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const INK = '#000000'
const RED = '#cc0000'
const LINK = '#0000ee'
const SERIF = "'Times New Roman', Times, serif"

// Eight-pointed star, radius ~10 (same as src/components/Ornaments.tsx).
const STAR8 =
  'M0 -10 L2.2 -5.3 L7.1 -7.1 L5.3 -2.2 L10 0 L5.3 2.2 L7.1 7.1 L2.2 5.3 L0 10 L-2.2 5.3 L-7.1 7.1 L-5.3 2.2 L-10 0 L-5.3 -2.2 L-7.1 -7.1 L-2.2 -5.3 Z'

// A card back like the site's: double frame, red lattice, star medallion. 200x320 units.
const cardBack = (x, y, rot, scale) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale}) translate(-100 -160)">
    <rect width="200" height="320" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>
    <g fill="none" stroke="${INK}">
      <rect x="9" y="9" width="182" height="302" stroke-width="2.6"/>
      <rect x="15" y="15" width="170" height="290" stroke-width="0.9"/>
    </g>
    <rect x="22" y="22" width="156" height="276" fill="url(#lattice)" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="100" cy="160" r="40" fill="#ffffff" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="100" cy="160" r="34" fill="none" stroke="${INK}" stroke-width="0.7"/>
    <path d="${STAR8}" transform="translate(100 160) scale(2.6)" fill="${INK}"/>
    <circle cx="100" cy="160" r="4.5" fill="#ffffff"/>
  </g>`

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="lattice" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="${RED}" stroke-width="1"/>
      <circle cx="10" cy="10" r="1.3" fill="${RED}"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  ${cardBack(820, 330, -8, 1.3)}
  ${cardBack(960, 320, 8, 1.3)}
  <g font-family="${SERIF}" fill="${INK}">
    <text x="80" y="130" font-size="34" font-weight="bold" letter-spacing="1.5">TAROCIK</text>
    <line x1="80" y1="160" x2="600" y2="160" stroke="${INK}" stroke-width="2"/>
    <text x="80" y="265" font-size="80" font-weight="bold">Zapytaj karty,</text>
    <text x="80" y="350" font-size="80" font-weight="bold">posłuchaj siebie.</text>
    <text x="80" y="430" font-size="32">Karta dnia · rozkłady · znaczenia 78 kart</text>
    <text x="80" y="505" font-size="32" fill="${LINK}" text-decoration="underline">&gt;&gt; tarocik.com</text>
  </g>
</svg>`

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#ffffff"/>
  <g transform="translate(90 90)">
    <rect x="-44" y="-66" width="88" height="132" fill="#ffffff" stroke="${INK}" stroke-width="5"/>
    <rect x="-34" y="-56" width="68" height="112" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="${STAR8}" transform="scale(2.7)" fill="${RED}"/>
  </g>
</svg>`

await sharp(Buffer.from(og)).png().toFile(path.join(root, 'public', 'og.png'))
await sharp(Buffer.from(icon)).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/og.png and public/apple-touch-icon.png')
