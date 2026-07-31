/* Build-time prerenderer: renders every route to static HTML so crawlers
   that don't execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, Bing's
   basic crawler) see the full Polish content. The client bundle re-renders
   over it on load. */
import { renderToString } from 'react-dom/server'
import App from './App'
import { allCards } from './data/cards'
import { cardSlug } from './lib/slugs'
import { cardMeta, viewDescriptions, viewPaths, viewTitles, SITE } from './lib/meta'
import type { StaticViewId } from './lib/meta'

export interface PageInfo {
  path: string
  html: string
  title: string
  description: string
  canonical: string
}

const staticViews: StaticViewId[] = ['home', 'daily', 'reading', 'library', 'guide']

export function listRoutes(): string[] {
  return [
    ...staticViews.map((v) => viewPaths[v]),
    ...allCards.map((c) => `/karta/${cardSlug(c)}/`),
  ]
}

export function renderPage(path: string): PageInfo {
  const html = renderToString(<App ssrPath={path} />)
  const card = allCards.find((c) => `/karta/${cardSlug(c)}/` === path)
  if (card) {
    const m = cardMeta(card, 'pl')
    return { path, html, title: m.title, description: m.description, canonical: m.url }
  }
  const view = staticViews.find((v) => viewPaths[v] === path) ?? 'home'
  return {
    path,
    html,
    title: viewTitles[view].pl,
    description: viewDescriptions[view].pl,
    canonical: SITE + viewPaths[view],
  }
}

export function listCards() {
  return allCards.map((c) => ({
    slug: cardSlug(c),
    namePl: c.name.pl,
    nameEn: c.name.en,
    keywordsPl: c.keywordsUpright.pl,
  }))
}
