// Builds the etched card illustrations in public/etchings/ from public-domain
// prints on Wikimedia Commons (Dürer's woodcuts and engravings, Doré's Tower
// of Babel, a Rijksmuseum Justitia). Each print is cropped to the card's arched window and
// reduced to pure black ink on white.
//
//   node scripts/etchings.mjs [cacheDir]
//
// Downloads are cached in cacheDir (default node_modules/.cache/etchings).
import sharp from 'sharp'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const cache = path.resolve(process.argv[2] ?? path.join(root, 'node_modules/.cache/etchings'))
const out = path.join(root, 'public', 'etchings')
const UA = { 'User-Agent': 'TarocikSite/1.0 (https://tarocik.com; build script)' }

/** Width / height of the card's image window (see CardArt.tsx). */
const ASPECT = 148 / 172

// [file id, Commons file title, crop as fractions of the print: x, y, width]
// The crop height follows from ASPECT. Optional last field: { ink, aspect } —
// ink is the grey level below which a pixel prints black (lower = lighter, for
// heavily shaded engravings); aspect scales the window shape.
const SOURCES = [
  ['major-00', 'Dürer - Das Narrenschiff 002.jpg', 0.22, 0.06, 0.76],
  ['major-01', 'Albrecht Dürer, Melencolia I, 1514, NGA 6640.jpg', 0.36, 0.24, 0.62, { ink: 92 }],
  ['major-02', 'Albrecht Dürer, The Madonna on the Crescent, 1510-1511, NGA 6746.jpg', 0.14, 0.07, 0.72],
  ['major-03', 'Albrecht Dürer, The Assumption and Coronation of the Virgin, 1510, NGA 6749.jpg', 0.14, 0.02, 0.72],
  ['major-04', 'Hans Weiditz, II, after Albrecht Dürer, Emperor Maximilian I, 1519, NGA 202758.jpg', 0.12, 0.13, 0.8],
  ['major-05', 'Albrecht Dürer, The Mass of Saint Gregory, 1511, NGA 6791.jpg', 0.08, 0.06, 0.86],
  ['major-06', 'Albrecht Dürer, Adam and Eve, 1504, NGA 6610.jpg', 0.02, 0.06, 0.96, { ink: 105 }],
  ['major-07', 'Albrecht Dürer, Saint George on Horseback, 1508, NGA 6616.jpg', 0.0, 0.05, 1, { ink: 110 }],
  ['major-08', 'Albrecht Dürer, Samson Fighting with the Lion, c. 1497-1498, NGA 49057.jpg', 0.1, 0.24, 0.8],
  ['major-09', 'Albrecht Dürer, Saint Anthony and Saint Paul in the Wilderness, c. 1504, NGA 6714.jpg', 0.05, 0.2, 0.9],
  ['major-10', 'Albrecht Dürer, Nemesis (The Great Fortune), c. 1501-1502, NGA 6603.jpg', 0.05, 0.02, 0.9],
  ['major-11', 'Rechtvaardigheid (Justitia), RP-P-OB-10.846.jpg', 0.04, 0.12, 0.92],
  ['major-12', 'Albrecht Dürer, The Crucifixion, c. 1497-1498, NGA 6739.jpg', 0.12, 0.04, 0.76],
  ['major-13', 'Albrecht Dürer, The Four Horsemen, 1498, NGA 142352.jpg', 0.05, 0.05, 0.9],
  ['major-14', 'Albrecht Dürer, Saint John Devouring the Book, 1498, NGA 142357.jpg', 0.1, 0.15, 0.8],
  ['major-15', 'Albrecht Dürer, Knight, Death and Devil, 1513, NGA 6637.jpg', 0.36, 0.05, 0.6, { ink: 88 }],
  ['major-16', 'Gustave Dore Bible The Tower of Babel.jpg', 0.04, 0.03, 0.92, { ink: 168 }],
  ['major-17', 'Albrecht Dürer, The Opening of the Fifth and Sixth Seal, 1498, NGA 142353.jpg', 0.05, 0.05, 0.9],
  ['major-18', 'Albrecht Dürer, The Apocalyptic Woman, 1498, NGA 142358.jpg', 0.05, 0.03, 0.9],
  ['major-19', 'Albrecht Dürer, The Vision of the Seven Candlesticks, 1498, NGA 142350.jpg', 0.05, 0.05, 0.9],
  ['major-20', 'Albrecht Dürer, The Seven Angels with the Trumpets, 1498, NGA 142355.jpg', 0.05, 0.03, 0.9],
  ['major-21', 'Albrecht Dürer, The Trinity, 1511, NGA 6792.jpg', 0.05, 0.03, 0.9],
  ['back', 'Albrecht Dürer, The Opening of the Fifth and Sixth Seal, 1498, NGA 142353.jpg', 0.05, 0.279, 0.27, { aspect: 1 / (148 / 172) }],
  ['hero', 'Albrecht Dürer, Saint Michael Fighting the Dragon, 1498, NGA 142359.jpg', 0.04, 0.03, 0.92, { aspect: 0.62 / 0.86 }],
]

async function fetchPrint(title) {
  const file = path.join(cache, title.replace(/[^\w.-]+/g, '_'))
  if (existsSync(file)) return file
  const api =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: '1400',
      format: 'json',
      titles: `File:${title}`,
    })
  const pages = (await (await fetch(api, { headers: UA })).json()).query.pages
  const info = Object.values(pages)[0].imageinfo[0]
  const img = await fetch(info.thumburl ?? info.url, { headers: UA })
  writeFileSync(file, Buffer.from(await img.arrayBuffer()))
  return file
}

mkdirSync(cache, { recursive: true })
mkdirSync(out, { recursive: true })

for (const [id, title, fx, fy, fw, { ink = 132, aspect: aspectScale = 1 } = {}] of SOURCES) {
  const file = await fetchPrint(title)
  const { width, height } = await sharp(file).metadata()
  const aspect = ASPECT * aspectScale
  const w = Math.round(fw * width)
  const h = Math.min(Math.round(w / aspect), height - Math.round(fy * height))
  const outWidth = id === 'hero' ? 900 : 480
  await sharp(file)
    .extract({ left: Math.round(fx * width), top: Math.round(fy * height), width: w, height: h })
    .grayscale()
    .normalise({ lower: 2, upper: 98 })
    .resize({ width: outWidth })
    .sharpen()
    .threshold(ink)
    .png({ palette: true, colours: 2, compressionLevel: 9 })
    .toFile(path.join(out, `${id}.png`))
  console.log(id)
}
