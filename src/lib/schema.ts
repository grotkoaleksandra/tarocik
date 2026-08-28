/* Structured-data builders shared by the client and the prerenderer, so the
   JSON-LD baked into the static HTML and the JSON-LD the app upserts on
   navigation are always identical. */
import type { Lang } from '../types'
import type { Faq } from './faq'
import { SITE } from './meta'

/** Build date, injected by Vite. Freshness is a ranking and citation signal:
 *  answer engines prefer sources that state when they were last updated. */
export const LAST_UPDATED: string =
  typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : '2026-08-28'

/** The people and brand behind the site. Answer engines lean on entity data to
 *  decide whether a source is a real, attributable publisher. */
export const publisher = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Tarocik',
  url: `${SITE}/`,
  logo: `${SITE}/og.png`,
  description:
    'Darmowy tarot online po polsku i angielsku: karta dnia, interaktywne rozkłady i znaczenia wszystkich 78 kart tarota.',
  founder: {
    '@type': 'Person',
    name: 'cotoaleksandra',
    url: 'https://cotoaleksandra.com',
    sameAs: ['https://www.instagram.com/cotoaleksandra/', 'https://cotoaleksandra.com'],
  },
  sameAs: ['https://www.instagram.com/cotoaleksandra/', 'https://cotoaleksandra.com'],
}

export function faqPageLd(faqs: Faq[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
    })),
  }
}
