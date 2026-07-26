import { useState } from 'react'
import type { DrawnCard, Lang, Spread } from '../types'
import { spreads, ui } from '../lib/i18n'
import { drawCards } from '../lib/draw'
import { summarizeReading } from '../lib/summary'
import { FlipCard } from './FlipCard'
import { Reveal } from './Reveal'

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

  const reveal = (i: number) =>
    setRevealed((r) => r.map((v, idx) => (idx === i ? true : v)))

  const allRevealed = drawn !== null && revealed.every(Boolean)

  const slot = (i: number, extraClass = '', showLabel = true) =>
    drawn && (
      <div key={drawn[i].card.id} className={`spread-slot ${extraClass}`}>
        {showLabel && (
          <span className="position-label">
            {spread.cards > 5 ? `${i + 1}. ` : ''}
            {spread.positions[i][lang]}
          </span>
        )}
        <FlipCard
          card={drawn[i].card}
          lang={lang}
          revealed={revealed[i]}
          reversed={drawn[i].reversed}
          onReveal={() => reveal(i)}
          size={spread.cards === 1 ? 'lg' : spread.cards > 5 ? 'sm' : 'md'}
        />
      </div>
    )

  return (
    <section className="reading">
      <Reveal>
        <header className="page-head">
          <span className="page-index" aria-hidden="true">02</span>
          <h2 className="page-title">{ui.chooseSpread[lang]}</h2>
        </header>
      </Reveal>
      <Reveal className="spread-picker" delay={100}>
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
      </Reveal>

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
          {spread.id === 'celtic' ? (
            <div className="celtic-layout">
              <div className="celtic-cross">
                <div className="spread-slot ca5">
                  <span className="position-label">5. {spread.positions[4][lang]}</span>
                  <FlipCard card={drawn[4].card} lang={lang} revealed={revealed[4]} reversed={drawn[4].reversed} onReveal={() => reveal(4)} size="sm" />
                </div>
                <div className="spread-slot ca4">
                  <span className="position-label">4. {spread.positions[3][lang]}</span>
                  <FlipCard card={drawn[3].card} lang={lang} revealed={revealed[3]} reversed={drawn[3].reversed} onReveal={() => reveal(3)} size="sm" />
                </div>
                <div className="spread-slot ca-center">
                  <span className="position-label">1 · 2</span>
                  <div className="celtic-center">
                    <FlipCard card={drawn[0].card} lang={lang} revealed={revealed[0]} reversed={drawn[0].reversed} onReveal={() => reveal(0)} size="sm" />
                    <div className="celtic-crossing">
                      <FlipCard card={drawn[1].card} lang={lang} revealed={revealed[1]} reversed={drawn[1].reversed} onReveal={() => reveal(1)} size="sm" />
                    </div>
                  </div>
                </div>
                <div className="spread-slot ca6">
                  <span className="position-label">6. {spread.positions[5][lang]}</span>
                  <FlipCard card={drawn[5].card} lang={lang} revealed={revealed[5]} reversed={drawn[5].reversed} onReveal={() => reveal(5)} size="sm" />
                </div>
                <div className="spread-slot ca3">
                  <span className="position-label">3. {spread.positions[2][lang]}</span>
                  <FlipCard card={drawn[2].card} lang={lang} revealed={revealed[2]} reversed={drawn[2].reversed} onReveal={() => reveal(2)} size="sm" />
                </div>
              </div>
              <div className="celtic-staff">
                {[9, 8, 7, 6].map((i) => slot(i, ''))}
              </div>
            </div>
          ) : (
            <div className={`spread-layout spread-${spread.id}`}>
              {drawn.map((_, i) => slot(i))}
            </div>
          )}
          {allRevealed && (
            <div className="reading-results">
              {drawn.map((d, i) => (
                <article key={d.card.id} className="result-card">
                  <h3>
                    <span className="position-tag">
                      {spread.cards > 5 ? `${i + 1}. ` : ''}
                      {spread.positions[i][lang]}
                    </span>
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
              <article className="result-card summary-card">
                <h3>✦ {ui.summaryTitle[lang]}</h3>
                <p>{summarizeReading(drawn, lang)}</p>
              </article>
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
