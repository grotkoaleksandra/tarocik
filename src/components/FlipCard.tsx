import { useEffect, useState } from 'react'
import type { Lang, TarotCard } from '../types'
import { CardArt, CardBack } from './CardArt'

interface Props {
  card: TarotCard
  lang: Lang
  revealed: boolean
  reversed: boolean
  onReveal?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function FlipCard({ card, lang, revealed, reversed, onReveal, size = 'md' }: Props) {
  // After the flip transition ends we drop the 3D context entirely and render
  // the front face flat — long-lived preserve-3d layers are a common source of
  // compositor glitches, and the card no longer needs them once face up.
  const [settled, setSettled] = useState(revealed)

  useEffect(() => {
    if (!revealed) {
      setSettled(false)
      return
    }
    // Slightly longer than the 0.7s flip transition; a timer is more reliable
    // than transitionend (which never fires when transitions are disabled).
    const t = setTimeout(() => setSettled(true), 750)
    return () => clearTimeout(t)
  }, [revealed])

  if (settled) {
    return (
      <div className={`flip-card flip-${size} is-settled`} aria-label={card.name[lang]}>
        <span className={`flip-face-flat ${reversed ? 'is-reversed' : ''}`}>
          <CardArt card={card} lang={lang} />
        </span>
      </div>
    )
  }

  return (
    <button
      type="button"
      className={`flip-card flip-${size} ${revealed ? 'is-revealed' : ''}`}
      onClick={onReveal}
      disabled={revealed || !onReveal}
      aria-label={revealed ? card.name[lang] : undefined}
    >
      <span className="flip-inner">
        <span className="flip-face flip-back">
          <CardBack />
        </span>
        <span className={`flip-face flip-front ${reversed ? 'is-reversed' : ''}`}>
          <CardArt card={card} lang={lang} />
        </span>
      </span>
    </button>
  )
}
