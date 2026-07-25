import { useEffect } from 'react'
import type { Lang, TarotCard } from '../types'
import { ui } from '../lib/i18n'
import { CardArt } from './CardArt'

interface Props {
  card: TarotCard
  lang: Lang
  onClose: () => void
}

export function CardDetail({ card, lang, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={card.name[lang]}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label={ui.close[lang]}>
          ✕
        </button>
        <div className="modal-body">
          <div className="modal-card">
            <CardArt card={card} lang={lang} />
          </div>
          <div className="modal-text">
            <h2 className="modal-title">{card.name[lang]}</h2>
            <p className="modal-sub">
              {card.arcana === 'major' ? ui.majorArcana[lang] : ui.minorArcana[lang]}
            </p>
            <section>
              <h3>{ui.uprightMeaning[lang]}</h3>
              <p className="keywords">{card.keywordsUpright[lang]}</p>
              <p>{card.upright[lang]}</p>
            </section>
            <section>
              <h3>{ui.reversedMeaning[lang]}</h3>
              <p className="keywords">{card.keywordsReversed[lang]}</p>
              <p>{card.reversed[lang]}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
