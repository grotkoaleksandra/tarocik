import { useMemo, useState } from 'react'
import type { Lang } from '../types'
import { ui } from '../lib/i18n'
import { cardOfTheDay } from '../lib/draw'
import { FlipCard } from './FlipCard'
import { Reveal } from './Reveal'
import { Sparkle, WatercolorFlowerSvg } from './Doodles'

const copy = {
  intro: {
    pl: 'Karta dnia to najprostszy rytuał tarota: jedna karta tarota losowana na dziś — ta sama dla wszystkich odwiedzających, nowa każdego ranka. Bez logowania, za darmo. Odkryj ją, przeczytaj znaczenie proste lub odwrócone i sprawdź wieczorem, gdzie pojawiła się w Twoim dniu.',
    en: 'The card of the day is tarot’s simplest ritual: one tarot card drawn for today — the same for every visitor, fresh each morning. No sign-up, free. Reveal it, read its upright or reversed meaning, and check in the evening where it showed up in your day.',
  },
  how: {
    pl: 'Jak czytać kartę dnia? Potraktuj ją jako motyw przewodni, nie przepowiednię: pytanie, które karta zadaje, zwykle mówi więcej niż odpowiedź. Jeśli dopiero zaczynasz przygodę z tarotem, zajrzyj do naszego przewodnika albo poznaj znaczenia wszystkich 78 kart.',
    en: 'How to read it? Treat it as the day’s theme, not a prophecy: the question a card asks usually says more than any answer. If you are new to tarot, see our guide or explore the meanings of all 78 cards.',
  },
}

export function DailyPage({ lang }: { lang: Lang }) {
  const daily = useMemo(() => cardOfTheDay(), [])
  const [revealed, setRevealed] = useState(false)

  const dateLabel = new Date().toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <section className="daily-page">
      <Reveal>
        <header className="page-head">
          <span className="page-index" aria-hidden="true">01</span>
          <Sparkle className="hd hd-head-spark" />
          <h1 className="page-title">{ui.cardOfTheDay[lang]}</h1>
          <p className="page-sub">{copy.intro[lang]}</p>
        </header>
      </Reveal>
      <Reveal className="daily" delay={100}>
        <div className="daily-info">
          <p className="eyebrow">{dateLabel}</p>
          <p className="daily-sub">{ui.cardOfTheDayIntro[lang]}</p>
          {!revealed ? (
            <button type="button" className="btn-ink daily-btn" onClick={() => setRevealed(true)}>
              {ui.revealCard[lang]}
            </button>
          ) : (
            <div className="daily-meaning">
              <h2 className="daily-name">
                {daily.card.name[lang]}
                <span className="orientation-tag">
                  {daily.reversed ? ui.reversed[lang] : ui.upright[lang]}
                </span>
              </h2>
              <p className="keywords">
                {daily.reversed ? daily.card.keywordsReversed[lang] : daily.card.keywordsUpright[lang]}
              </p>
              <p className="daily-text">
                {daily.reversed ? daily.card.reversed[lang] : daily.card.upright[lang]}
              </p>
            </div>
          )}
          <p className="daily-how">{copy.how[lang]}</p>
        </div>
        <div className="daily-stage">
          <WatercolorFlowerSvg petals={5} seed={21} className="daily-flower" />
          <FlipCard
            card={daily.card}
            lang={lang}
            revealed={revealed}
            reversed={daily.reversed}
            onReveal={() => setRevealed(true)}
            size="lg"
          />
        </div>
      </Reveal>
    </section>
  )
}
