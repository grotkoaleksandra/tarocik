import { useMemo, useState } from 'react'
import type { Lang } from '../types'
import { ui } from '../lib/i18n'
import { cardOfTheDay } from '../lib/draw'
import { FlipCard } from './FlipCard'
import { CardBack } from './CardArt'
import { Reveal } from './Reveal'
import { FaqSection } from './FaqSection'
import { homeFaqs } from '../lib/faq'

interface Props {
  lang: Lang
  onNavigate: (view: 'reading' | 'library') => void
}

export function Home({ lang, onNavigate }: Props) {
  const daily = useMemo(() => cardOfTheDay(), [])
  const [revealed, setRevealed] = useState(false)

  const dateLabel = new Date().toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <>
      <section className="hero">
        <Reveal className="hero-text">
          <p className="eyebrow">{ui.heroEyebrow[lang]}</p>
          <h1 className="display">
            {ui.heroLine1[lang]}
            <br />
            <em>{ui.heroLine2[lang]}</em>
          </h1>
          <p className="hero-sub">{ui.tagline[lang]}</p>
          <div className="hero-ctas">
            <button type="button" className="btn-ink" onClick={() => onNavigate('reading')}>
              {ui.ctaReading[lang]}
            </button>
            <button type="button" className="btn-ghost" onClick={() => onNavigate('library')}>
              {ui.ctaLibrary[lang]}
            </button>
          </div>
        </Reveal>
        <Reveal className="hero-stage" aria-hidden="true">
          <div className="hero-fan">
            <div className="fan-card fan-1"><CardBack /></div>
            <div className="fan-card fan-2"><CardBack /></div>
            <div className="fan-card fan-3"><CardBack /></div>
          </div>
        </Reveal>
      </section>

      <hr />

      <section className="daily">
        <Reveal className="daily-info">
          <p className="eyebrow">{dateLabel}</p>
          <h2 className="daily-title">{ui.cardOfTheDay[lang]}</h2>
          <p className="daily-sub">{ui.cardOfTheDayIntro[lang]}</p>
          {!revealed ? (
            <button type="button" className="btn-ink daily-btn" onClick={() => setRevealed(true)}>
              {ui.revealCard[lang]}
            </button>
          ) : (
            <div className="daily-meaning">
              <h3 className="daily-name">
                {daily.card.name[lang]}
                <span className="orientation-tag">
                  {daily.reversed ? ui.reversed[lang] : ui.upright[lang]}
                </span>
              </h3>
              <p className="keywords">
                {daily.reversed ? daily.card.keywordsReversed[lang] : daily.card.keywordsUpright[lang]}
              </p>
              <p className="daily-text">
                {daily.reversed ? daily.card.reversed[lang] : daily.card.upright[lang]}
              </p>
            </div>
          )}
        </Reveal>
        <Reveal className="daily-stage">
          <FlipCard
            card={daily.card}
            lang={lang}
            revealed={revealed}
            reversed={daily.reversed}
            onReveal={() => setRevealed(true)}
            size="lg"
          />
        </Reveal>
      </section>

      <FaqSection faqs={homeFaqs} lang={lang} ldId="ld-home-faq" />
    </>
  )
}
