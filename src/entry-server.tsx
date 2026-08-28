/* Build-time prerendering: every route becomes real static HTML, so search
   engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Bingbot) that do
   not run JavaScript still see the full Polish content and its structured
   data. The client bundle re-renders over it on load. */
import { renderToString } from 'react-dom/server'
import App from './App'
import { allCards } from './data/cards'
import { cardSlug } from './lib/slugs'
import { cardMeta, viewDescriptions, viewPaths, viewTitles, SITE } from './lib/meta'
import type { StaticViewId } from './lib/meta'
import { guideSections } from './components/Guide'
import { spreads } from './lib/i18n'
import { cardFaqs, dailyFaqs, homeFaqs, libraryFaqs, readingFaqs } from './lib/faq'
import { LAST_UPDATED, faqPageLd, publisher } from './lib/schema'
import { cardsLabel } from './lib/plural'

export interface JsonLdBlock {
  id: string
  json: string
}

export interface PageInfo {
  path: string
  html: string
  title: string
  description: string
  canonical: string
  jsonld: JsonLdBlock[]
}

const staticViews: StaticViewId[] = ['home', 'daily', 'reading', 'library', 'guide']

const block = (id: string, data: unknown): JsonLdBlock => ({ id, json: JSON.stringify(data) })

export function listRoutes(): string[] {
  return [
    ...staticViews.map((v) => viewPaths[v]),
    ...allCards.map((c) => `/karta/${cardSlug(c)}/`),
  ]
}

/** Structured data for the five static routes. Ids match the ones the client
 *  upserts, so nothing is duplicated once the app boots. */
function staticJsonLd(view: StaticViewId): JsonLdBlock[] {
  switch (view) {
    case 'home':
      return [block('ld-home-faq', faqPageLd(homeFaqs, 'pl'))]
    case 'daily':
      return [block('ld-daily-faq', faqPageLd(dailyFaqs, 'pl'))]
    case 'reading':
      return [
        block('ld-reading-faq', faqPageLd(readingFaqs, 'pl')),
        // The spreads, machine-readable — the answer to "what tarot spreads
        // can I do online?"
        block('ld-spreads', {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Rozkłady tarota online',
          numberOfItems: spreads.length,
          itemListElement: spreads.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${s.name.pl} — ${cardsLabel(s.cards, 'pl')}`,
            description: s.description.pl,
            url: `${SITE}/rozklady/`,
          })),
        }),
      ]
    case 'library':
      return [
        block('ld-library-faq', faqPageLd(libraryFaqs, 'pl')),
        block('ld-card-list', {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Znaczenia 78 kart tarota',
          numberOfItems: allCards.length,
          itemListElement: allCards.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name.pl,
            url: `${SITE}/karta/${cardSlug(c)}/`,
          })),
        }),
      ]
    case 'guide':
      return [
        block('ld-guide-faq', {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: 'pl',
          mainEntity: guideSections.map((sec) => ({
            '@type': 'Question',
            name: sec.title.pl,
            acceptedAnswer: { '@type': 'Answer', text: sec.body.pl },
          })),
        }),
        block('ld-guide-howto', {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Jak czytać tarota',
          description: viewDescriptions.guide.pl,
          inLanguage: 'pl',
          totalTime: 'PT10M',
          step: guideSections.map((sec, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: sec.title.pl,
            text: sec.body.pl,
            url: `${SITE}/przewodnik/`,
          })),
        }),
      ]
  }
}

export function renderPage(path: string): PageInfo {
  const html = renderToString(<App ssrPath={path} />)
  const card = allCards.find((c) => `/karta/${cardSlug(c)}/` === path)
  if (card) {
    const m = cardMeta(card, 'pl')
    const jsonld = [
      block('ld-card', {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: m.title,
            description: m.description,
            inLanguage: 'pl',
            mainEntityOfPage: m.url,
            datePublished: '2026-08-10',
            dateModified: LAST_UPDATED,
            author: publisher,
            publisher,
          },
          {
            '@type': 'FAQPage',
            inLanguage: 'pl',
            mainEntity: cardFaqs(card).map((f) => ({
              '@type': 'Question',
              name: f.q.pl,
              acceptedAnswer: { '@type': 'Answer', text: f.a.pl },
            })),
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
    ]
    return { path, html, title: m.title, description: m.description, canonical: m.url, jsonld }
  }
  const view = staticViews.find((v) => viewPaths[v] === path) ?? 'home'
  return {
    path,
    html,
    title: viewTitles[view].pl,
    description: viewDescriptions[view].pl,
    canonical: SITE + viewPaths[view],
    jsonld: staticJsonLd(view),
  }
}

export function listSpreads() {
  return spreads.map((s) => ({ name: s.name.pl, nameEn: s.name.en, cards: s.cards }))
}

/** Flat Q&A list for llms.txt — the answers an assistant is most likely to be
 *  asked for, in a form it can quote directly. */
export function listFaqs() {
  return [...homeFaqs, ...dailyFaqs, ...readingFaqs, ...libraryFaqs].map((f) => ({
    q: f.q.pl,
    a: f.a.pl,
    qEn: f.q.en,
    aEn: f.a.en,
  }))
}

export function listCards() {
  return allCards.map((c) => ({
    slug: cardSlug(c),
    namePl: c.name.pl,
    nameEn: c.name.en,
    keywordsPl: c.keywordsUpright.pl,
  }))
}
