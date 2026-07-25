import type { Lang, TarotCard } from '../types'
import { cardLabel } from '../lib/draw'

const GOLD = '#d9b45b'
const GOLD_DIM = '#a8874a'

function SuitEmblem({ card }: { card: TarotCard }) {
  if (card.arcana === 'major') {
    return (
      <g stroke={GOLD} strokeWidth="2" fill="none" strokeLinejoin="round">
        <circle cx="100" cy="150" r="34" opacity="0.55" />
        <path d="M100 104 L109 137 L146 150 L109 163 L100 196 L91 163 L54 150 L91 137 Z" fill="#141a38" />
        <path d="M100 122 L105 145 L128 150 L105 155 L100 178 L95 155 L72 150 L95 145 Z" fill={GOLD} stroke="none" opacity="0.9" />
        <circle cx="100" cy="150" r="46" opacity="0.3" strokeDasharray="2 5" />
      </g>
    )
  }
  switch (card.suit) {
    case 'wands':
      return (
        <g stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round">
          <line x1="100" y1="112" x2="100" y2="188" />
          <path d="M100 124 C88 118 84 108 86 100 C96 102 102 110 100 124 Z" fill={GOLD} strokeWidth="1.5" />
          <path d="M100 140 C112 134 116 124 114 116 C104 118 98 126 100 140 Z" fill={GOLD} strokeWidth="1.5" />
          <path d="M100 158 C88 152 84 142 86 134 C96 136 102 144 100 158 Z" fill="none" strokeWidth="2" opacity="0.7" />
          <circle cx="100" cy="192" r="4" fill={GOLD} strokeWidth="1" />
        </g>
      )
    case 'cups':
      return (
        <g stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M70 118 C70 148 84 158 100 158 C116 158 130 148 130 118 Z" fill="#141a38" />
          <path d="M74 122 C74 146 86 154 100 154 C114 154 126 146 126 122" opacity="0.5" />
          <line x1="100" y1="158" x2="100" y2="178" />
          <path d="M78 186 C86 178 114 178 122 186" />
          <path d="M92 106 C96 110 104 110 108 106" opacity="0.7" />
        </g>
      )
    case 'swords':
      return (
        <g stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M100 100 L106 112 L106 164 L100 172 L94 164 L94 112 Z" fill="#141a38" />
          <line x1="76" y1="170" x2="124" y2="170" strokeWidth="3.5" />
          <path d="M76 170 C76 164 82 162 86 166 M124 170 C124 164 118 162 114 166" strokeWidth="2" />
          <line x1="100" y1="172" x2="100" y2="192" />
          <circle cx="100" cy="196" r="4.5" fill={GOLD} strokeWidth="1" />
        </g>
      )
    case 'pentacles':
      return (
        <g stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinejoin="round">
          <circle cx="100" cy="150" r="42" fill="#141a38" />
          <circle cx="100" cy="150" r="35" opacity="0.5" strokeWidth="1.5" />
          <path d="M100 118 L109.4 143.1 L136 144.1 L115.2 160.9 L122.4 186.6 L100 172 L77.6 186.6 L84.8 160.9 L64 144.1 L90.6 143.1 Z" strokeWidth="2" />
        </g>
      )
    default:
      return null
  }
}

export function CardArt({ card, lang }: { card: TarotCard; lang: Lang }) {
  const label = cardLabel(card, lang)
  const name = card.name[lang].toUpperCase()
  const longName = name.length > 14
  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <defs>
        <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2148" />
          <stop offset="55%" stopColor="#10142e" />
          <stop offset="100%" stopColor="#0b0e22" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="320" rx="12" fill="url(#cardBg)" />
      <rect x="7" y="7" width="186" height="306" rx="8" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <rect x="13" y="13" width="174" height="294" rx="5" fill="none" stroke={GOLD_DIM} strokeWidth="0.75" opacity="0.7" />
      {/* corner stars */}
      {[
        [24, 26], [176, 26], [24, 294], [176, 294],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y - 5} L${x + 1.6} ${y - 1.6} L${x + 5} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 5} L${x - 1.6} ${y + 1.6} L${x - 5} ${y} L${x - 1.6} ${y - 1.6} Z`}
          fill={GOLD}
          opacity="0.85"
        />
      ))}
      <text x="100" y="66" textAnchor="middle" fill={GOLD} fontSize="26" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" letterSpacing="3">
        {label}
      </text>
      <line x1="60" y1="82" x2="140" y2="82" stroke={GOLD_DIM} strokeWidth="0.75" opacity="0.8" />
      <SuitEmblem card={card} />
      <line x1="60" y1="222" x2="140" y2="222" stroke={GOLD_DIM} strokeWidth="0.75" opacity="0.8" />
      {longName ? (
        (() => {
          const words = name.split(' ')
          const mid = Math.ceil(words.length / 2)
          const line1 = words.slice(0, mid).join(' ')
          const line2 = words.slice(mid).join(' ')
          return (
            <>
              <text x="100" y="252" textAnchor="middle" fill={GOLD} fontSize="15" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" letterSpacing="1.5">
                {line1}
              </text>
              <text x="100" y="272" textAnchor="middle" fill={GOLD} fontSize="15" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" letterSpacing="1.5">
                {line2}
              </text>
            </>
          )
        })()
      ) : (
        <text x="100" y="262" textAnchor="middle" fill={GOLD} fontSize="17" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" letterSpacing="2">
          {name}
        </text>
      )}
    </svg>
  )
}

export function CardBack() {
  const stars: [number, number, number][] = [
    [40, 60, 1.4], [160, 48, 1.1], [70, 110, 1], [140, 130, 1.5], [50, 190, 1.2],
    [155, 210, 1], [95, 250, 1.3], [45, 280, 1], [165, 285, 1.4], [100, 40, 1],
    [30, 150, 1], [170, 165, 1.2], [120, 85, 1], [80, 300, 1],
  ]
  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <defs>
        <radialGradient id="backGlow" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#232b5c" />
          <stop offset="100%" stopColor="#0b0e22" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="320" rx="12" fill="url(#backGlow)" />
      <rect x="7" y="7" width="186" height="306" rx="8" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <rect x="14" y="14" width="172" height="292" rx="5" fill="none" stroke={GOLD_DIM} strokeWidth="0.75" opacity="0.6" />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={GOLD} opacity="0.7" />
      ))}
      <g stroke={GOLD} fill="none" strokeWidth="1.5">
        <circle cx="100" cy="160" r="40" opacity="0.9" />
        <circle cx="100" cy="160" r="47" opacity="0.35" strokeDasharray="2 6" />
        {/* crescent moon */}
        <path d="M112 134 A32 32 0 1 0 112 186 A26 26 0 1 1 112 134 Z" fill={GOLD} stroke="none" opacity="0.9" />
      </g>
      <path d="M100 96 L103 105 L112 108 L103 111 L100 120 L97 111 L88 108 L97 105 Z" fill={GOLD} opacity="0.9" />
      <path d="M100 200 L103 209 L112 212 L103 215 L100 224 L97 215 L88 212 L97 209 Z" fill={GOLD} opacity="0.9" />
    </svg>
  )
}
