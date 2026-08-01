import { useEffect } from 'react'
import type { Lang, TarotCard } from '../types'
import { allCards } from '../data/cards'
import { ui } from '../lib/i18n'
import { cardSlug } from '../lib/slugs'
import { CardArt } from './CardArt'
import { Sparkle } from './Doodles'
import { setJsonLd } from '../lib/jsonld'
import { SITE, cardMeta } from '../lib/meta'
import { majorDetails } from '../data/majorDetails'
import { minorDetails } from '../data/minorDetails'

interface Props {
  card: TarotCard
  lang: Lang
  onOpenCard: (card: TarotCard) => void
  onOpenLibrary: () => void
  onOpenReading: () => void
}

export function CardPage({ card, lang, onOpenCard, onOpenLibrary, onOpenReading }: Props) {
  const details = majorDetails[card.id] ?? minorDetails[card.id]
  const idx = allCards.findIndex((c) => c.id === card.id)
  const prev = allCards[(idx + allCards.length - 1) % allCards.length]
  const next = allCards[(idx + 1) % allCards.length]

  useEffect(() => {
    const { title, description: desc, url } = cardMeta(card, lang)
    document.title = title
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    setJsonLd('ld-card', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: document.title,
          description: desc,
          inLanguage: lang,
          mainEntityOfPage: url,
          author: { '@type': 'Organization', name: 'Tarocik', url: SITE },
          publisher: { '@type': 'Organization', name: 'Tarocik', url: SITE },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Tarocik', item: `${SITE}/` },
            {
              '@type': 'ListItem',
              position: 2,
              name: lang === 'pl' ? 'Znaczenia kart' : 'Card meanings',
              item: `${SITE}/znaczenia-kart/`,
            },
            { '@type': 'ListItem', position: 3, name: card.name[lang], item: url },
          ],
        },
      ],
    })
    return () => setJsonLd('ld-card', null)
  }, [card, lang])

  const link = (target: TarotCard, label: string, cls: string) => (
    <a
      className={cls}
      href={`/karta/${cardSlug(target)}/`}
      onClick={(e) => {
        e.preventDefault()
        onOpenCard(target)
      }}
    >
      {label}
    </a>
  )

  return (
    <section className="card-page">
      <a
        className="back-link"
        href="/znaczenia-kart/"
        onClick={(e) => {
          e.preventDefault()
          onOpenLibrary()
        }}
      >
        ← {ui.libraryTitle[lang]}
      </a>
      <div className="card-page-body">
        <div className="card-page-art">
          <CardArt card={card} lang={lang} />
        </div>
        <div className="card-page-text">
          <Sparkle className="hd hd-card-spark" />
          <h1 className="card-page-title">{card.name[lang]}</h1>
          <p className="modal-sub">
            {card.arcana === 'major' ? ui.majorArcana[lang] : ui.minorArcana[lang]}
          </p>
          <section>
            <h2 className="card-page-h2">{ui.uprightMeaning[lang]}</h2>
            <p className="keywords">{card.keywordsUpright[lang]}</p>
            <p>{card.upright[lang]}</p>
          </section>
          <section>
            <h2 className="card-page-h2">{ui.reversedMeaning[lang]}</h2>
            <p className="keywords">{card.keywordsReversed[lang]}</p>
            <p>{card.reversed[lang]}</p>
          </section>
          {details && (
            <>
              <section>
                <h2 className="card-page-h2">{ui.cardLove[lang]}</h2>
                <p>{details.love[lang]}</p>
              </section>
              <section>
                <h2 className="card-page-h2">{ui.cardWork[lang]}</h2>
                <p>{details.work[lang]}</p>
              </section>
              <section>
                <h2 className="card-page-h2">{ui.cardHealth[lang]}</h2>
                <p>{details.health[lang]}</p>
              </section>
              <section>
                <h2 className="card-page-h2">{ui.cardAdvice[lang]}</h2>
                <p>{details.advice[lang]}</p>
              </section>
            </>
          )}
          <a
            className="btn-ink card-page-cta"
            href="/rozklady/"
            onClick={(e) => {
              e.preventDefault()
              onOpenReading()
            }}
          >
            {ui.ctaReading[lang]} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <nav className="card-page-nav" aria-label="cards">
        {link(prev, `← ${prev.name[lang]}`, 'card-nav-link')}
        {link(next, `${next.name[lang]} →`, 'card-nav-link')}
      </nav>
    </section>
  )
}
