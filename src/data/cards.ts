import type { TarotCard } from '../types'
import { majorArcana } from './major'
import { wands } from './wands'
import { cups } from './cups'
import { swords } from './swords'
import { pentacles } from './pentacles'

export const allCards: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
]

export const cardById = new Map(allCards.map((c) => [c.id, c]))
