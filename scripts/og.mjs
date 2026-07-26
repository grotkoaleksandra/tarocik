// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from inline SVG. Run once locally: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const INK = '#232120'
const flower = (scale, rotate = 0) => `
  <g transform="scale(${scale}) rotate(${rotate})" stroke="${INK}" stroke-width="3.4" fill="none"
     stroke-linecap="round" stroke-linejoin="round">
    ${[10, 82, 155, 228, 300]
      .map(
        (a) =>
          `<path d="M 0 -6 C -11 -13 -16 -28 -9 -37 C -4 -43 5 -42 8 -34 C 13 -24 8 -12 0 -6 Z" transform="rotate(${a})"/>`,
      )
      .join('')}
    <circle r="2.6" fill="${INK}" stroke="none"/>
  </g>`

const card = (x, y, rot, blobs) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-105" y="-168" width="210" height="336" rx="14" fill="#ffffff"
          stroke="${INK}" stroke-width="0" filter="url(#shadow)"/>
    <path d="M -98 -160 Q 0 -166 98 -159 Q 102 0 99 158 Q 0 165 -97 159 Q -101 0 -98 -160 Z"
          fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    ${blobs}
  </g>`

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#3c3228" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#fdfdfc"/>
  <circle cx="1090" cy="80" r="46" fill="#f2a541" opacity="0.85"/>
  <circle cx="105" cy="545" r="60" fill="#ec6a8d" opacity="0.75"/>
  <circle cx="180" cy="590" r="34" fill="#f0875f" opacity="0.8"/>
  ${card(905, 330, 12, `
    <circle cx="0" cy="-58" r="52" fill="#ec6a8d" fill-opacity="0.5"/>
    <g transform="translate(0 -58)">${flower(1.5)}</g>
    <circle cx="-38" cy="76" r="34" fill="#6d87e0" fill-opacity="0.45"/>
    <g transform="translate(-38 76)">${flower(1.0, 40)}</g>
    <circle cx="52" cy="104" r="26" fill="#f2a541" fill-opacity="0.55"/>
    <g transform="translate(52 104)">${flower(0.75, -20)}</g>
  `)}
  ${card(745, 350, -6, `
    <circle cx="0" cy="-40" r="48" fill="#8bbf78" fill-opacity="0.45"/>
    <g transform="translate(0 -40)">${flower(1.35, 15)}</g>
    <circle cx="30" cy="90" r="30" fill="#ec6a8d" fill-opacity="0.5"/>
    <g transform="translate(30 90)">${flower(0.85, 70)}</g>
  `)}
  <g font-family="Arial Rounded MT Bold, Arial, sans-serif" fill="${INK}">
    <text x="90" y="300" font-size="92" font-weight="bold" letter-spacing="1">Tarocik</text>
    <text x="92" y="360" font-size="30" fill="#8b8983">tarot online · karta dnia · rozkłady · 78 kart</text>
    <text x="92" y="404" font-size="30" fill="#8b8983">card of the day · spreads · all 78 meanings</text>
  </g>
  <rect x="92" y="435" width="150" height="9" rx="4.5" fill="#2b4bb5"/>
</svg>`

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" rx="40" fill="#ffffff"/>
  <g transform="translate(90 90) rotate(-8)">
    <path d="M -52 -70 Q 0 -76 52 -69 Q 56 0 53 68 Q 0 75 -51 69 Q -55 0 -52 -70 Z"
          fill="#ffffff" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <circle r="34" fill="#ec6a8d" fill-opacity="0.55"/>
    ${flower(1.35, 10)}
  </g>
</svg>`

await sharp(Buffer.from(og)).png().toFile(path.join(root, 'public', 'og.png'))
await sharp(Buffer.from(icon)).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/og.png and public/apple-touch-icon.png')
