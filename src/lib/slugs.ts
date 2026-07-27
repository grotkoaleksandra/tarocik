import type { TarotCard } from '../types'
import { allCards } from '../data/cards'

/* Keep in sync with the copy in scripts/postbuild.mjs. */
const PL_CHARS: Record<string, string> = {
  ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .split('')
    .map((ch) => PL_CHARS[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** URL slug for a card, based on its Polish name: "As Buław" → "as-bulaw". */
export const cardSlug = (card: TarotCard) => slugify(card.name.pl)

const bySlug = new Map(allCards.map((c) => [cardSlug(c), c]))

export const cardBySlug = (slug: string) => bySlug.get(slug)
