import { useMemo, useState } from 'react'
import type { Lang } from '../types'
import { ui } from '../lib/i18n'
import { cardOfTheDay } from '../lib/draw'
import { FlipCard } from './FlipCard'
import { CardBack } from './CardArt'
import {
  ArrowDoodle,
  BlobShape,
  EyeDoodle,
  MoonDoodle,
  Sparkle,
  Squiggle,
  WatercolorFlowerSvg,
} from './Doodles'
import { Reveal } from './Reveal'

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
        <Sparkle className="hd hd-spark-1" />
        <Sparkle className="hd hd-spark-2" />
        <Sparkle className="hd hd-spark-3" />
        <MoonDoodle className="hd hd-moon" />
        <EyeDoodle className="hd hd-eye" />
        <ArrowDoodle className="hd hd-arrow" />
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
          <BlobShape color="#f2a541" className="hero-blob" />
          <WatercolorFlowerSvg petals={6} seed={9} accent className="hero-flower" />
          <div className="hero-fan">
            <div className="fan-card fan-1"><CardBack /></div>
            <div className="fan-card fan-2"><CardBack /></div>
            <div className="fan-card fan-3"><CardBack /></div>
          </div>
        </Reveal>
        <button
          type="button"
          className="scroll-cue"
          onClick={() =>
            document.querySelector('.daily')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        >
          {ui.scrollDown[lang]} <span className="scroll-arrow" aria-hidden="true">↓</span>
        </button>
      </section>

      <div className="squiggle-divider" aria-hidden="true">
        <Squiggle className="squiggle" />
      </div>

      <section className="daily">
        <Sparkle className="hd hd-daily-spark" />
        <MoonDoodle className="hd hd-daily-moon" />
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
