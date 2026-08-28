/* Question–answer content, written for the way people actually ask — in a
   search box or to an AI assistant. Each entry is rendered visibly on the page
   AND emitted as FAQPage structured data, so answer engines (Google's AI
   Overviews, ChatGPT, Perplexity) can lift a complete answer without guessing. */
import type { CardText, Lang, TarotCard } from '../types'
import { majorDetails } from '../data/majorDetails'
import { minorDetails } from '../data/minorDetails'

export interface Faq {
  q: CardText
  a: CardText
}

/** One short, self-contained sentence answering "what does this card mean?" —
 *  the snippet an answer engine can quote whole. */
export function cardQuickAnswer(card: TarotCard, lang: Lang): string {
  const name = card.name[lang]
  return lang === 'pl'
    ? `${name} w pozycji prostej oznacza: ${card.keywordsUpright.pl}. Odwrócona: ${card.keywordsReversed.pl}. To ${
        card.arcana === 'major' ? 'karta Wielkich Arkanów' : 'karta Małych Arkanów'
      }.`
    : `${name} upright means: ${card.keywordsUpright.en}. Reversed: ${card.keywordsReversed.en}. It is a ${
        card.arcana === 'major' ? 'Major Arcana card' : 'Minor Arcana card'
      }.`
}

export function cardFaqs(card: TarotCard): Faq[] {
  const d = majorDetails[card.id] ?? minorDetails[card.id]
  const pl = card.name.pl
  const en = card.name.en
  const out: Faq[] = [
    {
      q: { pl: `Co oznacza karta ${pl}?`, en: `What does the ${en} card mean?` },
      a: {
        pl: `${card.keywordsUpright.pl}. ${card.upright.pl}`,
        en: `${card.keywordsUpright.en}. ${card.upright.en}`,
      },
    },
    {
      q: {
        pl: `Co oznacza karta ${pl} odwrócona?`,
        en: `What does the ${en} reversed mean?`,
      },
      a: {
        pl: `${card.keywordsReversed.pl}. ${card.reversed.pl}`,
        en: `${card.keywordsReversed.en}. ${card.reversed.en}`,
      },
    },
  ]
  if (d) {
    out.push(
      {
        q: { pl: `Co karta ${pl} oznacza w miłości?`, en: `What does the ${en} mean in love?` },
        a: d.love,
      },
      {
        q: { pl: `Co karta ${pl} oznacza w pracy?`, en: `What does the ${en} mean for work?` },
        a: d.work,
      },
      {
        q: { pl: `Jaka jest rada karty ${pl}?`, en: `What is the advice of the ${en}?` },
        a: d.advice,
      },
    )
  }
  return out
}

export const homeFaqs: Faq[] = [
  {
    q: { pl: 'Czy tarot online na Tarociku jest darmowy?', en: 'Is tarot on Tarocik free?' },
    a: {
      pl: 'Tak, w całości. Karta dnia, wszystkie sześć rozkładów i znaczenia wszystkich 78 kart są darmowe — bez rejestracji, bez logowania, bez limitu wróżb i bez płatnych treści.',
      en: 'Yes, entirely. The card of the day, all six spreads, and the meanings of all 78 cards are free — no sign-up, no login, no limit on readings, and nothing behind a paywall.',
    },
  },
  {
    q: { pl: 'Jak losowane są karty?', en: 'How are the cards drawn?' },
    a: {
      pl: 'Karty losuje generator liczb losowych w Twojej przeglądarce — tak samo jak tasowanie prawdziwej talii. Każda karta może wypaść prosto lub odwrócona, a w jednym rozkładzie żadna karta nie powtarza się dwa razy.',
      en: 'The cards are drawn by a random number generator in your browser — the digital equivalent of shuffling a real deck. Every card can fall upright or reversed, and no card repeats within a single spread.',
    },
  },
  {
    q: {
      pl: 'Czym różni się karta dnia od rozkładu?',
      en: 'What is the difference between the card of the day and a spread?',
    },
    a: {
      pl: 'Karta dnia to jedna karta wspólna dla wszystkich odwiedzających, zmieniana raz na dobę — to krótki rytuał na cały dzień. Rozkład losujesz samodzielnie, w dowolnej chwili i do konkretnego pytania, a każda karta ma w nim swoją pozycję i znaczenie.',
      en: 'The card of the day is a single card shared by every visitor and changed once a day — a short ritual to carry through the day. A spread you draw yourself, whenever you like and for a specific question, and each card in it has its own position and meaning.',
    },
  },
  {
    q: {
      pl: 'Czy trzeba znać się na tarocie, żeby korzystać z Tarocika?',
      en: 'Do I need to know tarot to use Tarocik?',
    },
    a: {
      pl: 'Nie. Każda karta ma pełne znaczenie proste i odwrócone napisane prostym językiem, a pod każdym rozkładem znajdziesz interpretację całości i podsumowanie. Dla początkujących mamy też przewodnik „Jak czytać tarota”.',
      en: 'No. Every card comes with a full upright and reversed meaning in plain language, and every spread ends with an interpretation of the whole reading plus a summary. Beginners can also start with our guide, “How to read tarot”.',
    },
  },
  {
    q: { pl: 'Czy Tarocik przepowiada przyszłość?', en: 'Does Tarocik predict the future?' },
    a: {
      pl: 'Nie i nie taki jest jego cel. Tarot działa tu jak lustro: pokazuje sprawę pod innym kątem i podsuwa pytania, których sami byśmy sobie nie zadali. Tarocik służy rozrywce i refleksji — ważne decyzje warto podejmować sercem i rozumem.',
      en: 'No, and that is not its purpose. Tarot works here as a mirror: it shows your situation from another angle and raises questions you would not have asked yourself. Tarocik is for reflection and enjoyment — important decisions deserve both your heart and your head.',
    },
  },
]

export const readingFaqs: Faq[] = [
  {
    q: { pl: 'Jaki rozkład tarota wybrać na początek?', en: 'Which tarot spread should a beginner choose?' },
    a: {
      pl: 'Na start najlepsza jest jedna karta — daje jasną, pojedynczą myśl bez natłoku znaczeń. Przy konkretnym pytaniu rozstrzygającym wybierz „Tak czy nie”, a gdy chcesz zobaczyć rozwój sprawy w czasie — rozkład trzech kart: przeszłość, teraźniejszość, przyszłość.',
      en: 'Start with a single card — it gives one clear thought without a flood of meanings. For a specific yes-or-no question choose “Yes or no”, and to see how a matter develops over time use the three-card spread: past, present, future.',
    },
  },
  {
    q: { pl: 'Ile kart ma krzyż celtycki?', en: 'How many cards are in the Celtic cross?' },
    a: {
      pl: 'Krzyż celtycki to dziesięć kart: sytuacja, przeszkoda, podstawa sprawy, przeszłość, cel, najbliższa przyszłość, Ty, otoczenie, nadzieje i obawy oraz wynik. To najbardziej szczegółowy klasyczny rozkład tarota.',
      en: 'The Celtic cross uses ten cards: the situation, the challenge, the foundation, the recent past, goals, the near future, you, your surroundings, hopes and fears, and the outcome. It is the most detailed of the classic tarot spreads.',
    },
  },
  {
    q: { pl: 'Jak działa rozkład „Tak czy nie”?', en: 'How does the “Yes or no” spread work?' },
    a: {
      pl: 'Losujesz jedną kartę: prosta oznacza „tak”, odwrócona — „nie”. Sama odpowiedź to jednak dopiero połowa: niuans kryje się w znaczeniu wylosowanej karty, które mówi, na jakich warunkach to „tak” lub przed czym chroni Cię to „nie”.',
      en: 'You draw one card: upright means “yes”, reversed means “no”. The verdict is only half of it — the nuance lives in the card’s meaning, which tells you on what terms that “yes” holds, or what that “no” is protecting you from.',
    },
  },
  {
    q: {
      pl: 'Czy można zadać to samo pytanie dwa razy?',
      en: 'Can I ask the same question twice?',
    },
    a: {
      pl: 'Można, ale zwykle nie ma to sensu, dopóki nic się nie zmieniło. Powtarzanie pytania aż do satysfakcjonującej odpowiedzi mówi więcej o tym, czego pragniesz, niż o sytuacji — a to również jest cenna informacja. Lepiej wrócić do tematu, gdy pojawi się nowy fakt.',
      en: 'You can, but it rarely helps while nothing has changed. Repeating a question until the answer pleases you says more about what you want than about the situation — which is itself useful information. Better to return to it once a new fact appears.',
    },
  },
]

export const libraryFaqs: Faq[] = [
  {
    q: { pl: 'Ile kart ma talia tarota?', en: 'How many cards are in a tarot deck?' },
    a: {
      pl: 'Talia tarota liczy 78 kart: 22 Wielkie Arkana (od Głupca do Świata) i 56 Małych Arkanów podzielonych na cztery kolory — Buławy, Kielichy, Miecze i Pentakle — po 14 kart każdy.',
      en: 'A tarot deck has 78 cards: 22 Major Arcana (from the Fool to the World) and 56 Minor Arcana split into four suits — Wands, Cups, Swords, and Pentacles — of 14 cards each.',
    },
  },
  {
    q: {
      pl: 'Czym różnią się Wielkie Arkana od Małych Arkanów?',
      en: 'What is the difference between Major and Minor Arcana?',
    },
    a: {
      pl: 'Wielkie Arkana to 22 karty opisujące wielkie tematy życia — przemianę, miłość, los, wybór. Małe Arkana to 56 kart codzienności: Buławy to energia i działanie, Kielichy uczucia, Miecze myśli i słowa, a Pentakle praca, ciało i pieniądze. Przewaga Wielkich Arkanów w rozkładzie oznacza sprawę o większym ciężarze.',
      en: 'The Major Arcana are 22 cards describing life’s big themes — transformation, love, fate, choice. The Minor Arcana are 56 cards of everyday life: Wands are energy and action, Cups feelings, Swords thoughts and words, Pentacles work, body, and money. A spread dominated by Major Arcana marks a matter of real weight.',
    },
  },
  {
    q: { pl: 'Co oznaczają karty odwrócone w tarocie?', en: 'What do reversed tarot cards mean?' },
    a: {
      pl: 'Karta odwrócona to nie zła wróżba. Najczęściej oznacza tę samą energię, ale zablokowaną, skierowaną do wewnątrz albo przesadzoną — odwrócona Siła to nie brak siły, lecz zwątpienie w nią. Odwrócenia można też po prostu pomijać; wielu tarocistów czyta wyłącznie karty proste.',
      en: 'A reversed card is not a bad omen. Most often it is the same energy, but blocked, turned inward, or overdone — reversed Strength is not weakness but doubting your strength. You may also simply ignore reversals; many readers work with upright cards only.',
    },
  },
]

export const dailyFaqs: Faq[] = [
  {
    q: { pl: 'Czym jest karta dnia?', en: 'What is the card of the day?' },
    a: {
      pl: 'Karta dnia to jedna karta tarota wylosowana na dany dzień — na Tarociku ta sama dla wszystkich odwiedzających i zmieniana codziennie. Czyta się ją jako motyw przewodni dnia, nie jako przepowiednię.',
      en: 'The card of the day is one tarot card drawn for that day — on Tarocik the same for every visitor, and changed daily. It is read as the day’s theme, not as a prophecy.',
    },
  },
  {
    q: { pl: 'O której zmienia się karta dnia?', en: 'When does the card of the day change?' },
    a: {
      pl: 'Karta zmienia się raz na dobę, wraz ze zmianą daty — nowa karta czeka na Ciebie każdego ranka. Do wieczora obowiązuje ta sama, więc możesz wrócić i sprawdzić, gdzie pojawiła się w Twoim dniu.',
      en: 'The card changes once a day, when the date rolls over — a new card is waiting each morning. It stays the same until evening, so you can come back and check where it showed up in your day.',
    },
  },
  {
    q: { pl: 'Jak czytać kartę dnia?', en: 'How should I read the card of the day?' },
    a: {
      pl: 'Przeczytaj jej znaczenie rano i zapamiętaj jedno–dwa słowa klucze, a wieczorem sprawdź, w której sytuacji wróciły. Pytanie, które karta zadaje, zwykle mówi więcej niż odpowiedź. Po miesiącu takiej praktyki znasz pół talii — nie z pamięci, tylko z życia.',
      en: 'Read its meaning in the morning and keep one or two keywords in mind, then in the evening notice which moment brought them back. The question a card asks usually says more than any answer. After a month of this you know half the deck — not from memory, but from life.',
    },
  },
]
