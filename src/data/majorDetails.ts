import type { CardText } from '../types'

export interface MajorDetail {
  love: CardText
  work: CardText
  health: CardText
  advice: CardText
}

/** Extended interpretations for the 22 Major Arcana card pages. */
export const majorDetails: Record<string, MajorDetail> = {
  'major-0': {
    love: {
      pl: 'W miłości Głupiec to trzepot pierwszych spotkań: nowa znajomość, flirt bez planu, otwartość na kogoś zupełnie spoza Twojego typu. W stałym związku zaprasza do wspólnej przygody — zróbcie coś pierwszy raz, a poczujecie się jak na początku.',
      en: 'In love, the Fool is the flutter of first meetings: a new acquaintance, an unplanned flirtation, openness to someone entirely outside your type. In a settled relationship it invites shared adventure — do something for the first time together and it will feel like the beginning again.',
    },
    work: {
      pl: 'Zawodowo sprzyja nowym początkom: zmianie branży, pierwszemu projektowi, własnej działalności rozkręcanej z ciekawości, nie z kalkulacji. Brak doświadczenia bywa tu atutem — zadajesz pytania, których weterani już nie widzą.',
      en: 'Professionally it favours fresh starts: a career change, a first project, a small venture started out of curiosity rather than calculation. Lack of experience can be an asset here — you ask the questions veterans no longer see.',
    },
    health: {
      pl: 'Energia Głupca jest lekka i dziecięca: ciało prosi się o ruch dla radości, nie dla wyniku. Spacer bez celu, taniec w kuchni, nowa aktywność próbowana bez ambicji — to jego medycyna.',
      en: 'The Fool’s energy is light and childlike: the body asks for movement for joy, not for results. An aimless walk, dancing in the kitchen, a new activity tried without ambition — that is his medicine.',
    },
    advice: {
      pl: 'Zrób pierwszy krok, zanim poczujesz się w pełni gotowy — pełna gotowość nie istnieje. Zabierz jednak ze sobą odrobinę rozwagi: przepaść na obrazku jest prawdziwa, tylko nie tam, gdzie patrzysz.',
      en: 'Take the first step before you feel fully ready — full readiness does not exist. But pack a little prudence: the cliff in the picture is real, just not where you are looking.',
    },
  },
  'major-1': {
    love: {
      pl: 'Mag w miłości mówi: masz realny wpływ. Zamiast czekać na znak, wyślij wiadomość, zaproponuj spotkanie, powiedz wprost, czego pragniesz. W związku to dobry czas, by świadomie zadbać o to, co przygasło.',
      en: 'In love the Magician says: you have real influence. Instead of waiting for a sign, send the message, suggest the date, say plainly what you want. In a relationship it is a good moment to consciously tend what has dimmed.',
    },
    work: {
      pl: 'To karta kompetencji i sprawczości: prezentacje, negocjacje, start projektu — wszystko, co wymaga zebrania narzędzi w jednym miejscu, ma teraz wiatr w żaglach. Pokaż, co potrafisz; ktoś patrzy.',
      en: 'This is the card of competence and agency: presentations, negotiations, project launches — anything that requires gathering your tools in one place has the wind behind it now. Show what you can do; someone is watching.',
    },
    health: {
      pl: 'Umysł mocno wpływa tu na ciało: koncentracja, oddech, rytuały. Mag podpowiada, że małe codzienne praktyki — szklanka wody, krótka rozgrzewka, regularny sen — działają jak zaklęcia, jeśli powtarzasz je świadomie.',
      en: 'Mind strongly steers body here: focus, breath, rituals. The Magician hints that small daily practices — a glass of water, a short warm-up, regular sleep — work like spells when repeated deliberately.',
    },
    advice: {
      pl: 'Przestań zbierać kolejne narzędzia i użyj tych, które leżą na stole. Nazwij cel jednym zdaniem, a potem zrób dziś jedną rzecz, która go przybliża.',
      en: 'Stop collecting more tools and use the ones on the table. Name the goal in one sentence, then do one thing today that moves it closer.',
    },
  },
  'major-2': {
    love: {
      pl: 'Kapłanka radzi słuchać tego, co niewypowiedziane: przeczucia względem nowej osoby zwykle są trafne. W związku oznacza potrzebę intymności głębszej niż słowa — wspólne milczenie też jest rozmową.',
      en: 'The High Priestess advises listening to the unsaid: your hunches about a new person are usually right. In a relationship she marks a need for intimacy deeper than words — shared silence is also a conversation.',
    },
    work: {
      pl: 'Nie wszystko w pracy jest jeszcze jawne — obserwuj, zanim się zadeklarujesz. To świetny czas na naukę, badania i pracę koncepcyjną, gorszy na głośne ogłoszenia.',
      en: 'Not everything at work is visible yet — observe before you commit. An excellent time for study, research, and conceptual work; a worse one for loud announcements.',
    },
    health: {
      pl: 'Ciało mówi cicho, zanim krzyknie. Kapłanka prosi o uważność na subtelne sygnały: rytm snu, napięcie karku, nastroje przed księżycową pełnią własnych cykli.',
      en: 'The body whispers before it shouts. The High Priestess asks for attention to subtle signals: sleep rhythm, neck tension, the moods that follow your own inner cycles.',
    },
    advice: {
      pl: 'Nie musisz jeszcze decydować ani niczego ogłaszać. Zbierz wiedzę, zapisz sny i przeczucia — odpowiedź dojrzewa w ciszy i sama wskaże moment.',
      en: 'You do not have to decide or announce anything yet. Gather knowledge, write down dreams and hunches — the answer is ripening in silence and will name its own moment.',
    },
  },
  'major-3': {
    love: {
      pl: 'Cesarzowa to miłość, która karmi: czułość, bliskość fizyczna, wspólne jedzenie i śmiech. Sprzyja pogłębianiu związku, zamieszkaniu razem, a bywa też kartą płodności i twórczego "razem".',
      en: 'The Empress is love that nourishes: tenderness, physical closeness, shared meals and laughter. She favours deepening a bond, moving in together, and can also mark fertility and creative togetherness.',
    },
    work: {
      pl: 'Projekty pod jej opieką rosną organicznie — mniej forsowania, więcej pielęgnowania. Dobry czas dla pracy twórczej, estetycznej i wszystkiego, co ma cieszyć zmysły odbiorcy.',
      en: 'Projects in her care grow organically — less forcing, more tending. A good time for creative, aesthetic work and anything meant to please the audience’s senses.',
    },
    health: {
      pl: 'Ciało chce być traktowane jak ogród, nie jak maszyna: sen, dobre jedzenie, dotyk, odpoczynek bez wyrzutów sumienia. Regeneracja jest teraz produktywna.',
      en: 'The body wants to be treated like a garden, not a machine: sleep, good food, touch, rest without guilt. Recovery is productive right now.',
    },
    advice: {
      pl: 'Zapytaj: co dziś karmię — a co tylko kontroluję? Podlej to, co ma rosnąć, i pozwól sobie na przyjemność bez usprawiedliwień.',
      en: 'Ask: what am I feeding today — and what am I merely controlling? Water what is meant to grow, and allow yourself pleasure without excuses.',
    },
  },
  'major-4': {
    love: {
      pl: 'Cesarz wnosi do miłości stabilność i deklaracje: jasne zasady, plany na przyszłość, poczucie bezpieczeństwa. Uważaj tylko, by opiekuńczość nie zamieniła się w zarządzanie partnerem.',
      en: 'The Emperor brings stability and declarations to love: clear terms, plans for the future, a sense of safety. Just watch that protectiveness does not become managing your partner.',
    },
    work: {
      pl: 'Karta struktur i autorytetu: awanse, przywództwo, budowanie systemów, rozmowy z przełożonymi. Zbuduj ramy — budżet, harmonogram, zakres — a chaos zamieni się w maszynę.',
      en: 'The card of structures and authority: promotions, leadership, system-building, talks with superiors. Build the frame — budget, schedule, scope — and chaos becomes an engine.',
    },
    health: {
      pl: 'Ciało odpowiada tu na dyscyplinę: stałe pory, powtarzalny trening, mierzalne cele. Kręgosłup — dosłownie i w przenośni — wymaga podparcia i dobrej postawy.',
      en: 'The body responds to discipline here: fixed hours, repeatable training, measurable goals. The spine — literally and figuratively — needs support and good posture.',
    },
    advice: {
      pl: 'Ustal zasady, zanim sytuacja ustali je za Ciebie. Granice nie są murem przeciw ludziom — są mapą, na której wszyscy wiedzą, gdzie stoją.',
      en: 'Set the rules before the situation sets them for you. Boundaries are not a wall against people — they are a map on which everyone knows where they stand.',
    },
  },
  'major-5': {
    love: {
      pl: 'Hierofant sprzyja związkom, które dojrzewają do rytuału: zaręczyny, ślub, oficjalne przedstawienie rodzinie. Mówi też o wartościach — sprawdźcie, czy wierzycie w to samo, zanim zbudujecie wspólny dom.',
      en: 'The Hierophant favours relationships ripening toward ritual: engagement, marriage, meeting the family officially. He also speaks of values — check that you believe in the same things before you build a shared home.',
    },
    work: {
      pl: 'Ucz się od tych, którzy przetarli szlak: mentor, kurs, certyfikat, sprawdzona metodologia. Instytucje i formalności, zwykle nużące, teraz grają na Twoją korzyść.',
      en: 'Learn from those who cleared the trail: a mentor, a course, a certificate, a proven methodology. Institutions and formalities, usually tedious, currently work in your favour.',
    },
    health: {
      pl: 'Zaufaj sprawdzonym metodom, nie modom: badania kontrolne, fizjoterapia, plan od specjalisty. Ciało lubi teraz regularną, tradycyjną troskę.',
      en: 'Trust proven methods, not fads: check-ups, physiotherapy, a specialist’s plan. The body currently likes regular, traditional care.',
    },
    advice: {
      pl: 'Nie wyważaj drzwi, które ktoś już otworzył — poproś o klucz. A jeśli reguła, którą znasz, przestała służyć dobru, masz prawo ją przerosnąć.',
      en: 'Do not force a door someone has already opened — ask for the key. And if a rule you know has stopped serving the good, you are allowed to outgrow it.',
    },
  },
  'major-6': {
    love: {
      pl: 'Najczystsza karta miłości: spotkanie, które zmienia oś świata, albo moment, w którym trzeba wybrać — sercem, nie strachem. W związku przypomina, że miłość jest codzienną decyzją, nie tylko uczuciem.',
      en: 'The purest love card: a meeting that tilts the axis of your world, or a moment demanding a choice — made with the heart, not with fear. In a relationship it reminds you that love is a daily decision, not just a feeling.',
    },
    work: {
      pl: 'Zawodowo Kochankowie to rozdroże: dwie oferty, dwie ścieżki, i konieczność wyboru zgodnego z wartościami, nie tylko z arkuszem kalkulacyjnym. Dobrze wróżą też partnerstwom i współpracy dwóch równych stron.',
      en: 'Professionally the Lovers are a crossroads: two offers, two paths, and a choice that must align with your values, not only the spreadsheet. They also bless partnerships between two equals.',
    },
    health: {
      pl: 'Harmonia ciała zaczyna się od zgody wewnętrznej: konflikt "chcę–powinienem" potrafi boleć całkiem fizycznie. Zadbaj o spójność między tym, co czujesz, a tym, jak żyjesz.',
      en: 'Bodily harmony starts with inner agreement: the conflict between “I want” and “I should” can hurt quite physically. Align how you live with what you feel.',
    },
    advice: {
      pl: 'Wybierz to, przy czym Twoje wartości i serce mówią jednym głosem. Połowiczne "tak" jest droższe niż uczciwe "nie".',
      en: 'Choose the option where your values and your heart speak with one voice. A half-hearted “yes” costs more than an honest “no.”',
    },
  },
  'major-7': {
    love: {
      pl: 'Rydwan w miłości to determinacja: zawalczysz o tę relację albo odważnie ją zdefiniujesz. Uwaga na przeciąganie liny — dwoje ludzi trzymających lejce w przeciwne strony donikąd nie dojedzie.',
      en: 'The Chariot in love is determination: you will fight for this relationship or boldly define it. Beware tug-of-war, though — two people pulling the reins opposite ways travel nowhere.',
    },
    work: {
      pl: 'Sprzyja ambitnym celom, egzaminom, przeprowadzkom i wszystkiemu, co wymaga zebrania rozproszonych sił w jeden kierunek. Zwycięstwo przyjdzie przez skupienie, nie przez rozpęd.',
      en: 'It favours ambitious goals, exams, relocations, and everything that requires gathering scattered forces into one direction. Victory comes through focus, not momentum.',
    },
    health: {
      pl: 'Dużo energii szuka ujścia — daj jej tor: bieg, rower, basen, cokolwiek z wyraźnym "przed siebie". Bez tego napęd zamienia się w napięcie.',
      en: 'A lot of energy is seeking an outlet — give it a track: running, cycling, swimming, anything with a clear “forward.” Without it, drive turns into tension.',
    },
    advice: {
      pl: 'Ustal jeden cel na najbliższy odcinek drogi i odmów sobie prawa do zbaczania. Silna wola to nie zaciśnięte zęby, lecz jasny kierunek.',
      en: 'Set one goal for this stretch of road and refuse yourself the right to detour. Willpower is not clenched teeth — it is a clear direction.',
    },
  },
  'major-8': {
    love: {
      pl: 'Siła w miłości to cierpliwa czułość: oswajanie czyichś lęków bez naprawiania człowieka na siłę. Konflikty łagodnieją, gdy pierwszy krok robi się miękko, nie zwycięsko.',
      en: 'Strength in love is patient tenderness: taming someone’s fears without forcibly fixing the person. Conflicts soften when the first step is made gently, not victoriously.',
    },
    work: {
      pl: 'Trudny klient, oporny zespół, projekt-lew: ugryzienia nic nie dadzą, oswajanie tak. Twoja przewaga to opanowanie — ono robi wrażenie większe niż podniesiony głos.',
      en: 'A difficult client, a resistant team, a lion of a project: biting achieves nothing, taming does. Your advantage is composure — it impresses more than a raised voice.',
    },
    health: {
      pl: 'Nawyki zmienia się tu łagodnością: mała obietnica dotrzymywana codziennie bije wielki plan porzucany co poniedziałek. Ciało współpracuje, gdy przestaje być wrogiem.',
      en: 'Habits change through gentleness here: a small promise kept daily beats a grand plan abandoned every Monday. The body cooperates once it stops being the enemy.',
    },
    advice: {
      pl: 'Nie siłuj się — oswajaj. To, co dziś ryczy w Tobie albo obok Ciebie, potrzebuje spokojnej obecności, nie tresury.',
      en: 'Do not wrestle — tame. Whatever roars in you or beside you today needs calm presence, not training whips.',
    },
  },
  'major-9': {
    love: {
      pl: 'Pustelnik nie oznacza samotności na zawsze — oznacza, że odpowiedź na pytania o bliskość znajdziesz najpierw w sobie. W związku: wieczór osobno bywa zdrowszy niż wieczór obok siebie z telefonami.',
      en: 'The Hermit does not mean forever alone — it means the answers about closeness are found first within. In a relationship: an evening apart can be healthier than an evening side by side with phones.',
    },
    work: {
      pl: 'Praca głęboka, badania, pisanie, planowanie strategii — wszystko, co wymaga zamkniętych drzwi, kwitnie. Odrocz brainstormy; wróć do ludzi z gotową myślą.',
      en: 'Deep work, research, writing, strategy — everything that needs a closed door is thriving. Postpone the brainstorms; return to people with a finished thought.',
    },
    health: {
      pl: 'Układ nerwowy prosi o ciszę: mniej bodźców, więcej snu, może kilka dni bez wiadomości. Regeneracja w samotności to nie izolacja — to serwis latarni.',
      en: 'The nervous system asks for quiet: fewer stimuli, more sleep, perhaps a few days without the news. Solitary recovery is not isolation — it is lighthouse maintenance.',
    },
    advice: {
      pl: 'Wyłącz na chwilę cudze głosy, także te życzliwe. Twoja lampa świeci słabo tylko dlatego, że stoisz w cudzym świetle.',
      en: 'Switch off other people’s voices for a while, even the kind ones. Your lamp only seems dim because you are standing in someone else’s light.',
    },
  },
  'major-10': {
    love: {
      pl: 'Koło Fortuny kręci sceną uczuć: przypadkowe spotkania, powroty ludzi z przeszłości, zwroty akcji, których nie zaplanujesz. Nie wszystko zależy od Ciebie — i właśnie w tym bywa urok.',
      en: 'The Wheel spins the stage of feelings: chance meetings, people returning from the past, plot twists you cannot plan. Not everything depends on you — and that is precisely the charm sometimes.',
    },
    work: {
      pl: 'Koniunktura się zmienia: nowa okazja, rotacje w zespole, projekt, który wraca w innym kształcie. Elastyczni wygrywają z upartymi — trzymaj plany na ołówek, nie na długopis.',
      en: 'The market weather is changing: a new opening, team rotations, a project returning in a different shape. The flexible beat the stubborn — keep plans in pencil, not ink.',
    },
    health: {
      pl: 'Cykle są tu słowem-kluczem: sen, hormony, pory roku, nawroty starych dolegliwości przy przesileniach. Zamiast walczyć z rytmem, naucz się go wykorzystywać.',
      en: 'Cycles are the keyword: sleep, hormones, seasons, old complaints returning at turning points. Instead of fighting the rhythm, learn to ride it.',
    },
    advice: {
      pl: 'Gdy koło się kręci, nie ma sensu przybijać podłogi do stóp. Rozpoznaj, która to faza cyklu — i zrób w niej to, co ona umożliwia, a nie to, co umożliwiała poprzednia.',
      en: 'When the wheel turns, nailing the floor to your feet is pointless. Recognise which phase this is — and do what it enables, not what the previous one did.',
    },
  },
  'major-11': {
    love: {
      pl: 'Sprawiedliwość waży wzajemność: kto daje, kto bierze, kto zawsze przeprasza pierwszy. Związki z uczciwym bilansem kwitną; te oparte na przemilczeniach dostają rachunek. Bywa też kartą formalności — umów, intercyz, oficjalnych deklaracji.',
      en: 'Justice weighs reciprocity: who gives, who takes, who always apologises first. Relationships with honest books flourish; those built on things unsaid receive an invoice. It can also mark formalities — agreements, contracts, official declarations.',
    },
    work: {
      pl: 'Umowy, negocjacje, sprawy urzędowe i wszelkie rozliczenia przebiegają teraz zgodnie z literą i duchem — pilnuj więc, by Twoje dokumenty i obietnice były w porządku. Uczciwość okazuje się najlepszą strategią negocjacyjną.',
      en: 'Contracts, negotiations, official matters, and settlements now run by both letter and spirit — so make sure your documents and promises are in order. Honesty turns out to be the best negotiation strategy.',
    },
    health: {
      pl: 'Ciało domaga się równowagi: tyle samo napięcia co rozluźnienia, pracy co odpoczynku, kawy co wody. Przegięcia w którąkolwiek stronę szybko wystawiają rachunek.',
      en: 'The body demands balance: as much tension as release, work as rest, coffee as water. Excess in either direction bills you quickly.',
    },
    advice: {
      pl: 'Zanim osądzisz innych, zważ własny udział na tej samej wadze. A decyzję, którą odkładasz, podejmij według zasady: co byłoby uczciwe, gdyby role były odwrócone?',
      en: 'Before judging others, weigh your own part on the same scales. And make the decision you keep postponing by one rule: what would be fair if the roles were reversed?',
    },
  },
  'major-12': {
    love: {
      pl: 'Wisielec prosi o zmianę perspektywy: zobacz związek oczami drugiej strony, choćby przez jeden wieczór. Czasem oznacza też zawieszenie — relację, która czeka, aż ktoś dojrzeje do decyzji.',
      en: 'The Hanged Man asks for a shift of perspective: see the relationship through the other person’s eyes, even for one evening. Sometimes it also marks suspension — a bond waiting for someone to grow into a decision.',
    },
    work: {
      pl: 'Projekt utknął? To może być dojrzewanie, nie porażka. Odwróć problem: zamiast pytać, jak przyspieszyć, zapytaj, czego ta pauza próbuje Cię nauczyć. Rozwiązania przychodzą z nieoczywistej strony.',
      en: 'Project stuck? That may be ripening, not failure. Invert the problem: instead of asking how to speed up, ask what the pause is trying to teach you. Solutions arrive from the unobvious side.',
    },
    health: {
      pl: 'Czas sprzyja praktykom odwrócenia i zwolnienia: joga, rozciąganie, oddech, post cyfrowy. Ciało zawieszone w łagodnym bezruchu regeneruje głębiej niż w kolejnym sprincie.',
      en: 'The moment favours inversion and slowing down: yoga, stretching, breathwork, a digital fast. A body suspended in gentle stillness recovers deeper than in another sprint.',
    },
    advice: {
      pl: 'Przestań się szarpać — węzeł zaciska się od szarpania. Zawiśnij świadomie: to, co z tej perspektywy wygląda jak strata czasu, z przyszłej okaże się punktem zwrotnym.',
      en: 'Stop thrashing — the knot tightens with every pull. Hang deliberately: what looks like wasted time from here will look like the turning point from the future.',
    },
  },
  'major-13': {
    love: {
      pl: 'Śmierć w miłości rzadko oznacza rozstanie — częściej koniec pewnej wersji związku: etapu, układu sił, starej rany, wokół której krążyliście. Coś musi się skończyć, żeby bliskość mogła się odrodzić. Po rozstaniu zaś mówi wprost: ta historia domknęła się po coś.',
      en: 'Death in love rarely means a breakup — more often the end of a version of the relationship: a stage, a power balance, an old wound you kept orbiting. Something must end for closeness to be reborn. After a separation it says plainly: that story closed for a reason.',
    },
    work: {
      pl: 'Koniec projektu, roli albo całej ścieżki — i dobrze, choć trudno. Najlepsze, co możesz zrobić zawodowo, to zamknąć elegancko: oddać wiedzę, pożegnać ludzi, zabrać lekcje. Nowe stanowisko rekrutuje się spośród tych, którzy umieją kończyć.',
      en: 'The end of a project, a role, or an entire path — rightly, though hard. The best professional move is an elegant close: hand over knowledge, say goodbyes, take the lessons. New positions recruit from those who know how to finish.',
    },
    health: {
      pl: 'Transformacja bywa fizyczna: zmiana nawyków, zakończenie tego, co truje — używki, zarwane noce, chroniczne przeciążenie. Ciało dziękuje za każdy domknięty rozdział szybciej, niż się spodziewasz.',
      en: 'Transformation can be physical: changed habits, ending what poisons — stimulants, broken nights, chronic overload. The body says thank you for every closed chapter sooner than you expect.',
    },
    advice: {
      pl: 'Nie reanimuj tego, co się dopełniło. Zorganizuj temu godny pogrzeb — podziękuj, zapamiętaj, puść — a zwolnione miejsce zapełni się szybciej, niż śmiesz przypuszczać.',
      en: 'Do not resuscitate what has completed itself. Give it a dignified funeral — thank it, remember it, release it — and the freed space will fill faster than you dare suppose.',
    },
  },
  'major-14': {
    love: {
      pl: 'Umiarkowanie to alchemia dwojga: mieszanie temperamentów tak długo, aż powstanie coś trzeciego, wspólnego. Sprzyja godzeniu po kłótniach i związkom, w których różnice stają się przepisem, nie problemem.',
      en: 'Temperance is the alchemy of two: blending temperaments until something third and shared appears. It favours reconciliation after quarrels and relationships where differences become the recipe, not the problem.',
    },
    work: {
      pl: 'Środek ciężkości leży między skrajnościami: między perfekcjonizmem a bylejakością, między sprintem a prokrastynacją. Mieszaj zasoby ostrożnie i testuj proporcje — wielkie ruchy zostaw na inny miesiąc.',
      en: 'The centre of gravity lies between extremes: between perfectionism and sloppiness, between sprinting and stalling. Blend resources carefully and test proportions — save the grand moves for another month.',
    },
    health: {
      pl: 'Klucz to dawka: ta sama rzecz leczy i szkodzi zależnie od ilości. Nawodnienie, umiarkowany ruch, jedzenie bez skrajnych diet — nudne rady, które teraz naprawdę działają.',
      en: 'Dosage is the key: the same thing heals or harms depending on quantity. Hydration, moderate movement, eating without extreme diets — boring advice that genuinely works right now.',
    },
    advice: {
      pl: 'Nie wybieraj między żywiołami — mieszaj je. Cierpliwie, po trochu, próbując smaku po każdej zmianie proporcji.',
      en: 'Do not choose between the elements — blend them. Patiently, a little at a time, tasting after every change of proportion.',
    },
  },
  'major-15': {
    love: {
      pl: 'Diabeł to namiętność i uwikłanie w jednym: przyciąganie, któremu trudno odmówić, relacja, z której trudno wyjść, zazdrość przebrana za troskę. Nie każda intensywność jest bliskością — sprawdź, czy łańcuch da się zdjąć, zanim nazwiesz go biżuterią.',
      en: 'The Devil is passion and entanglement at once: attraction that is hard to refuse, a relationship hard to leave, jealousy dressed as care. Not all intensity is intimacy — check whether the chain comes off before calling it jewellery.',
    },
    work: {
      pl: 'Złote kajdanki: dobra pensja w miejscu, które Cię zjada, układ, który wygodnie krępuje, ambicja przechodząca w obsesję. Policz prawdziwy koszt tego, co "się opłaca".',
      en: 'Golden handcuffs: good pay in a place that eats you, an arrangement that binds comfortably, ambition sliding into obsession. Count the true cost of what “pays off.”',
    },
    health: {
      pl: 'Karta nałogów i kompulsji — od cukru po scrollowanie o trzeciej nad ranem. Nie walcz wstydem; zbadaj, jaką potrzebę łańcuch naprawdę zaspokaja, i nakarm ją inaczej.',
      en: 'The card of addictions and compulsions — from sugar to 3 a.m. scrolling. Do not fight with shame; investigate what need the chain actually meets, and feed it differently.',
    },
    advice: {
      pl: 'Nazwij swój łańcuch po imieniu — to połowa wolności. Druga połowa to zauważyć, że ogniwa są luźne dokładnie tam, gdzie nigdy nie próbujesz.',
      en: 'Name your chain out loud — that is half of freedom. The other half is noticing the links are loose exactly where you never test them.',
    },
  },
  'major-16': {
    love: {
      pl: 'Wieża w miłości to prawda, która wychodzi na jaw i zmienia wszystko: wyznanie, odkrycie, kryzys czyszczący powietrze. Boli — ale związki przebudowane po szczerym trzęsieniu stoją na skale, nie na pozorach.',
      en: 'The Tower in love is truth surfacing and changing everything: a confession, a discovery, a crisis that clears the air. It hurts — but relationships rebuilt after an honest earthquake stand on rock, not appearances.',
    },
    work: {
      pl: 'Nagła restrukturyzacja, upadek projektu, plan rozsypany jednym mailem. Ratuj nie mury, lecz fundamenty: kompetencje, relacje, reputację — z nich odbudujesz szybciej, niż dziś wygląda.',
      en: 'Sudden restructuring, a collapsed project, a plan scattered by one email. Save the foundations, not the walls: skills, relationships, reputation — from those you will rebuild faster than it looks today.',
    },
    health: {
      pl: 'Sygnały przeciążenia bywają nagłe: coś "strzela", coś się przesila. Potraktuj alarm poważnie przy pierwszym dzwonku — Wieża powtarza lekcje coraz głośniej.',
      en: 'Overload signals can be sudden: something snaps, something gives. Take the alarm seriously at the first bell — the Tower repeats its lessons ever louder.',
    },
    advice: {
      pl: 'Nie odbudowuj starej wieży ze starych cegieł na starym błędzie. Zapytaj, co ten wstrząs odsłonił — i tym razem zacznij od fundamentu.',
      en: 'Do not rebuild the old tower from old bricks on the old mistake. Ask what the quake exposed — and this time start from the foundation.',
    },
  },
  'major-17': {
    love: {
      pl: 'Gwiazda leczy serce po burzy: powrót zaufania, delikatna nowa znajomość, nadzieja, która nie jest naiwna. Otwartość znów jest bezpieczna — na tyle, na ile zechcesz jej pozwolić.',
      en: 'The Star heals the heart after a storm: trust returning, a gentle new connection, hope that is not naive. Openness is safe again — as much as you allow it to be.',
    },
    work: {
      pl: 'Po trudnym okresie wraca sens i pojawia się dalekie, jasne światło: powołanie, projekt-marzenie, kierunek na lata. Nie musisz biec — wystarczy, że przestaniesz iść w przeciwną stronę.',
      en: 'After a hard stretch, meaning returns and a distant clear light appears: a calling, a dream project, a direction for years. You need not run — it is enough to stop walking the other way.',
    },
    health: {
      pl: 'Regeneracja przebiega teraz wyjątkowo dobrze: sen naprawia, woda oczyszcza, łagodność działa. Idealny czas na powolny powrót do formy po przesileniu.',
      en: 'Recovery goes remarkably well now: sleep repairs, water cleanses, gentleness works. An ideal time for a slow return to form after depletion.',
    },
    advice: {
      pl: 'Pielęgnuj nadzieję jak praktykę, nie jak nastrój. Wybierz jedną gwiazdę — jedno prawdziwe pragnienie — i nawadniaj je codziennie po trochu.',
      en: 'Tend hope as a practice, not a mood. Choose one star — one true desire — and water it a little every day.',
    },
  },
  'major-18': {
    love: {
      pl: 'Księżyc zamgla sprawy sercowe: niedopowiedzenia, projekcje, lęki z przeszłości przebrane za intuicję. Zanim oskarżysz partnera o cień na ścianie, sprawdź, czy to nie Twoja latarnia go rzuca.',
      en: 'The Moon mists the affairs of the heart: things unsaid, projections, old fears dressed up as intuition. Before accusing your partner of a shadow on the wall, check whether your own lantern casts it.',
    },
    work: {
      pl: 'Nie wszystkie karty leżą na stole: niejasne intencje, plotki, projekt o ruchomych celach. Dokumentuj ustalenia, dopytuj o konkrety i odłóż wielkie decyzje, aż mgła zejdzie.',
      en: 'Not all cards are on the table: unclear intentions, rumours, a project with moving goalposts. Document agreements, ask for specifics, and postpone big decisions until the fog lifts.',
    },
    health: {
      pl: 'Sen, sny i psychika wychodzą na pierwszy plan: bezsenność i niepokój to teraz wiadomości, nie usterki. Higiena wieczoru — mniej ekranów, stałe pory — rozjaśnia więcej, niż obiecuje.',
      en: 'Sleep, dreams, and the psyche take the foreground: insomnia and unease are messages now, not malfunctions. Evening hygiene — fewer screens, steady hours — clarifies more than it promises.',
    },
    advice: {
      pl: 'We mgle nie podejmuje się wielkich decyzji — robi się małe, odwracalne kroki. Zapisuj, co czujesz: rano połowa nocnych potworów okazuje się wieszakiem z płaszczem.',
      en: 'In fog you do not make grand decisions — you take small, reversible steps. Write down what you feel: by morning half the night’s monsters turn out to be a coat on a hook.',
    },
  },
  'major-19': {
    love: {
      pl: 'Słońce rozświetla uczucia: radość z bycia razem bez analizowania, wspólny śmiech, miłość, którą chce się pokazywać światu. Samotnym wróży spotkanie kogoś, przy kim łatwo być sobą.',
      en: 'The Sun lights up the feelings: joy in being together without overanalysis, shared laughter, a love you want to show the world. For singles it augurs meeting someone around whom being yourself is easy.',
    },
    work: {
      pl: 'Sukces staje się widoczny: pochwały, wyniki, projekt, który wreszcie "klika". Pokaż swoją pracę w pełnym świetle — skromność bywa cnotą, ale nie w tym rozdaniu.',
      en: 'Success becomes visible: praise, results, the project that finally clicks. Show your work in full light — modesty is a virtue, just not in this hand.',
    },
    health: {
      pl: 'Witalność wraca falą: więcej energii, lepszy nastrój, ochota na ruch. Wyjdź dosłownie na słońce — światło dzienne jest teraz najtańszym lekarstwem w aptece.',
      en: 'Vitality returns in a wave: more energy, better mood, appetite for movement. Step into actual sunlight — daylight is currently the cheapest medicine in the pharmacy.',
    },
    advice: {
      pl: 'Przyjmij dobro bez szukania haczyka. Radość nie jest zaliczką, którą trzeba odpracować — czasem po prostu jest ładna pogoda.',
      en: 'Accept the good without hunting for the catch. Joy is not an advance you must work off — sometimes the weather is simply fine.',
    },
  },
  'major-20': {
    love: {
      pl: 'Sąd wzywa do rozliczenia z historią serca: przebaczyć, domknąć, czasem odezwać się po latach — albo ostatecznie pożegnać. Związek może przejść odrodzenie, jeśli oboje wstaniecie z własnych grobów uraz.',
      en: 'Judgement calls for a reckoning with the heart’s history: forgiving, closing, sometimes reaching out after years — or finally saying goodbye. A relationship can be reborn if you both rise from your own graves of grievance.',
    },
    work: {
      pl: 'Podsumowanie etapu: ocena, bilans, powołanie do czegoś większego niż dotychczasowa rola. Odpowiedz na wezwanie, które słyszysz od dawna — drugi dzwonek bywa cichszy.',
      en: 'A stage-end summary: a review, a balance sheet, a calling toward something larger than the current role. Answer the summons you have long been hearing — the second bell tends to be quieter.',
    },
    health: {
      pl: 'Czas rozliczyć zaległości wobec ciała: odkładane badania, przeterminowane "od jutra". Stare dolegliwości wracają tylko po to, by tym razem zostać potraktowane poważnie.',
      en: 'Time to settle arrears with the body: postponed check-ups, expired “starting tomorrows.” Old complaints return only to be taken seriously this time.',
    },
    advice: {
      pl: 'Zrób uczciwy bilans bez samobiczowania: co wybaczam, co zabieram, co zostawiam w grobie. A potem wstań — odrodzenie to czynność, nie nagroda.',
      en: 'Draw an honest balance without self-flagellation: what I forgive, what I take, what stays in the grave. Then rise — rebirth is an action, not a reward.',
    },
  },
  'major-21': {
    love: {
      pl: 'Świat to miłość spełniona na miarę tego rozdziału: para, która stała się drużyną, dom, który jest domem. Cykl się domyka — a domknięte cykle mają zwyczaj otwierać większe: wspólną podróż, przeprowadzkę, nowy etap rodziny.',
      en: 'The World is love fulfilled for this chapter: a couple that became a team, a house that is a home. The cycle completes — and completed cycles tend to open larger ones: a shared journey, a move, a new family stage.',
    },
    work: {
      pl: 'Finał z dyplomem: koniec studiów, wielkiego projektu, kontraktu — z uznaniem i poczuciem "zrobione". Świętuj zanim zaczniesz następne; niedocenione finały mszczą się brakiem paliwa.',
      en: 'A finale with a diploma: the end of studies, a big project, a contract — with recognition and a sense of “done.” Celebrate before starting the next thing; uncelebrated endings take revenge as missing fuel.',
    },
    health: {
      pl: 'Ciało lubi domykanie pętli: pełny cykl snu, dokończona rehabilitacja, cel treningowy doprowadzony do mety. Zamknij, co otwarte — i dopiero wtedy podnoś poprzeczkę.',
      en: 'The body likes closed loops: full sleep cycles, completed rehabilitation, a training goal carried to the finish. Close what is open — and only then raise the bar.',
    },
    advice: {
      pl: 'Postaw kropkę i ją uczcij. Świat nie pyta, co jeszcze musisz — pyta, co już zdążyło się w Tobie dopełnić i dokąd chcesz tańczyć dalej.',
      en: 'Place the full stop and honour it. The World does not ask what you still must do — it asks what has already completed itself in you, and where you want to dance next.',
    },
  },
}
