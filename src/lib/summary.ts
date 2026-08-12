import type { DrawnCard, Lang, Spread, Suit } from '../types'

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
    ? `Opowieść zaczyna się od karty ${first.card.name.pl} (${firstKw}), a kończy na karcie ${last.card.name.pl} (${lastKw}) — porównaj początek z końcem: to, co się między nimi zmienia, pokazuje, dokąd zmierza cała sprawa.`
    : `The story opens with ${first.card.name.en} (${firstKw}) and closes with ${last.card.name.en} (${lastKw}) — compare the start with the end: what changes between them shows where the whole matter is heading.`
}

export function summarizeReading(drawn: DrawnCard[], lang: Lang): string {
  return [themeSentence(drawn, lang), orientationSentence(drawn, lang), arcSentence(drawn, lang)].join(' ')
}

/* --- narrative explanation: reads the spread the way a human reader would,
   weaving positions and cards into one story. Templates differ per spread. --- */

const kw = (d: DrawnCard, lang: Lang) =>
  d.reversed ? d.card.keywordsReversed[lang] : d.card.keywordsUpright[lang]

const outcomeNuance = (d: DrawnCard, lang: Lang) =>
  d.reversed
    ? lang === 'pl'
      ? ' Karta wyniku jest odwrócona — to nie wyrok, raczej ostrzeżenie: pokazuje scenariusz, który wciąż można odwrócić.'
      : ' The outcome card is reversed — not a verdict but a warning: it shows a scenario that can still be turned around.'
    : ''

export function explainReading(spread: Spread, drawn: DrawnCard[], lang: Lang): string {
  const n = (i: number) => drawn[i].card.name[lang]
  const k = (i: number) => kw(drawn[i], lang)
  switch (spread.id) {
    case 'yesno':
      return drawn[0].reversed
        ? lang === 'pl'
          ? `Karta ${n(0)} wypadła odwrócona, więc odpowiedź brzmi „nie” — a jej słowa klucze (${k(0)}) podpowiadają dlaczego: co blokuje sprawę albo przed czym to „nie” Cię chroni.`
          : `${n(0)} fell reversed, so the answer is “no” — and its keywords (${k(0)}) hint at why: what is blocking the matter, or what this “no” is protecting you from.`
        : lang === 'pl'
          ? `Karta ${n(0)} wypadła prosto, więc odpowiedź brzmi „tak” — ale to „tak” w duchu jej słów kluczy: ${k(0)}. Znaczenie karty mówi, jak to „tak” może wyglądać w praktyce.`
          : `${n(0)} fell upright, so the answer is “yes” — but a “yes” in the spirit of its keywords: ${k(0)}. The card’s meaning shows what that “yes” may look like in practice.`
    case 'one':
      return drawn[0].reversed
        ? lang === 'pl'
          ? `Twoją wskazówką jest karta ${n(0)}: ${k(0)}. Jest odwrócona, więc pokazuje raczej to, co się zacina — potraktuj ją jak lusterko i zapytaj, gdzie w Twojej sprawie pojawia się ten motyw.`
          : `Your guidance is ${n(0)}: ${k(0)}. It is reversed, so it points to what is stuck — treat it as a mirror and ask where this theme shows up in your situation.`
        : lang === 'pl'
          ? `Twoją wskazówką jest karta ${n(0)}: ${k(0)}. Wypadła prosto — jej energia Ci sprzyja. Wypatruj dziś sytuacji, w których te słowa klucze wracają, bo właśnie tam ta karta pracuje.`
          : `Your guidance is ${n(0)}: ${k(0)}. It fell upright — its energy is on your side. Watch for moments today when these keywords come back, because that is where this card is at work.`
    case 'three':
      return lang === 'pl'
        ? `Ta opowieść zaczyna się w przeszłości, w karcie ${n(0)} (${k(0)}) — to fundament, z którym wchodzisz w sprawę. Teraźniejszość opisuje ${n(1)}: ${k(1)} — i to tutaj masz teraz realny wpływ. Jeśli nic się nie zmieni, sprawa zmierza w stronę karty ${n(2)}: ${k(2)}.${outcomeNuance(drawn[2], lang)}`
        : `The story begins in the past with ${n(0)} (${k(0)}) — the foundation you bring into this. The present is described by ${n(1)}: ${k(1)} — and this is where your real influence lives. If nothing changes, things are heading toward ${n(2)}: ${k(2)}.${outcomeNuance(drawn[2], lang)}`
    case 'love':
      return lang === 'pl'
        ? `Ciebie w tej relacji pokazuje karta ${n(0)} (${k(0)}), a drugą osobę — ${n(1)} (${k(1)}); porównaj te dwie energie, bo dużo mówią o tym, jak się nawzajem widzicie. Łączy Was ${n(2)}: ${k(2)}. Najważniejsza jest karta blokady — ${n(3)} (${k(3)}) — bo to nad nią możesz realnie popracować. Przy obecnym kursie całość zmierza ku karcie ${n(4)}: ${k(4)}.${outcomeNuance(drawn[4], lang)}`
        : `You in this relationship are shown by ${n(0)} (${k(0)}), the other person by ${n(1)} (${k(1)}) — compare those two energies, because they say a lot about how you see each other. What connects you is ${n(2)}: ${k(2)}. The key card is the block — ${n(3)} (${k(3)}) — because that is the one thing you can actually work on. On its current course, this is heading toward ${n(4)}: ${k(4)}.${outcomeNuance(drawn[4], lang)}`
    case 'five':
      return lang === 'pl'
        ? `Punktem wyjścia jest karta ${n(0)} (${k(0)}) — tak wygląda Twoja sytuacja. W poprzek staje ${n(1)}: ${k(1)}. Sercem tego rozkładu jest rada: karta ${n(2)} podpowiada — ${k(2)} — i od niej warto zacząć. Otoczenie ma energię karty ${n(3)} (${k(3)}), a możliwy wynik zapowiada ${n(4)}: ${k(4)}.${outcomeNuance(drawn[4], lang)}`
        : `The starting point is ${n(0)} (${k(0)}) — that is your situation. Standing across it is ${n(1)}: ${k(1)}. The heart of this spread is the advice: ${n(2)} suggests — ${k(2)} — and that is the place to start. The surroundings carry the energy of ${n(3)} (${k(3)}), and the likely outcome is promised by ${n(4)}: ${k(4)}.${outcomeNuance(drawn[4], lang)}`
    case 'celtic':
      return lang === 'pl'
        ? `W sercu sprawy stoi karta ${n(0)} (${k(0)}), a w poprzek kładzie się ${n(1)} — ${k(1)} — i to jest główne napięcie tego rozkładu. Sprawa wyrasta z karty ${n(2)} (${k(2)}), a najbliższa przyszłość niesie energię karty ${n(5)}: ${k(5)}. Ciebie opisuje tu ${n(6)} (${k(6)}), a Twoje nadzieje i obawy odsłania ${n(8)}. Wszystko zmierza do karty ${n(9)}: ${k(9)}.${outcomeNuance(drawn[9], lang)}`
        : `At the heart of the matter stands ${n(0)} (${k(0)}), crossed by ${n(1)} — ${k(1)} — and that is the central tension of this spread. The matter grows out of ${n(2)} (${k(2)}), and the near future carries the energy of ${n(5)}: ${k(5)}. You are described here by ${n(6)} (${k(6)}), and your hopes and fears are laid bare by ${n(8)}. Everything moves toward ${n(9)}: ${k(9)}.${outcomeNuance(drawn[9], lang)}`
  }
}
