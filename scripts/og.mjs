// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from inline SVG. Run once locally: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const INK = '#0b0a09'
const PAPER = '#fbfaf6'
const CARD = '#fbfaf6'
const SERIF = "'Libre Caslon Text', 'Big Caslon', Georgia, serif"

// Engraved rays radiating from a centre, alternating long and short.
const rays = (cx, cy, inner, outer, count) => {
  let d = ''
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const r2 = i % 2 === 0 ? outer : outer * 0.78
    d += `M${cx + Math.cos(t) * inner} ${cy + Math.sin(t) * inner} L${cx + Math.cos(t) * r2} ${cy + Math.sin(t) * r2} `
  }
  return d
}

// The site's card back: eye of providence in a triangle, rays on black. 200x320 units.
const cardBack = (x, y, rot, scale) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale}) translate(-100 -160)">
    <rect width="200" height="320" fill="${CARD}"/>
    <g fill="none" stroke="${INK}">
      <rect x="7" y="7" width="186" height="306" stroke-width="5"/>
      <rect x="14" y="14" width="172" height="292" stroke-width="1.2"/>
    </g>
    <rect x="22" y="22" width="156" height="276" fill="${INK}"/>
    <svg x="22" y="22" width="156" height="276" viewBox="22 22 156 276">
      <path d="${rays(100, 160, 46, 150, 64)}" stroke="${CARD}" stroke-width="1.1"/>
    </svg>
    <circle cx="100" cy="160" r="44" fill="${INK}" stroke="${CARD}" stroke-width="1.4"/>
    <path d="M100 130 L127 176 L73 176 Z" fill="none" stroke="${CARD}" stroke-width="2"/>
    <path d="M84 162 Q100 148 116 162 Q100 176 84 162 Z" fill="${CARD}"/>
    <circle cx="100" cy="162" r="5.2" fill="${INK}"/>
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
  <path d="${rays(890, 315, 120, 420, 96)}" stroke="${INK}" stroke-width="1.4"/>
  ${cardBack(820, 325, -9, 1.15)}
  ${cardBack(960, 318, 9, 1.15)}
  <rect x="0" y="0" width="640" height="630" fill="${PAPER}"/>
  <g font-family="Georgia, serif" fill="${INK}">
    <text x="80" y="170" font-size="100" font-weight="bold">Tarocik</text>
    <rect x="80" y="200" width="460" height="3" fill="${INK}"/>
    <text x="80" y="300" font-size="62" font-weight="bold">Zapytaj karty,</text>
    <text x="80" y="375" font-size="62" font-weight="bold">posłuchaj siebie.</text>
    <text x="80" y="450" font-size="28" font-style="italic">Karta dnia · rozkłady · znaczenia 78 kart</text>
    <text x="80" y="520" font-size="28">tarocik.com</text>
  </g>
</svg>`

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${INK}"/>
  <path d="${rays(90, 90, 34, 96, 40)}" stroke="${PAPER}" stroke-width="2"/>
  <g transform="translate(90 90)">
    <path d="M0 -30 L30 22 L-30 22 Z" fill="${INK}" stroke="${PAPER}" stroke-width="4"/>
    <path d="M-17 4 Q0 -12 17 4 Q0 20 -17 4 Z" fill="${PAPER}"/>
    <circle cy="4" r="6" fill="${INK}"/>
  </g>
</svg>`

await sharp(Buffer.from(og)).png().toFile(path.join(root, 'public', 'og.png'))
await sharp(Buffer.from(icon)).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/og.png and public/apple-touch-icon.png')
