import type { Lang } from '../types'

/** "1 karta", "3 karty", "5 kart" — Polish counts three ways, and getting it
 *  wrong is the first thing a Polish reader notices. */
export function cardsLabel(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} card${n === 1 ? '' : 's'}`
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    n === 1
      ? 'karta'
      : [2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)
        ? 'karty'
        : 'kart'
  return `${n} ${word}`
}
