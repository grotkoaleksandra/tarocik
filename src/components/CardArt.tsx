import type { ComponentType, ReactNode } from 'react'
import type { Lang, Suit, TarotCard } from '../types'
import { cardLabel } from '../lib/draw'
import { STAR8 } from './Ornaments'

const INK = '#1c1814'
const PAPER = '#f4ecd6'
const SERIF = "'Libre Caslon Text', 'Caslon', Georgia, serif"

/** The arched window every card's image sits in. */
const ARCH = 'M40 222 V110 A60 30 0 0 1 160 110 V222 Z'

/** The name plate at the foot of the card: a box with notched ends. */
const CARTOUCHE = 'M34 236 H166 L160 252 L166 268 H34 L40 252 Z'

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

/** Engraver's cross-hatching, shared by every card on the page. */
function HatchDefs() {
  return (
    <defs>
      <pattern id="woodcutHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0 V5" stroke={INK} strokeWidth="1.1" />
      </pattern>
    </defs>
  )
}

function CardChrome({ children }: { children?: ReactNode }) {
  return (
    <>
      <HatchDefs />
      <rect x="0" y="0" width="200" height="320" rx="4" fill={PAPER} />
      <g
        stroke={INK}
        color={INK}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="8" width="184" height="304" strokeWidth="4" />
        <rect x="15" y="15" width="170" height="290" strokeWidth="1.2" />
        {children}
      </g>
    </>
  )
}

export function CardArt({ card, lang }: { card: TarotCard; lang: Lang }) {
  const label = cardLabel(card, lang)
  const name = card.name[lang].toUpperCase()
  // leave room between the side rules for the top label
  const labelHalf = Math.max(24, label.length * 6 + 8)
  const nameSize = name.length >= 18 ? 7.2 : name.length >= 15 ? 8.2 : name.length >= 12 ? 9.4 : 11

  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <CardChrome>
        <rect x="24" y="64" width="152" height="164" fill="url(#woodcutHatch)" stroke="none" />
        <rect x="24" y="64" width="152" height="164" strokeWidth="1.2" />
        <path d={ARCH} fill={PAPER} strokeWidth="2" />
        {card.arcana === 'major' ? (
          <MajorIcon n={card.number ?? 0} />
        ) : card.rank && card.rank <= 10 ? (
          pipLayouts[card.rank].map(([x, y, s], i) => {
            const Glyph = suitGlyph[card.suit as Suit]
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={(2.6 / s).toFixed(2)}>
                <Glyph />
              </g>
            )
          })
        ) : (
          <>
            <CourtMarker rank={card.rank ?? 11} />
            <g transform="translate(100 152) scale(1.5)" strokeWidth="1.9">
              {(() => {
                const Glyph = suitGlyph[card.suit as Suit]
                return <Glyph />
              })()}
            </g>
          </>
        )}
        <path d={CARTOUCHE} fill={PAPER} strokeWidth="1.2" />
        <path d={`M30 44 H${100 - labelHalf} M${100 + labelHalf} 44 H170`} strokeWidth="1" />
      </CardChrome>
      <text
        x="100"
        y="50"
        textAnchor="middle"
        fill={INK}
        fontSize="17"
        fontWeight="700"
        fontFamily={SERIF}
        style={{ fontVariantNumeric: 'lining-nums' }}
        letterSpacing="1.5"
      >
        {label}
      </text>
      <text
        x="100"
        y="256.5"
        textAnchor="middle"
        fill={INK}
        fontSize={nameSize}
        fontWeight="700"
        fontFamily={SERIF}
        letterSpacing="0.5"
      >
        {name}
      </text>
    </svg>
  )
}

/** Card back: a woodcut lattice under a heavy frame, the star in a medallion. */
export function CardBack() {
  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <defs>
        <pattern id="backLattice" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(100 160)">
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke={INK} strokeWidth="1.3" />
          <path d={STAR8} transform="translate(10 10) scale(0.28)" fill={INK} />
        </pattern>
      </defs>
      <CardChrome>
        <rect x="22" y="22" width="156" height="276" fill="url(#backLattice)" stroke="none" />
        <rect x="22" y="22" width="156" height="276" strokeWidth="1.6" />
        <circle cx="100" cy="160" r="42" fill={PAPER} strokeWidth="2.4" />
        <circle cx="100" cy="160" r="35" fill="url(#woodcutHatch)" strokeWidth="1" />
        <circle cx="100" cy="160" r="27" fill={PAPER} strokeWidth="1" />
        <path d={STAR8} transform="translate(100 160) scale(2.3)" fill={INK} stroke="none" />
        <circle cx="100" cy="160" r="4" fill={PAPER} stroke="none" />
      </CardChrome>
    </svg>
  )
}
