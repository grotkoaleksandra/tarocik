// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from inline SVG. Run once locally: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const INK = '#1c1814'
const PAPER = '#ece2c9'
const CARD = '#f4ecd6'
const SERIF = "'Libre Caslon Text', 'Big Caslon', Georgia, serif"

// Eight-pointed star, radius ~10 (same as src/components/Ornaments.tsx).
const STAR8 =
  'M0 -10 L2.2 -5.3 L7.1 -7.1 L5.3 -2.2 L10 0 L5.3 2.2 L7.1 7.1 L2.2 5.3 L0 10 L-2.2 5.3 L-7.1 7.1 L-5.3 2.2 L-10 0 L-5.3 -2.2 L-7.1 -7.1 L-2.2 -5.3 Z'

// A card back like the site's: double frame, red lattice, star medallion. 200x320 units.
const cardBack = (x, y, rot, scale) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale}) translate(-100 -160)">
    <rect width="200" height="320" fill="${CARD}" stroke="${INK}" stroke-width="1.5"/>
    <g fill="none" stroke="${INK}">
      <rect x="9" y="9" width="182" height="302" stroke-width="2.6"/>
      <rect x="15" y="15" width="170" height="290" stroke-width="0.9"/>
    </g>
    <rect x="22" y="22" width="156" height="276" fill="url(#lattice)" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="100" cy="160" r="40" fill="${CARD}" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="100" cy="160" r="34" fill="none" stroke="${INK}" stroke-width="0.7"/>
    <path d="${STAR8}" transform="translate(100 160) scale(2.6)" fill="${INK}"/>
    <circle cx="100" cy="160" r="4.5" fill="${CARD}"/>
  </g>`

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="lattice" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="${INK}" stroke-width="1.3"/>
      <circle cx="10" cy="10" r="1.6" fill="${INK}"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="${INK}" stroke-width="5"/>
  <rect x="42" y="42" width="1116" height="546" fill="none" stroke="${INK}" stroke-width="1.5"/>
  ${cardBack(830, 330, -8, 1.2)}
  ${cardBack(960, 322, 8, 1.2)}
  <g font-family="${SERIF}" fill="${INK}" text-anchor="middle">
    <text x="360" y="170" font-size="104" font-style="italic">Tarocik</text>
    <text x="360" y="215" font-size="24" font-style="italic">Gazeta o kartach, losie i duszy ludzkiej</text>
    <rect x="110" y="240" width="500" height="4" fill="${INK}"/>
    <rect x="110" y="248" width="500" height="1.5" fill="${INK}"/>
    <text x="360" y="330" font-size="58">ZAPYTAJ KARTY,</text>
    <text x="360" y="395" font-size="50" font-style="italic">posłuchaj siebie.</text>
    <text x="360" y="470" font-size="26">KARTA DNIA · ROZKŁADY · ZNACZENIA 78 KART</text>
    <text x="360" y="530" font-size="28" font-style="italic">☞ tarocik.com</text>
  </g>
</svg>`

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${PAPER}"/>
  <g transform="translate(90 90)">
    <rect x="-44" y="-66" width="88" height="132" fill="${CARD}" stroke="${INK}" stroke-width="6"/>
    <rect x="-34" y="-56" width="68" height="112" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="${STAR8}" transform="scale(2.7)" fill="${INK}"/>
  </g>
</svg>`

await sharp(Buffer.from(og)).png().toFile(path.join(root, 'public', 'og.png'))
await sharp(Buffer.from(icon)).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/og.png and public/apple-touch-icon.png')
