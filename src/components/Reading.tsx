import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { DrawnCard, Lang, Spread } from '../types'
import { spreads, ui } from '../lib/i18n'
import { drawCards } from '../lib/draw'
import { summarizeReading } from '../lib/summary'
import { FlipCard } from './FlipCard'
import { Reveal } from './Reveal'
import { MoonDoodle, Sparkle } from './Doodles'

type Phase = 'pick' | 'shuffle' | 'board'

export function Reading({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<Phase>('pick')
  const [spread, setSpread] = useState<Spread>(spreads[1])
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>([])
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const startReading = (s: Spread) => {
    setSpread(s)
    setDrawn(null)
    setPhase('shuffle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setDrawn(drawCards(s.cards))
      setRevealed(new Array(s.cards).fill(false))
      setPhase('board')
    }, 1600)
  }

  const backToPick = () => {
    window.clearTimeout(timer.current)
    setDrawn(null)
    setPhase('pick')
  }

  const reveal = (i: number) =>
    setRevealed((r) => r.map((v, idx) => (idx === i ? true : v)))

  const allRevealed = drawn !== null && revealed.every(Boolean)

  // The interpretations are the payoff — bring them into view once the
  // last card has flipped, but only after a pause long enough to actually
  // look at that final card.
  useEffect(() => {
    if (!allRevealed) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let fallback: number | undefined
    const t = window.setTimeout(() => {
      const el = document.querySelector('.reading-results')
      if (!el) return
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      // If smooth scrolling is throttled and never moves, jump instead.
      fallback = window.setTimeout(() => {
        if (Math.abs(el.getBoundingClientRect().top) > 150) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      }, 1000)
    }, 2600)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(fallback)
    }
  }, [allRevealed])

  const slot = (i: number, dealOrder = i) =>
    drawn && (
      <div
        key={drawn[i].card.id}
        className="spread-slot"
        style={{ '--i': dealOrder } as CSSProperties}
      >
        <span className="position-label">
          {spread.cards > 5 ? `${i + 1}. ` : ''}
          {spread.positions[i][lang]}
        </span>
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

  if (phase === 'pick') {
    return (
      <section className="reading">
        <Reveal>
          <header className="page-head">
            <span className="page-index" aria-hidden="true">02</span>
            <Sparkle className="hd hd-head-spark" />
            <h1 className="page-title">{ui.chooseSpread[lang]}</h1>
          </header>
        </Reveal>
        <Reveal className="spread-picker" delay={100}>
          {spreads.map((s) => (
            <button
              key={s.id}
              type="button"
              className="spread-option"
              onClick={() => startReading(s)}
            >
              <span className="spread-name">{s.name[lang]}</span>
              <span className="spread-desc">{s.description[lang]}</span>
              <span className="spread-go" aria-hidden="true">→</span>
            </button>
          ))}
        </Reveal>
      </section>
    )
  }

  if (phase === 'shuffle') {
    return (
      <section className="reading shuffle-screen" aria-live="polite">
        <MoonDoodle className="hd hd-shuffle-moon" />
        <Sparkle className="hd hd-shuffle-spark-1" />
        <Sparkle className="hd hd-shuffle-spark-2" />
        <div className="shuffle-cards">
          <span /><span /><span />
        </div>
        <h1 className="shuffle-title">{ui.shuffling[lang]}</h1>
        <p className="section-sub">{ui.focusHint[lang]}</p>
      </section>
    )
  }

  return (
    <section className="reading">
      <div className="board-head">
        <button type="button" className="back-link" onClick={backToPick}>
          ← {ui.changeSpread[lang]}
        </button>
        <h1 className="board-title">{spread.name[lang]}</h1>
        {!allRevealed && <p className="section-sub">{ui.tapToReveal[lang]}</p>}
      </div>

      {drawn && (
        <>
          {spread.id === 'celtic' ? (
            <div className="celtic-layout">
              <div className="celtic-cross">
                <div className="spread-slot ca5" style={{ '--i': 4 } as CSSProperties}>
                  <span className="position-label">5. {spread.positions[4][lang]}</span>
                  <FlipCard card={drawn[4].card} lang={lang} revealed={revealed[4]} reversed={drawn[4].reversed} onReveal={() => reveal(4)} size="sm" />
                </div>
                <div className="spread-slot ca4" style={{ '--i': 3 } as CSSProperties}>
                  <span className="position-label">4. {spread.positions[3][lang]}</span>
                  <FlipCard card={drawn[3].card} lang={lang} revealed={revealed[3]} reversed={drawn[3].reversed} onReveal={() => reveal(3)} size="sm" />
                </div>
                <div className="spread-slot ca-center" style={{ '--i': 0 } as CSSProperties}>
                  <span className="position-label">1 · 2</span>
                  <div className="celtic-center">
                    <FlipCard card={drawn[0].card} lang={lang} revealed={revealed[0]} reversed={drawn[0].reversed} onReveal={() => reveal(0)} size="sm" />
                    <div className="celtic-crossing">
                      <FlipCard card={drawn[1].card} lang={lang} revealed={revealed[1]} reversed={drawn[1].reversed} onReveal={() => reveal(1)} size="sm" />
                    </div>
                  </div>
                </div>
                <div className="spread-slot ca6" style={{ '--i': 5 } as CSSProperties}>
                  <span className="position-label">6. {spread.positions[5][lang]}</span>
                  <FlipCard card={drawn[5].card} lang={lang} revealed={revealed[5]} reversed={drawn[5].reversed} onReveal={() => reveal(5)} size="sm" />
                </div>
                <div className="spread-slot ca3" style={{ '--i': 2 } as CSSProperties}>
                  <span className="position-label">3. {spread.positions[2][lang]}</span>
                  <FlipCard card={drawn[2].card} lang={lang} revealed={revealed[2]} reversed={drawn[2].reversed} onReveal={() => reveal(2)} size="sm" />
                </div>
              </div>
              <div className="celtic-staff">
                {[9, 8, 7, 6].map((i, order) => slot(i, 6 + order))}
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
              <button type="button" className="btn-gold" onClick={() => startReading(spread)}>
                {ui.drawAgain[lang]}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
