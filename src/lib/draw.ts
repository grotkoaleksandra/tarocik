import type { DrawnCard, Lang, TarotCard } from '../types'
import { allCards } from '../data/cards'

/** Deterministic PRNG (mulberry32) so the daily card is stable for a given date. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** The same card (and orientation) for everyone on a given local date. */
export function cardOfTheDay(date = new Date()): DrawnCard {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const rand = mulberry32(hashString(`tarocik:${key}`))
  const card = allCards[Math.floor(rand() * allCards.length)]
  return { card, reversed: rand() < 0.3 }
}

/** Fisher–Yates draw of `count` distinct cards, each with a chance of being reversed. */
export function drawCards(count: number): DrawnCard[] {
  const deck = [...allCards]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck.slice(0, count).map((card) => ({ card, reversed: Math.random() < 0.3 }))
}

export function romanNumeral(n: number): string {
  if (n === 0) return '0'
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let result = ''
  let rest = n
  for (const [value, glyph] of table) {
    while (rest >= value) {
      result += glyph
      rest -= value
    }
  }
  return result
}

const rankNumerals: Record<number, { pl: string; en: string }> = {
  11: { pl: 'PAŹ', en: 'PAGE' },
  12: { pl: 'RYCERZ', en: 'KNIGHT' },
  13: { pl: 'KRÓLOWA', en: 'QUEEN' },
  14: { pl: 'KRÓL', en: 'KING' },
}

/** Short label shown on the card face: roman numeral, "AS", or court rank. */
export function cardLabel(card: TarotCard, lang: Lang): string {
  if (card.arcana === 'major') return romanNumeral(card.number ?? 0)
  const rank = card.rank ?? 1
  if (rank === 1) return lang === 'pl' ? 'AS' : 'ACE'
  if (rank <= 10) return romanNumeral(rank)
  return rankNumerals[rank][lang]
}
