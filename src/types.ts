export type Lang = 'pl' | 'en'

export interface CardText {
  pl: string
  en: string
}

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: string
  arcana: 'major' | 'minor'
  /** 0–21 for major arcana */
  number?: number
  suit?: Suit
  /** 1–14 for minor arcana (11 Page, 12 Knight, 13 Queen, 14 King) */
  rank?: number
  name: CardText
  keywordsUpright: CardText
  keywordsReversed: CardText
  upright: CardText
  reversed: CardText
}

export interface DrawnCard {
  card: TarotCard
  reversed: boolean
}

export type SpreadId = 'yesno' | 'one' | 'three' | 'love' | 'five' | 'celtic'

export interface Spread {
  id: SpreadId
  cards: number
  name: CardText
  description: CardText
  positions: CardText[]
}
