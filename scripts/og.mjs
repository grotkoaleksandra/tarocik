// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from the etchings. Run after scripts/etchings.mjs: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const INK = '#1d1a16'
const PAPER = '#efe9d7'

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="760" y="30" width="370" height="570" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>
  <rect x="772" y="42" width="346" height="546" fill="none" stroke="${INK}" stroke-width="1.5"/>
  <g font-family="Georgia, serif" fill="${INK}">
    <text x="80" y="170" font-size="100" font-weight="bold">Tarocik</text>
    <rect x="80" y="200" width="460" height="3" fill="${INK}"/>
    <text x="80" y="300" font-size="62" font-weight="bold">Zapytaj karty,</text>
    <text x="80" y="375" font-size="62" font-weight="bold">posłuchaj siebie.</text>
    <text x="80" y="450" font-size="28" font-style="italic">Karta dnia · rozkłady · znaczenia 78 kart</text>
    <text x="80" y="520" font-size="28">tarocik.com</text>
  </g>
</svg>`

// The framed etching on the right: Dürer's Saint Michael (public/etchings/hero.png).
const etching = await sharp(path.join(root, 'public', 'etchings', 'hero.png'))
  .resize(330, 530, { fit: 'cover', position: 'top' })
  .toBuffer()

// Phone icon: Dürer's etched sun from the card back, in a black square.
const sun = await sharp(path.join(root, 'public', 'etchings', 'back.png'))
  .resize(150, 150)
  .flatten({ background: PAPER })
  .composite([
    {
      input: Buffer.from('<svg width="150" height="150"><circle cx="75" cy="75" r="75" fill="#fff"/></svg>'),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer()

await sharp(Buffer.from(og))
  .composite([{ input: etching, left: 780, top: 50 }])
  .png()
  .toFile(path.join(root, 'public', 'og.png'))
await sharp({ create: { width: 180, height: 180, channels: 4, background: INK } })
  .composite([{ input: sun, left: 15, top: 15 }])
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))
console.log('generated public/og.png and public/apple-touch-icon.png')
