import { useMemo, useState } from 'react'
import type { Lang } from '../types'
import { ui } from '../lib/i18n'
import { cardOfTheDay } from '../lib/draw'
import { FlipCard } from './FlipCard'

export function Home({ lang }: { lang: Lang }) {
  const daily = useMemo(() => cardOfTheDay(), [])
  const [revealed, setRevealed] = useState(false)

  const dateLabel = new Date().toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <section className="home">
      <p className="home-tagline">{ui.tagline[lang]}</p>
      <h2 className="section-title">{ui.cardOfTheDay[lang]}</h2>
      <p className="section-sub">
        {dateLabel} · {ui.cardOfTheDayIntro[lang]}
      </p>
      <div className="daily-stage">
        <FlipCard
          card={daily.card}
          lang={lang}
          revealed={revealed}
          reversed={daily.reversed}
          onReveal={() => setRevealed(true)}
          size="lg"
        />
      </div>
      {!revealed ? (
        <button type="button" className="btn-gold" onClick={() => setRevealed(true)}>
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
    </section>
  )
}
