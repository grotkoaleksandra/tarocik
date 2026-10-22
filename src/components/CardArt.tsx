import type { ComponentType, ReactNode } from 'react'
import type { Lang, Suit, TarotCard } from '../types'
import { cardLabel } from '../lib/draw'
import { STAR8, rays } from './Ornaments'

const INK = '#0b0a09'
const PAPER = '#fbfaf6'
const GOTHIC = "'Grenze Gotisch', 'Libre Caslon Text', Georgia, serif"
const SERIF = "'Libre Caslon Text', Georgia, serif"

/** The arched window every card's image sits in. */
const ARCH = 'M40 222 V110 A60 30 0 0 1 160 110 V222 Z'

/** The taller arched window that holds a major arcana etching (148 × 172,
 *  the crop shape scripts/etchings.mjs cuts). */
const ETCH_ARCH = 'M26 230 V112 A74 54 0 0 1 174 112 V230 Z'

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

/* ---------- the card faces ---------- */

/** Clips for the arched windows: the small one (minors) and the tall one
 *  that frames each major arcana etching. */
function ArchClip() {
  return (
    <defs>
      <clipPath id="archClip">
        <path d={ARCH} />
      </clipPath>
      <clipPath id="etchClip">
        <path d={ETCH_ARCH} />
      </clipPath>
      <clipPath id="sunClip">
        <circle cx="100" cy="160" r="60" />
      </clipPath>
    </defs>
  )
}

/** Small star set in each corner of the frame, like a holy card's border. */
function CornerStars() {
  return (
    <g fill={INK} stroke="none">
      {[
        [24, 24],
        [176, 24],
        [24, 296],
        [176, 296],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={STAR8} transform={`translate(${x} ${y}) scale(0.45)`} />
      ))}
    </g>
  )
}

function CardChrome({ children }: { children?: ReactNode }) {
  return (
    <>
      <ArchClip />
      <rect x="0" y="0" width="200" height="320" rx="4" fill={PAPER} />
      <g
        stroke={INK}
        color={INK}
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="7" y="7" width="186" height="306" strokeWidth="5" />
        <rect x="14" y="14" width="172" height="292" strokeWidth="1.2" />
        <CornerStars />
        {children}
      </g>
    </>
  )
}

export function CardArt({ card, lang }: { card: TarotCard; lang: Lang }) {
  const label = cardLabel(card, lang)
  const name = card.name[lang]
  // leave room between the side rules for the top label
  const labelHalf = Math.max(22, label.length * 6 + 8)
  const nameSize = name.length >= 18 ? 13 : name.length >= 14 ? 14.5 : 16.5
  // pips are busy enough on their own; only aces and courts get the glory
  const glorious = card.arcana === 'minor' && ((card.rank ?? 0) === 1 || (card.rank ?? 0) > 10)

  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <CardChrome>
        {card.arcana === 'major' ? (
          <>
            <image
              href={`/etchings/major-${String(card.number ?? 0).padStart(2, '0')}.png`}
              x="26"
              y="58"
              width="148"
              height="172"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#etchClip)"
            />
            <path d={ETCH_ARCH} strokeWidth="2.2" />
          </>
        ) : (
          <>
            <rect x="24" y="62" width="152" height="166" fill={INK} stroke="none" />
            <path d={ARCH} fill={PAPER} strokeWidth="1.5" />
          </>
        )}
        {glorious && (
          <g clipPath="url(#archClip)">
            <path d={rays(100, 150, 34, 110, 48)} strokeWidth="0.9" />
            <circle cx="100" cy="150" r="31" fill={PAPER} strokeWidth="1" strokeDasharray="0.5 3.2" />
          </g>
        )}
        {card.arcana === 'major' ? null : card.rank && card.rank <= 10 ? (
          pipLayouts[card.rank].map(([x, y, s], i) => {
            const Glyph = suitGlyph[card.suit as Suit]
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={(2.8 / s).toFixed(2)}>
                <Glyph />
              </g>
            )
          })
        ) : (
          <>
            <CourtMarker rank={card.rank ?? 11} />
            <g transform="translate(100 152) scale(1.5)" strokeWidth="2">
              {(() => {
                const Glyph = suitGlyph[card.suit as Suit]
                return <Glyph />
              })()}
            </g>
          </>
        )}
        <path d={CARTOUCHE} fill={PAPER} strokeWidth="1.6" />
        <path d={`M34 44 H${100 - labelHalf} M${100 + labelHalf} 44 H166`} strokeWidth="1.2" />
      </CardChrome>
      <text
        x="100"
        y="51"
        textAnchor="middle"
        fill={INK}
        fontSize="16"
        fontWeight="700"
        fontFamily={SERIF}
        style={{ fontVariantNumeric: 'lining-nums' }}
        letterSpacing="1.5"
      >
        {label}
      </text>
      <text
        x="100"
        y="257.5"
        textAnchor="middle"
        fill={INK}
        fontSize={nameSize}
        fontWeight="600"
        fontFamily={GOTHIC}
      >
        {name}
      </text>
    </svg>
  )
}

/** Card back: Dürer's etched sun in a medallion, set in a black field. */
export function CardBack() {
  return (
    <svg viewBox="0 0 200 320" className="card-art" aria-hidden="true">
      <CardChrome>
        <rect x="22" y="22" width="156" height="276" fill={INK} stroke="none" />
        <rect x="28" y="28" width="144" height="264" stroke={PAPER} strokeWidth="0.9" />
        <circle cx="100" cy="160" r="60" fill={PAPER} stroke="none" />
        <image
          href="/etchings/back.png"
          x="40"
          y="100"
          width="120"
          height="120"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#sunClip)"
        />
        <circle cx="100" cy="160" r="60" stroke={PAPER} strokeWidth="3" />
        <circle cx="100" cy="160" r="66" stroke={PAPER} strokeWidth="1" />
        <g fill={PAPER} stroke="none">
          <path d={STAR8} transform="translate(100 60) scale(0.9)" />
          <path d={STAR8} transform="translate(100 260) scale(0.9)" />
        </g>
      </CardChrome>
    </svg>
  )
}
