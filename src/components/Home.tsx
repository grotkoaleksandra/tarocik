import { useMemo, useState } from 'react'
import type { Lang } from '../types'
import { ui } from '../lib/i18n'
import { cardOfTheDay } from '../lib/draw'
import { FlipCard } from './FlipCard'
import { CardBack } from './CardArt'
import { WatercolorFlowerSvg } from './Doodles'
import { Reveal } from './Reveal'
import { majorArcana } from '../data/major'

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

  const names = majorArcana.map((c) => c.name[lang])

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
              {ui.ctaReading[lang]} <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="btn-ghost" onClick={() => onNavigate('library')}>
              {ui.ctaLibrary[lang]}
            </button>
          </div>
        </Reveal>
        <Reveal className="hero-stage" delay={150} aria-hidden="true">
          <WatercolorFlowerSvg petals={6} seed={9} accent className="hero-flower" />
          <div className="hero-fan">
            <div className="fan-card fan-1"><CardBack /></div>
            <div className="fan-card fan-2"><CardBack /></div>
            <div className="fan-card fan-3"><CardBack /></div>
          </div>
        </Reveal>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee-seg">
              {names.map((n) => (
                <span key={n} className="marquee-item">
                  {n} <i>·</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="daily">
        <Reveal className="daily-info">
          <p className="eyebrow">01 · {dateLabel}</p>
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
        <Reveal className="daily-stage" delay={120}>
          <WatercolorFlowerSvg petals={5} seed={21} className="daily-flower" />
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
    </>
  )
}
