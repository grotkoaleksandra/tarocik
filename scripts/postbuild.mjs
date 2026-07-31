// Post-build for GitHub Pages SEO:
// - copies index.html into every route directory (real HTTP 200s)
// - generates dist/sitemap.xml including all 78 card pages
// - copies index.html to 404.html as the SPA fallback
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const index = path.join(dist, 'index.html')
const SITE = 'https://tarocik.com'

/* Keep in sync with src/lib/slugs.ts. */
const PL_CHARS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }
const slugify = (name) =>
  name
    .toLowerCase()
    .split('')
    .map((ch) => PL_CHARS[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Extract every card's Polish name from the data files.
const dataFiles = ['major.ts', 'wands.ts', 'cups.ts', 'swords.ts', 'pentacles.ts']
const names = []
for (const file of dataFiles) {
  const src = readFileSync(path.join(root, 'src', 'data', file), 'utf8')
  for (const m of src.matchAll(/name: \{ pl: '([^']+)'/g)) names.push(m[1])
}
if (names.length !== 78) {
  throw new Error(`expected 78 cards, found ${names.length}`)
}

const staticRoutes = ['karta-dnia', 'rozklady', 'znaczenia-kart', 'przewodnik']
const cardRoutes = names.map((n) => `karta/${slugify(n)}`)

for (const route of [...staticRoutes, ...cardRoutes]) {
  const dir = path.join(dist, route)
  mkdirSync(dir, { recursive: true })
  cpSync(index, path.join(dir, 'index.html'))
}
cpSync(index, path.join(dist, '404.html'))

const urlEntry = (loc, priority, changefreq) =>
  `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntry(`${SITE}/`, '1.0', 'daily'),
  urlEntry(`${SITE}/karta-dnia/`, '0.9', 'daily'),
  urlEntry(`${SITE}/znaczenia-kart/`, '0.9', 'monthly'),
  urlEntry(`${SITE}/rozklady/`, '0.8', 'monthly'),
  urlEntry(`${SITE}/przewodnik/`, '0.7', 'monthly'),
  ...cardRoutes.map((r) => urlEntry(`${SITE}/${r}/`, '0.6', 'monthly')),
  '</urlset>',
  '',
].join('\n')
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`postbuild: ${staticRoutes.length} static + ${cardRoutes.length} card routes, sitemap.xml, 404.html`)
