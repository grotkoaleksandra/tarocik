import type { Lang, TarotCard } from '../types'
import { cardSlug } from './slugs'

export const SITE = 'https://tarocik.com'

export type StaticViewId = 'home' | 'daily' | 'reading' | 'library' | 'guide'

export const viewPaths: Record<StaticViewId, string> = {
  home: '/',
  daily: '/karta-dnia/',
  reading: '/rozklady/',
  library: '/znaczenia-kart/',
  guide: '/przewodnik/',
}

export const viewTitles: Record<StaticViewId, { pl: string; en: string }> = {
  home: { pl: 'Tarocik — tarot online', en: 'Tarocik — tarot online' },
  daily: { pl: 'Karta dnia — darmowy tarot online — Tarocik', en: 'Card of the day — free tarot online — Tarocik' },
  reading: { pl: 'Rozkłady tarota — Tarocik', en: 'Tarot readings — Tarocik' },
  library: { pl: 'Znaczenia 78 kart tarota — Tarocik', en: 'All 78 tarot card meanings — Tarocik' },
  guide: { pl: 'Jak czytać tarota — przewodnik — Tarocik', en: 'How to read tarot — a guide — Tarocik' },
}

export const viewDescriptions: Record<StaticViewId, { pl: string; en: string }> = {
  daily: {
    pl: 'Wylosuj darmową kartę dnia: jedna karta tarota na dziś, ta sama dla wszystkich, nowa każdego ranka — ze znaczeniem prostym i odwróconym.',
    en: 'Draw a free card of the day: one tarot card for today, the same for everyone, fresh every morning — with upright and reversed meanings.',
  },
  home: {
    pl: 'Tarot online: karta dnia, interaktywne rozkłady i znaczenia wszystkich 78 kart tarota — po polsku i angielsku.',
    en: 'Tarot online: a card of the day, interactive spreads, and meanings for all 78 tarot cards — in Polish and English.',
  },
  reading: {
    pl: 'Rozłóż karty online: tak czy nie, jedna karta, trzy karty, tarot miłosny, mały krzyż lub krzyż celtycki — z interpretacją i podsumowaniem.',
    en: 'Draw tarot cards online: yes or no, one card, three cards, love tarot, small cross, or Celtic cross — with interpretations and a summary.',
  },
  library: {
    pl: 'Znaczenia wszystkich 78 kart tarota — proste i odwrócone, ze słowami kluczami. Wielkie i Małe Arkana.',
    en: 'Meanings of all 78 tarot cards — upright and reversed, with keywords. Major and Minor Arcana.',
  },
  guide: {
    pl: 'Przewodnik dla początkujących: czym jest tarot, jak zadawać pytania, jak czytać rozkłady i karty odwrócone.',
    en: 'A beginner’s guide: what tarot is, how to ask questions, how to read spreads and reversed cards.',
  },
}

export function cardMeta(card: TarotCard, lang: Lang) {
  const suffix = lang === 'pl' ? 'znaczenie karty tarota' : 'tarot card meaning'
  return {
    title: `${card.name[lang]} — ${suffix} — Tarocik`,
    description: `${card.keywordsUpright[lang]} · ${card.upright[lang]}`.slice(0, 155),
    url: `${SITE}/karta/${cardSlug(card)}/`,
  }
}
