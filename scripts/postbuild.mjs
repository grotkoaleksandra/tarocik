// Copies the built index.html to each route path (so /rozklady etc. return
// HTTP 200 on GitHub Pages instead of the 404-fallback) and to 404.html
// (so unknown paths still load the app).
import { cpSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const index = path.join(dist, 'index.html')

const routes = ['rozklady', 'znaczenia-kart', 'przewodnik']
for (const route of routes) {
  const dir = path.join(dist, route)
  mkdirSync(dir, { recursive: true })
  cpSync(index, path.join(dir, 'index.html'))
}
cpSync(index, path.join(dist, '404.html'))
console.log(`postbuild: ${routes.join(', ')} + 404.html`)
