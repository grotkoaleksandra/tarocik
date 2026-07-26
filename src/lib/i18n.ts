import type { CardText, Lang, Spread } from '../types'

export const ui = {
  navHome: { pl: 'Karta dnia', en: 'Card of the day' },
  navReading: { pl: 'Rozkłady', en: 'Readings' },
  navLibrary: { pl: 'Znaczenia kart', en: 'Card meanings' },
  tagline: {
    pl: 'Twój mały przewodnik po tarocie — karta dnia, rozkłady i znaczenia wszystkich 78 kart.',
    en: 'Your little guide to tarot — a card of the day, spreads, and meanings for all 78 cards.',
  },
  heroEyebrow: { pl: 'tarot online', en: 'tarot online' },
  heroLine1: { pl: 'Zapytaj karty,', en: 'Ask the cards,' },
  heroLine2: { pl: 'posłuchaj siebie.', en: 'listen to yourself.' },
  ctaReading: { pl: 'Rozłóż karty', en: 'Draw a spread' },
  ctaLibrary: { pl: 'Poznaj znaczenia', en: 'Explore the meanings' },
  scrollDown: { pl: 'przewiń niżej', en: 'scroll down' },
  changeSpread: { pl: 'Zmień rozkład', en: 'Change spread' },
  cardOfTheDay: { pl: 'Karta dnia', en: 'Card of the day' },
  cardOfTheDayIntro: {
    pl: 'Jedna karta na dziś — ta sama dla wszystkich, nowa każdego ranka.',
    en: 'One card for today — the same for everyone, fresh every morning.',
  },
  revealCard: { pl: 'Odkryj kartę', en: 'Reveal the card' },
  upright: { pl: 'Prosto', en: 'Upright' },
  reversed: { pl: 'Odwrócona', en: 'Reversed' },
  uprightMeaning: { pl: 'Znaczenie proste', en: 'Upright meaning' },
  reversedMeaning: { pl: 'Znaczenie odwrócone', en: 'Reversed meaning' },
  chooseSpread: { pl: 'Wybierz rozkład', en: 'Choose a spread' },
  shuffling: { pl: 'Tasowanie…', en: 'Shuffling…' },
  drawCards: { pl: 'Potasuj i rozłóż', en: 'Shuffle & draw' },
  drawAgain: { pl: 'Rozłóż jeszcze raz', en: 'Draw again' },
  tapToReveal: { pl: 'Dotknij kart, aby je odkryć', en: 'Tap the cards to reveal them' },
  focusHint: {
    pl: 'Weź spokojny oddech i pomyśl o swoim pytaniu, zanim odkryjesz karty.',
    en: 'Take a slow breath and hold your question in mind before revealing the cards.',
  },
  libraryTitle: { pl: 'Znaczenia kart', en: 'Card meanings' },
  libraryIntro: {
    pl: 'Wszystkie 78 kart tarota — dotknij karty, aby poznać jej znaczenie.',
    en: 'All 78 tarot cards — tap any card to explore its meaning.',
  },
  searchPlaceholder: { pl: 'Szukaj karty…', en: 'Search for a card…' },
  filterAll: { pl: 'Wszystkie', en: 'All' },
  filterMajor: { pl: 'Wielkie Arkana', en: 'Major Arcana' },
  filterWands: { pl: 'Buławy', en: 'Wands' },
  filterCups: { pl: 'Kielichy', en: 'Cups' },
  filterSwords: { pl: 'Miecze', en: 'Swords' },
  filterPentacles: { pl: 'Pentakle', en: 'Pentacles' },
  majorArcana: { pl: 'Wielkie Arkana', en: 'Major Arcana' },
  minorArcana: { pl: 'Małe Arkana', en: 'Minor Arcana' },
  noResults: { pl: 'Nie znaleziono takiej karty.', en: 'No card matches your search.' },
  close: { pl: 'Zamknij', en: 'Close' },
  keywords: { pl: 'Słowa klucze', en: 'Keywords' },
  summaryTitle: { pl: 'Podsumowanie', en: 'Summary' },
  footerNote: {
    pl: 'Tarocik służy rozrywce i refleksji — ważne decyzje podejmuj sercem i rozumem.',
    en: 'Tarocik is for reflection and fun — make important decisions with your heart and your head.',
  },
  disclaimerShort: { pl: 'dla przyjemności i zadumy', en: 'for delight and reflection' },
} satisfies Record<string, CardText>

export type UiKey = keyof typeof ui

export const spreads: Spread[] = [
  {
    id: 'one',
    cards: 1,
    name: { pl: 'Jedna karta', en: 'One card' },
    description: {
      pl: 'Szybka odpowiedź lub myśl przewodnia na dziś.',
      en: 'A quick answer or a guiding thought for today.',
    },
    positions: [{ pl: 'Wskazówka', en: 'Guidance' }],
  },
  {
    id: 'three',
    cards: 3,
    name: { pl: 'Trzy karty', en: 'Three cards' },
    description: {
      pl: 'Klasyczny rozkład: przeszłość, teraźniejszość i przyszłość Twojej sprawy.',
      en: 'The classic spread: the past, present, and future of your question.',
    },
    positions: [
      { pl: 'Przeszłość', en: 'Past' },
      { pl: 'Teraźniejszość', en: 'Present' },
      { pl: 'Przyszłość', en: 'Future' },
    ],
  },
  {
    id: 'five',
    cards: 5,
    name: { pl: 'Mały krzyż', en: 'Small cross' },
    description: {
      pl: 'Głębsze spojrzenie: sytuacja, przeszkoda, rada, otoczenie i możliwy wynik.',
      en: 'A deeper look: the situation, the obstacle, the advice, the surroundings, and the likely outcome.',
    },
    positions: [
      { pl: 'Sytuacja', en: 'Situation' },
      { pl: 'Przeszkoda', en: 'Obstacle' },
      { pl: 'Rada', en: 'Advice' },
      { pl: 'Otoczenie', en: 'Surroundings' },
      { pl: 'Możliwy wynik', en: 'Likely outcome' },
    ],
  },
  {
    id: 'celtic',
    cards: 10,
    name: { pl: 'Krzyż celtycki', en: 'Celtic cross' },
    description: {
      pl: 'Klasyczny rozkład dziesięciu kart — dogłębna analiza od korzeni sprawy po jej wynik.',
      en: 'The classic ten-card spread — an in-depth look from the roots of the matter to its outcome.',
    },
    positions: [
      { pl: 'Sytuacja', en: 'The situation' },
      { pl: 'Przeszkoda', en: 'The challenge' },
      { pl: 'Podstawa sprawy', en: 'The foundation' },
      { pl: 'Przeszłość', en: 'The recent past' },
      { pl: 'Cel i możliwości', en: 'Goals & possibilities' },
      { pl: 'Najbliższa przyszłość', en: 'The near future' },
      { pl: 'Ty', en: 'You' },
      { pl: 'Otoczenie', en: 'Surroundings' },
      { pl: 'Nadzieje i obawy', en: 'Hopes & fears' },
      { pl: 'Wynik', en: 'The outcome' },
    ],
  },
]

export function loadLang(): Lang {
  const saved = localStorage.getItem('tarocik-lang')
  if (saved === 'pl' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('pl') ? 'pl' : 'en'
}

export function saveLang(lang: Lang) {
  localStorage.setItem('tarocik-lang', lang)
}
