import type { DrawnCard, Lang, Suit } from '../types'

const suitTheme: Record<Suit, { pl: string; en: string }> = {
  wands: {
    pl: 'dominują Buławy — na pierwszy plan wychodzą działanie, energia i ambicje',
    en: 'Wands dominate — action, energy, and ambition take the stage',
  },
  cups: {
    pl: 'dominują Kielichy — to przede wszystkim opowieść o uczuciach i relacjach',
    en: 'Cups dominate — this is above all a story about feelings and relationships',
  },
  swords: {
    pl: 'dominują Miecze — dużo tu myśli, słów i spraw do rozstrzygnięcia',
    en: 'Swords dominate — there is much here of thoughts, words, and matters to settle',
  },
  pentacles: {
    pl: 'dominują Pentakle — chodzi o pracę, pieniądze i codzienny grunt pod nogami',
    en: 'Pentacles dominate — this is about work, money, and the ground beneath your feet',
  },
}

function themeSentence(drawn: DrawnCard[], lang: Lang): string {
  const n = drawn.length
  const majors = drawn.filter((d) => d.card.arcana === 'major').length
  if (majors * 2 >= n && majors > 0) {
    if (n === 1) {
      return lang === 'pl'
        ? 'Wypadła karta Wielkich Arkanów — dziś nie chodzi o drobiazgi.'
        : 'A Major Arcana card has appeared — today is not about small things.'
    }
    return lang === 'pl'
      ? `Aż ${majors} z ${n} kart to Wielkie Arkana — los mocno miesza w tej historii i stawka jest większa, niż się wydaje.`
      : `${majors} of the ${n} cards are Major Arcana — fate has a strong hand in this story, and the stakes are higher than they seem.`
  }
  const counts = new Map<Suit, number>()
  for (const d of drawn) {
    if (d.card.suit) counts.set(d.card.suit, (counts.get(d.card.suit) ?? 0) + 1)
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
  if (sorted.length > 0 && (sorted.length === 1 || sorted[0][1] > sorted[1][1])) {
    const [suit] = sorted[0]
    return lang === 'pl'
      ? `W tym rozkładzie ${suitTheme[suit].pl}.`
      : `In this spread, ${suitTheme[suit].en}.`
  }
  return lang === 'pl'
    ? 'Karty rozkładają się równomiernie między różne sfery życia — nic nie dominuje, wątki się przeplatają.'
    : 'The cards spread evenly across different areas of life — nothing dominates, and the threads intertwine.'
}

function orientationSentence(drawn: DrawnCard[], lang: Lang): string {
  const n = drawn.length
  const rev = drawn.filter((d) => d.reversed).length
  if (n === 1) {
    return drawn[0].reversed
      ? lang === 'pl'
        ? 'Karta jest odwrócona — jej energia szuka ujścia; potraktuj ją jako wskazówkę, co udrożnić.'
        : 'The card is reversed — its energy is looking for an outlet; treat it as a hint about what needs unblocking.'
      : lang === 'pl'
        ? 'Karta wypadła prosto, więc jej energia płynie swobodnie i sprzyja Twoim planom.'
        : 'The card fell upright, so its energy flows freely and favours your plans.'
  }
  if (rev === 0) {
    return lang === 'pl'
      ? 'Wszystkie karty wypadły prosto — energia płynie swobodnie i sprzyja Twoim zamiarom.'
      : 'Every card fell upright — the energy flows freely and favours your intentions.'
  }
  if (rev * 2 < n) {
    return lang === 'pl'
      ? 'Przewaga kart prostych daje rozkładowi jasną energię, a karty odwrócone wskazują miejsca, które proszą o uwagę.'
      : 'The upright majority gives the spread a bright energy, while the reversed cards point to the places asking for attention.'
  }
  if (rev * 2 > n) {
    return lang === 'pl'
      ? 'Sporo kart odwróconych — coś się blokuje; czytaj ten rozkład jak mapę zatorów, które warto udrożnić.'
      : 'Many cards are reversed — something is blocked; read this spread as a map of the jams worth clearing.'
  }
  return lang === 'pl'
    ? 'Karty proste i odwrócone równoważą się — sytuacja jest w ruchu i wiele zależy od Twojego następnego kroku.'
    : 'Upright and reversed cards balance out — the situation is in motion, and much depends on your next step.'
}

function arcSentence(drawn: DrawnCard[], lang: Lang): string {
  const first = drawn[0]
  const last = drawn[drawn.length - 1]
  if (drawn.length === 1) {
    const kw = first.reversed ? first.card.keywordsReversed[lang] : first.card.keywordsUpright[lang]
    return lang === 'pl'
      ? `Sedno: ${first.card.name.pl} — ${kw}.`
      : `The essence: ${first.card.name.en} — ${kw}.`
  }
  const firstKw = first.reversed ? first.card.keywordsReversed[lang] : first.card.keywordsUpright[lang]
  const lastKw = last.reversed ? last.card.keywordsReversed[lang] : last.card.keywordsUpright[lang]
  return lang === 'pl'
    ? `Oś opowieści biegnie od karty ${first.card.name.pl} (${firstKw}) do karty ${last.card.name.pl} (${lastKw}) — zestaw te dwa bieguny, a zobaczysz kierunek całości.`
    : `The story runs from ${first.card.name.en} (${firstKw}) to ${last.card.name.en} (${lastKw}) — hold those two poles together and the direction of the whole becomes clear.`
}

export function summarizeReading(drawn: DrawnCard[], lang: Lang): string {
  return [themeSentence(drawn, lang), orientationSentence(drawn, lang), arcSentence(drawn, lang)].join(' ')
}
