import type { ComponentType, ReactNode } from 'react'
import type { Lang, Suit, TarotCard } from '../types'
import { cardLabel } from '../lib/draw'
import { FlowerShape } from './Doodles'

const INK = '#3b3733'
const PAPER = '#fffdf6'
const HAND = "'Patrick Hand', 'Comic Sans MS', cursive"

/* ---------- wobbly hand-drawn rectangles ---------- */

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makeRand(seed: number) {
  let a = seed || 1
  return () => {
    a = (Math.imul(a, 1103515245) + 12345) & 0x7fffffff
    return (a / 0x7fffffff) * 2 - 1
  }
}

/** A rectangle drawn by an unsteady hand: jittered corners, gently bowed edges. */
function sketchRect(x: number, y: number, w: number, h: number, seed: number, amp = 2.2): string {
  const rand = makeRand(seed)
  const pt = (px: number, py: number): [number, number] => [
    +(px + rand() * amp).toFixed(1),
    +(py + rand() * amp).toFixed(1),
  ]
  const [ax, ay] = pt(x, y)
  const [bx, by] = pt(x + w, y)
  const [cx, cy] = pt(x + w, y + h)
  const [dx, dy] = pt(x, y + h)
  const edge = (x2: number, y2: number, mx: number, my: number) =>
    `Q ${+(mx + rand() * amp * 1.4).toFixed(1)} ${+(my + rand() * amp * 1.4).toFixed(1)} ${x2} ${y2}`
  return [
    `M ${ax} ${ay}`,
    edge(bx, by, (ax + bx) / 2, (ay + by) / 2),
    edge(cx, cy, (bx + cx) / 2, (by + cy) / 2),
    edge(dx, dy, (cx + dx) / 2, (cy + dy) / 2),
    edge(ax, ay, (dx + ax) / 2, (dy + ay) / 2),
    'Z',
  ].join(' ')
}

/* ---------- suit glyphs (local coords, ~40 units tall, centred on 0,0) ---------- */

function WandGlyph() {
  return (
    <>
      <path d="M0 -20 L0 20" />
      <path d="M0 -11 C -8 -15 -10 -23 -8 -27 C -2 -23 0 -17 0 -11" />
      <path d="M0 -2 C 8 -6 10 -14 8 -18 C 2 -14 0 -8 0 -2" />
    </>
  )
}

function CupGlyph() {
  return (
    <>
      <path d="M-12 -14 C -12 -2 -6 4 0 4 C 6 4 12 -2 12 -14" />
      <path d="M-12 -14 L12 -14" />
      <path d="M0 4 L0 13" />
      <path d="M-8 16 C -4 13 4 13 8 16" />
    </>
  )
}

function SwordGlyph() {
  return (
    <>
      <path d="M0 -22 L0 8" />
      <path d="M-3 -15 L0 -23 L3 -15" />
      <path d="M-8 8 L8 8" />
      <path d="M0 8 L0 15" />
      <circle cx="0" cy="17.5" r="2.2" />
    </>
  )
}

function PentacleGlyph() {
  return (
    <>
      <circle cx="0" cy="0" r="14" />
      <path d="M0 -11 L6.5 8.9 L-10.5 -3.4 L10.5 -3.4 L-6.5 8.9 Z" />
    </>
  )
}

const suitGlyph: Record<Suit, ComponentType> = {
  wands: WandGlyph,
  cups: CupGlyph,
  swords: SwordGlyph,
  pentacles: PentacleGlyph,
}

/** Pip arrangements for 1–10, playing-card style: [x, y, scale]. */
const pipLayouts: Record<number, [number, number, number][]> = {
  1: [[100, 150, 1.7]],
  2: [[100, 116, 1], [100, 184, 1]],
  3: [[70, 150, 1], [100, 150, 1], [130, 150, 1]],
  4: [[74, 116, 1], [126, 116, 1], [74, 184, 1], [126, 184, 1]],
  5: [[74, 116, 1], [126, 116, 1], [74, 184, 1], [126, 184, 1], [100, 150, 1]],
  6: [[74, 112, 1], [126, 112, 1], [74, 150, 1], [126, 150, 1], [74, 188, 1], [126, 188, 1]],
  7: [[74, 112, 0.9], [126, 112, 0.9], [70, 150, 0.9], [100, 150, 0.9], [130, 150, 0.9], [74, 188, 0.9], [126, 188, 0.9]],
  8: [[74, 108, 0.9], [126, 108, 0.9], [74, 136, 0.9], [126, 136, 0.9], [74, 164, 0.9], [126, 164, 0.9], [74, 192, 0.9], [126, 192, 0.9]],
  9: [[70, 112, 0.85], [100, 112, 0.85], [130, 112, 0.85], [70, 150, 0.85], [100, 150, 0.85], [130, 150, 0.85], [70, 188, 0.85], [100, 188, 0.85], [130, 188, 0.85]],
  10: [[74, 106, 0.85], [126, 106, 0.85], [74, 134, 0.85], [126, 134, 0.85], [74, 162, 0.85], [126, 162, 0.85], [74, 190, 0.85], [126, 190, 0.85], [100, 120, 0.85], [100, 176, 0.85]],
}

/** Court markers drawn above the big suit glyph. */
function CourtMarker({ rank }: { rank: number }) {
  switch (rank) {
    case 11: // Page — a little four-point sparkle
      return (
        <g>
          <path d="M100 94 L102 100 L108 102 L102 104 L100 110 L98 104 L92 102 L98 100 Z" />
        </g>
      )
    case 12: // Knight — a pennant flag
      return (
        <g>
          <path d="M92 112 L92 88" />
          <path d="M92 90 L112 95 L92 101" />
        </g>
      )
    case 13: // Queen — a rounded crown
      return (
        <g>
          <path d="M88 108 L88 98 C 92 102 96 102 100 96 C 104 102 108 102 112 98 L112 108 Z" />
          <circle cx="88" cy="94" r="1.6" />
          <circle cx="100" cy="91" r="1.6" />
          <circle cx="112" cy="94" r="1.6" />
        </g>
      )
    case 14: // King — a pointed crown
      return (
        <g>
          <path d="M87 108 L87 96 L94 102 L100 92 L106 102 L113 96 L113 108 Z" />
        </g>
      )
    default:
      return null
  }
}

/* ---------- major arcana doodles ---------- */

function MajorIcon({ n }: { n: number }) {
  switch (n) {
    case 0: // The Fool — a bindle on a stick
      return (
        <g>
          <path d="M82 186 L126 122" />
          <circle cx="131" cy="116" r="11" />
          <path d="M78 190 L88 190 M94 190 L102 190" />
        </g>
      )
    case 1: // The Magician — a wand and sparkles
      return (
        <g>
          <path d="M80 182 L120 122" />
          <path d="M128 106 L128 122 M120 114 L136 114" />
          <path d="M108 98 L108 108 M103 103 L113 103" />
        </g>
      )
    case 2: // The High Priestess — an open book
      return (
        <g>
          <path d="M70 160 C 82 152 94 152 100 158 C 106 152 118 152 130 160 L130 128 C 118 120 106 120 100 126 C 94 120 82 120 70 128 Z" />
          <path d="M100 126 L100 158" />
        </g>
      )
    case 3: // The Empress — venus symbol
      return (
        <g>
          <circle cx="100" cy="132" r="16" />
          <path d="M100 148 L100 176 M88 162 L112 162" />
        </g>
      )
    case 4: // The Emperor — a shield
      return (
        <g>
          <path d="M80 118 L120 118 L120 150 C 120 168 110 178 100 182 C 90 178 80 168 80 150 Z" />
          <path d="M100 126 L100 172 M86 142 L114 142" />
        </g>
      )
    case 5: // The Hierophant — a key
      return (
        <g>
          <circle cx="100" cy="124" r="11" />
          <path d="M100 135 L100 180 M100 172 L110 172 M100 162 L107 162" />
        </g>
      )
    case 6: // The Lovers — a heart
      return (
        <g>
          <path d="M100 172 C 76 152 70 132 81 121 C 90 112 100 119 100 130 C 100 119 110 112 119 121 C 130 132 124 152 100 172 Z" />
        </g>
      )
    case 7: // The Chariot — a little cart
      return (
        <g>
          <path d="M78 134 L122 134 L122 156 L78 156 Z" />
          <path d="M78 134 L85 118 L115 118 L122 134" />
          <circle cx="87" cy="166" r="8" />
          <circle cx="113" cy="166" r="8" />
        </g>
      )
    case 8: // Strength — infinity
      return (
        <g>
          <path d="M78 146 C 78 134 93 134 100 146 C 107 158 122 158 122 146 C 122 134 107 134 100 146 C 93 158 78 158 78 146 Z" />
        </g>
      )
    case 9: // The Hermit — a lantern
      return (
        <g>
          <path d="M92 114 C 92 105 108 105 108 114" />
          <path d="M88 116 L112 116 L110 152 L90 152 Z" />
          <path d="M100 127 L105 135 L100 143 L95 135 Z" />
          <path d="M82 134 L74 134 M118 134 L126 134 M100 158 L100 165" />
        </g>
      )
    case 10: // Wheel of Fortune — a wheel with a pointer
      return (
        <g>
          <circle cx="100" cy="148" r="26" />
          <path d="M100 122 L100 174 M74 148 L126 148 M82 130 L118 166 M118 130 L82 166" />
          <circle cx="100" cy="148" r="4" />
          <path d="M95 112 L105 112 L100 119 Z" />
        </g>
      )
    case 11: // Justice — scales
      return (
        <g>
          <path d="M100 116 L100 172 M74 124 L126 124" />
          <path d="M74 124 L64 142 M74 124 L84 142 M63 143 C 68 151 80 151 85 143" />
          <path d="M126 124 L116 142 M126 124 L136 142 M115 143 C 120 151 132 151 137 143" />
          <path d="M90 178 L110 178" />
        </g>
      )
    case 12: // The Hanged Man — upside-down figure
      return (
        <g>
          <path d="M76 112 L124 112 M100 112 L100 124" />
          <path d="M100 124 L100 140 M100 128 L110 137" />
          <path d="M100 140 L100 156 M100 145 L90 157 M100 145 L110 157" />
          <circle cx="100" cy="165" r="8" />
        </g>
      )
    case 13: // Death — a scythe
      return (
        <g>
          <path d="M93 112 L105 190" />
          <path d="M93 112 C 105 100 124 98 138 106 C 124 108 106 112 96 118" />
        </g>
      )
    case 14: // Temperance — water poured between cups
      return (
        <g>
          <path d="M72 116 L92 110 L94 122 L76 127 Z" />
          <path d="M90 122 C 94 132 98 138 103 146" />
          <path d="M94 150 C 94 160 100 165 107 165 C 114 165 120 160 120 150 M94 150 L120 150" />
        </g>
      )
    case 15: // The Devil — a pitchfork
      return (
        <g>
          <path d="M100 118 L100 182" />
          <path d="M88 116 L88 128 C 88 135 94 138 100 138" />
          <path d="M112 116 L112 128 C 112 135 106 138 100 138" />
          <path d="M85 119 L88 113 L91 119 M109 119 L112 113 L115 119 M97 121 L100 115 L103 121" />
        </g>
      )
    case 16: // The Tower — struck by lightning
      return (
        <g>
          <path d="M87 122 L87 182 L113 182 L113 122" />
          <path d="M85 122 L87 122 L87 115 L93 115 L93 122 L97 122 L97 115 L103 115 L103 122 L107 122 L107 115 L113 115 L113 122 L115 122" />
          <path d="M124 102 L112 118 L120 120 L106 138" />
          <circle cx="100" cy="152" r="3" />
        </g>
      )
    case 17: // The Star — with little rays
      return (
        <g>
          <path d="M100 119 L105.9 136.9 L124.7 137 L109.5 148.1 L115.3 166 L100 155 L84.7 166 L90.5 148.1 L75.3 137 L94.1 136.9 Z" />
          <path d="M100 108 L100 102 M126 122 L131 118 M74 122 L69 118 M124 158 L129 162 M76 158 L71 162" />
        </g>
      )
    case 18: // The Moon — a crescent
      return (
        <g>
          <path d="M110 114 A 34 34 0 1 0 110 178 A 27 27 0 1 1 110 114 Z" />
        </g>
      )
    case 19: // The Sun — with rays
      return (
        <g>
          <circle cx="100" cy="146" r="21" />
          <path d="M100 115 L100 107 M100 177 L100 185 M69 146 L61 146 M131 146 L139 146 M78 124 L72 118 M122 124 L128 118 M78 168 L72 174 M122 168 L128 174" />
        </g>
      )
    case 20: // Judgement — a trumpet
      return (
        <g>
          <path d="M78 164 L118 132 M84 172 L120 144" />
          <path d="M118 132 C 124 134 126 140 120 144" />
          <circle cx="79" cy="167" r="3.5" />
          <path d="M128 122 C 134 126 136 134 133 140 M135 113 C 143 119 145 131 141 139" />
        </g>
      )
    case 21: // The World — a little globe
      return (
        <g>
          <circle cx="100" cy="146" r="24" />
          <ellipse cx="100" cy="146" rx="10" ry="24" />
          <path d="M76 146 L124 146" />
        </g>
      )
    default:
      return null
  }
}

/* ---------- the card faces ---------- */

function CardChrome({ seed, children }: { seed: number; children?: ReactNode }) {
  return (
    <>
      <defs>
        {/* Rough marker texture: every stroke gets nudged by fractal noise. */}
        <filter id="markerRough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" />
        </filter>
      </defs>
      <rect x="0" y="0" width="200" height="320" rx="10" fill={PAPER} />
      <g
        stroke={INK}
        color={INK}
        strokeWidth="3.4"
        strokeOpacity="0.92"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#markerRough)"
      >
        <path d={sketchRect(7, 7, 186, 306, seed, 3.2)} />
        <path d={sketchRect(17, 17, 166, 286, seed + 1, 2.6)} strokeWidth="2.8" />
        {children}
      </g>
    </>
  )
}

export function CardArt({ card, lang }: { card: TarotCard; lang: Lang }) {
  const seed = hashString(card.id)
  const label = cardLabel(card, lang)
  const name = card.name[lang]
  const nameSize = name.length >= 17 ? 12.5 : name.length >= 13 ? 14.5 : 16.5

  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <CardChrome seed={seed}>
        {card.arcana === 'major' ? (
          <MajorIcon n={card.number ?? 0} />
        ) : card.rank && card.rank <= 10 ? (
          pipLayouts[card.rank].map(([x, y, s], i) => {
            const Glyph = suitGlyph[card.suit as Suit]
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={(3.2 / s).toFixed(2)}>
                <Glyph />
              </g>
            )
          })
        ) : (
          <>
            <CourtMarker rank={card.rank ?? 11} />
            <g transform="translate(100 152) scale(1.5)" strokeWidth="2.2">
              {(() => {
                const Glyph = suitGlyph[card.suit as Suit]
                return <Glyph />
              })()}
            </g>
          </>
        )}
        <path d={sketchRect(32, 234, 136, 36, seed + 2, 1.8)} />
      </CardChrome>
      <text
        x="100"
        y="47"
        textAnchor="middle"
        fill={INK}
        fontSize="19"
        fontFamily={HAND}
      >
        {label}
      </text>
      <text
        x="100"
        y="259"
        textAnchor="middle"
        fill={INK}
        fontSize={nameSize}
        fontFamily={HAND}
      >
        {name}
      </text>
    </svg>
  )
}

export function CardBack() {
  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <CardChrome seed={77}>
        <g transform="translate(100 108) scale(1.08)">
          <FlowerShape petals={6} seed={5} />
        </g>
        <g transform="translate(59 213) scale(0.8)">
          <FlowerShape petals={5} seed={13} />
        </g>
        <g transform="translate(143 245) scale(0.64)">
          <FlowerShape petals={6} seed={29} />
        </g>
        <circle cx="150" cy="160" r="2" fill={INK} stroke="none" />
        <circle cx="54" cy="126" r="2" fill={INK} stroke="none" />
        <circle cx="104" cy="288" r="2" fill={INK} stroke="none" />
        <circle cx="42" cy="286" r="1.6" fill={INK} stroke="none" />
      </CardChrome>
    </svg>
  )
}
