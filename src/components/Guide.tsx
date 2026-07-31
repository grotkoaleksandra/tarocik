import { useEffect } from 'react'
import type { Lang, TarotCard } from '../types'
import { Reveal } from './Reveal'
import { MoonDoodle, Sparkle, Squiggle } from './Doodles'
import { setJsonLd } from '../lib/jsonld'
import { cardBySlug } from '../lib/slugs'

interface Section {
  title: { pl: string; en: string }
  body: { pl: string; en: string }
  cards?: string[]
}

const intro = {
  title: { pl: 'Jak czytać tarota', en: 'How to read tarot' },
  lead: {
    pl: 'Nie potrzebujesz daru jasnowidzenia — tarot to talia 78 obrazów, które pomagają nazwać to, co już w Tobie siedzi. Oto wszystko, czego potrzebujesz na start.',
    en: 'You don’t need second sight — tarot is a deck of 78 pictures that help you put words to what is already inside you. Here is everything you need to begin.',
  },
}

const sections: Section[] = [
  {
    title: { pl: 'Czym właściwie jest tarot?', en: 'What is tarot, really?' },
    body: {
      pl: 'Talia dzieli się na 22 Wielkie Arkana — wielkie tematy życia, jak Śmierć, Kochankowie czy Koło Fortuny — oraz 56 Małych Arkanów w czterech kolorach: Buławy (energia i działanie), Kielichy (uczucia), Miecze (myśli i słowa) i Pentakle (ciało, praca, pieniądze). Karty nie przepowiadają przyszłości; działają jak lustro — pokazują sytuację pod innym kątem i podsuwają pytania, których sami byśmy sobie nie zadali.',
      en: 'The deck splits into 22 Major Arcana — life’s big themes, like Death, the Lovers, or the Wheel of Fortune — and 56 Minor Arcana in four suits: Wands (energy and action), Cups (feelings), Swords (thoughts and words), and Pentacles (body, work, money). The cards don’t predict the future; they work like a mirror — showing your situation from a new angle and asking questions you wouldn’t have asked yourself.',
    },
    cards: ['smierc', 'kochankowie', 'kolo-fortuny'],
  },
  {
    title: { pl: 'Jak zadać dobre pytanie', en: 'How to ask a good question' },
    body: {
      pl: 'Unikaj pytań zamkniętych („czy on wróci?”) — karty najlepiej odpowiadają na pytania otwarte: „co powinnam wiedzieć o…”, „co blokuje…”, „jaką energię warto wnieść w…”. Dobre pytanie zostawia Ci sprawczość: nie „co się stanie?”, tylko „co mogę z tym zrobić?”.',
      en: 'Avoid closed questions (“will he come back?”) — the cards answer open questions best: “what should I know about…”, “what is blocking…”, “what energy should I bring to…”. A good question keeps the agency with you: not “what will happen?” but “what can I do about it?”.',
    },
  },
  {
    title: { pl: 'Czytanie rozkładu', en: 'Reading a spread' },
    body: {
      pl: 'Najpierw przeczytaj każdą kartę w jej pozycji — karta „przeszkody” mówi co innego niż ta sama karta w pozycji „rady”. Potem spójrz na całość: czy dominuje któryś kolor? Dużo Wielkich Arkanów oznacza sprawy o dużym ciężarze. Na końcu zaufaj pierwszemu skojarzeniu — obraz, który przyciąga Twój wzrok, zwykle wie, dlaczego to robi. Nasze podsumowanie pod każdym rozkładem podpowie Ci wątki, ale Twoja intuicja ma pierwszeństwo.',
      en: 'First read each card in its position — a card in the “obstacle” slot says something different than the same card as “advice”. Then look at the whole: does one suit dominate? Many Major Arcana means the matter carries real weight. Finally, trust your first association — the image your eye keeps returning to usually knows why. The summary under every reading will point out threads, but your intuition takes precedence.',
    },
  },
  {
    title: { pl: 'Karty odwrócone', en: 'Reversed cards' },
    body: {
      pl: 'Karta odwrócona to nie „zła wróżba”. Najczęściej oznacza tę samą energię, ale zablokowaną, wewnętrzną albo przesadzoną — Siła odwrócona to nie brak siły, tylko zwątpienie w nią. Jeśli odwrócenia Cię stresują, możesz je po prostu ignorować; wielu tarocistów czyta wyłącznie karty proste.',
      en: 'A reversed card is not a “bad omen”. Most often it is the same energy, but blocked, turned inward, or overdone — reversed Strength is not weakness, it is doubting your strength. If reversals stress you out, you can simply ignore them; many readers work with upright cards only.',
    },
    cards: ['sila'],
  },
  {
    title: { pl: 'Mały rytuał na co dzień', en: 'A small daily ritual' },
    body: {
      pl: 'Najlepszy sposób na naukę: jedna karta dziennie. Wyciągnij kartę dnia, przeczytaj jej znaczenie i wieczorem sprawdź, gdzie pojawiła się w Twoim dniu. Po miesiącu będziesz znać pół talii — nie z pamięci, tylko z życia. Dziennik pomaga: data, karta, jedno zdanie.',
      en: 'The best way to learn: one card a day. Draw the card of the day, read its meaning, and in the evening check where it showed up in your day. After a month you will know half the deck — not from memory, but from life. A journal helps: date, card, one sentence.',
    },
  },
]

interface GuideProps {
  lang: Lang
  onOpenCard: (card: TarotCard) => void
}

export function Guide({ lang, onOpenCard }: GuideProps) {
  useEffect(() => {
    setJsonLd('ld-guide-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: sections.map((s) => ({
        '@type': 'Question',
        name: s.title[lang],
        acceptedAnswer: { '@type': 'Answer', text: s.body[lang] },
      })),
    })
    return () => setJsonLd('ld-guide-faq', null)
  }, [lang])

  const seeAlso = { pl: 'Zobacz karty:', en: 'See the cards:' }

  return (
    <section className="guide">
      <Reveal>
        <header className="page-head">
          <span className="page-index" aria-hidden="true">04</span>
          <Sparkle className="hd hd-head-spark" />
          <h1 className="page-title">{intro.title[lang]}</h1>
          <p className="page-sub">{intro.lead[lang]}</p>
        </header>
      </Reveal>
      <div className="guide-body">
        {sections.map((s, i) => (
          <Reveal key={s.title.en} className="guide-section" delay={i * 60}>
            <h3 className="guide-heading">
              <span className="guide-num">{String(i + 1).padStart(2, '0')}</span>
              {s.title[lang]}
            </h3>
            <p>{s.body[lang]}</p>
            {s.cards && (
              <p className="guide-see-also">
                {seeAlso[lang]}{' '}
                {s.cards.map((slug, k) => {
                  const card = cardBySlug(slug)
                  if (!card) return null
                  return (
                    <span key={slug}>
                      {k > 0 && ' · '}
                      <a
                        href={`/karta/${slug}/`}
                        onClick={(e) => {
                          e.preventDefault()
                          onOpenCard(card)
                        }}
                      >
                        {card.name[lang]}
                      </a>
                    </span>
                  )
                })}
              </p>
            )}
          </Reveal>
        ))}
        <div className="squiggle-divider" aria-hidden="true">
          <Squiggle className="squiggle" />
        </div>
        <MoonDoodle className="hd hd-guide-moon" />
      </div>
    </section>
  )
}
