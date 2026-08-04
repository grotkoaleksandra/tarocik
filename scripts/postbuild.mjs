// Post-build for GitHub Pages SEO + AI visibility:
// - prerenders every route to static HTML (content visible to non-JS crawlers)
// - bakes each route's title/description/canonical into its HTML file
// - generates sitemap.xml and llms.txt
// - writes 404.html (plain SPA shell) as the fallback for unknown paths
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const SITE = 'https://tarocik.com'

const { listRoutes, renderPage, listCards } = await import(
  path.join(root, 'dist-server', 'entry-server.js')
)

const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

// 404 fallback stays a plain shell (no prerendered content from a wrong page).
writeFileSync(path.join(dist, '404.html'), template)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

function buildPage(info) {
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(info.title)}</title>`)
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(info.description)}$2`,
  )
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${info.canonical}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${info.canonical}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(info.title)}$2`)
  if (info.jsonld) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json" id="${info.jsonld.id}">${info.jsonld.json}</script></head>`,
    )
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${info.html}</div>`)
  return html
}

const routes = listRoutes()
for (const route of routes) {
  const info = renderPage(route)
  const out = buildPage(info)
  if (route === '/') {
    writeFileSync(path.join(dist, 'index.html'), out)
  } else {
    const dir = path.join(dist, route.replace(/^\/|\/$/g, ''))
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'index.html'), out)
  }
}

// --- sitemap ---
const urlEntry = (loc, priority, changefreq) =>
  `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

const cards = listCards()
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntry(`${SITE}/`, '1.0', 'daily'),
  urlEntry(`${SITE}/karta-dnia/`, '0.9', 'daily'),
  urlEntry(`${SITE}/znaczenia-kart/`, '0.9', 'monthly'),
  urlEntry(`${SITE}/rozklady/`, '0.8', 'monthly'),
  urlEntry(`${SITE}/przewodnik/`, '0.7', 'monthly'),
  ...cards.map((c) => urlEntry(`${SITE}/karta/${c.slug}/`, '0.6', 'monthly')),
  '</urlset>',
  '',
].join('\n')
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

// --- llms.txt: a plain-markdown map of the site for AI crawlers ---
const llms = [
  '# Tarocik',
  '',
  '> Tarot online po polsku i po angielsku: darmowa karta dnia, interaktywne rozkłady',
  '> (jedna karta, trzy karty, mały krzyż, krzyż celtycki) z automatycznym podsumowaniem',
  '> oraz znaczenia wszystkich 78 kart tarota — proste i odwrócone.',
  '> Free bilingual (Polish/English) tarot: card of the day, interactive spreads, and',
  '> meanings for all 78 tarot cards, upright and reversed.',
  '',
  '## Główne strony / Main pages',
  '',
  `- [Karta dnia / Card of the day](${SITE}/karta-dnia/): darmowa karta tarota na dziś, nowa każdego ranka`,
  `- [Rozkłady / Readings](${SITE}/rozklady/): interaktywne rozkłady tarota z interpretacją i podsumowaniem`,
  `- [Znaczenia kart / Card meanings](${SITE}/znaczenia-kart/): katalog wszystkich 78 kart`,
  `- [Jak czytać tarota / How to read tarot](${SITE}/przewodnik/): przewodnik dla początkujących`,
  '',
  '## Znaczenia kart / Card meanings (78)',
  '',
  ...cards.map(
    (c) => `- [${c.namePl} / ${c.nameEn}](${SITE}/karta/${c.slug}/): ${c.keywordsPl}`,
  ),
  '',
].join('\n')
writeFileSync(path.join(dist, 'llms.txt'), llms)

console.log(
  `postbuild: prerendered ${routes.length} routes, sitemap (${cards.length + 5} URLs), llms.txt, 404.html`,
)
