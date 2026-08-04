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
import { guideSections } from './components/Guide'

export interface PageInfo {
  path: string
  html: string
  title: string
  description: string
  canonical: string
  jsonld?: { id: string; json: string }
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
    const jsonld = {
      id: 'ld-card',
      json: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: m.title,
            description: m.description,
            inLanguage: 'pl',
            mainEntityOfPage: m.url,
            author: { '@type': 'Organization', name: 'Tarocik', url: SITE },
            publisher: { '@type': 'Organization', name: 'Tarocik', url: SITE },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Tarocik', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Znaczenia kart', item: `${SITE}/znaczenia-kart/` },
              { '@type': 'ListItem', position: 3, name: card.name.pl, item: m.url },
            ],
          },
        ],
      }),
    }
    return { path, html, title: m.title, description: m.description, canonical: m.url, jsonld }
  }
  const view = staticViews.find((v) => viewPaths[v] === path) ?? 'home'
  const jsonld =
    view === 'guide'
      ? {
          id: 'ld-guide-faq',
          json: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guideSections.map((sec) => ({
              '@type': 'Question',
              name: sec.title.pl,
              acceptedAnswer: { '@type': 'Answer', text: sec.body.pl },
            })),
          }),
        }
      : undefined
  return {
    path,
    html,
    title: viewTitles[view].pl,
    description: viewDescriptions[view].pl,
    canonical: SITE + viewPaths[view],
    jsonld,
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
