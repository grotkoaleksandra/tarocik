import { useState } from 'react'
import type { DrawnCard, Lang, Spread } from '../types'
import { spreads, ui } from '../lib/i18n'
import { drawCards } from '../lib/draw'
import { FlipCard } from './FlipCard'

export function Reading({ lang }: { lang: Lang }) {
  const [spread, setSpread] = useState<Spread>(spreads[1])
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>([])
  const [shuffling, setShuffling] = useState(false)

  const startDraw = (s: Spread) => {
    setShuffling(true)
    setDrawn(null)
    setTimeout(() => {
      setDrawn(drawCards(s.cards))
      setRevealed(new Array(s.cards).fill(false))
      setShuffling(false)
    }, 900)
  }

  const allRevealed = drawn !== null && revealed.every(Boolean)

  return (
    <section className="reading">
      <h2 className="section-title">{ui.chooseSpread[lang]}</h2>
      <div className="spread-picker">
        {spreads.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`spread-option ${spread.id === s.id ? 'is-active' : ''}`}
            onClick={() => {
              setSpread(s)
              setDrawn(null)
            }}
          >
            <span className="spread-name">{s.name[lang]}</span>
            <span className="spread-desc">{s.description[lang]}</span>
          </button>
        ))}
      </div>

      {!drawn && !shuffling && (
        <div className="reading-start">
          <p className="section-sub">{ui.focusHint[lang]}</p>
          <button type="button" className="btn-gold" onClick={() => startDraw(spread)}>
            {ui.drawCards[lang]}
          </button>
        </div>
      )}

      {shuffling && (
        <div className="shuffle-stage" aria-live="polite">
          <div className="shuffle-cards">
            <span /><span /><span />
          </div>
          <p className="section-sub">{ui.shuffling[lang]}</p>
        </div>
      )}

      {drawn && (
        <>
          {!allRevealed && <p className="section-sub tap-hint">{ui.tapToReveal[lang]}</p>}
          <div className={`spread-layout spread-${spread.id}`}>
            {drawn.map((d, i) => (
              <div key={d.card.id} className="spread-slot">
                <span className="position-label">{spread.positions[i][lang]}</span>
                <FlipCard
                  card={d.card}
                  lang={lang}
                  revealed={revealed[i]}
                  reversed={d.reversed}
                  onReveal={() =>
                    setRevealed((r) => r.map((v, idx) => (idx === i ? true : v)))
                  }
                  size={spread.cards === 1 ? 'lg' : 'md'}
                />
              </div>
            ))}
          </div>
          {allRevealed && (
            <div className="reading-results">
              {drawn.map((d, i) => (
                <article key={d.card.id} className="result-card">
                  <h3>
                    <span className="position-tag">{spread.positions[i][lang]}</span>
                    {d.card.name[lang]}
                    <span className="orientation-tag">
                      {d.reversed ? ui.reversed[lang] : ui.upright[lang]}
                    </span>
                  </h3>
                  <p className="keywords">
                    {d.reversed ? d.card.keywordsReversed[lang] : d.card.keywordsUpright[lang]}
                  </p>
                  <p>{d.reversed ? d.card.reversed[lang] : d.card.upright[lang]}</p>
                </article>
              ))}
              <button type="button" className="btn-gold" onClick={() => startDraw(spread)}>
                {ui.drawAgain[lang]}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
