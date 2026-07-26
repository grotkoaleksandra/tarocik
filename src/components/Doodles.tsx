/* Hand-drawn flowers: ink line variant (for the cards) and a borderless
   watercolor variant (for page decoration). */

function makeRand(seed: number) {
  let a = seed || 1
  return () => {
    a = (Math.imul(a, 1103515245) + 12345) & 0x7fffffff
    return (a / 0x7fffffff) * 2 - 1
  }
}

/** Ink petal: a closed wobbly loop, pointing up. */
const PETAL = 'M 0 -6 C -11 -13 -16 -28 -9 -37 C -4 -43 5 -42 8 -34 C 13 -24 8 -12 0 -6 Z'

/** Watercolor petal: fatter teardrop blob, pointing up. */
const WC_PETAL = 'M 0 -8 C -15 -12 -23 -27 -18 -39 C -13 -49 3 -51 10 -42 C 18 -32 15 -15 0 -8 Z'

/** Blue dry-brush streak, roughly petal-shaped but narrow. */
const WC_STREAK = 'M -3 2 C -8 -10 -6 -28 0 -41 C 4 -30 6 -12 3 2 Z'

const WC_COLORS = ['#ee7ba0', '#e75f88', '#f0875f', '#ec6a8d', '#f2919f', '#e96e93']

/**
 * Ink flower with unevenly rotated, unevenly sized petals.
 * Inherits stroke settings from the surrounding group.
 */
export function FlowerShape({ petals = 6, seed = 1 }: { petals?: number; seed?: number }) {
  const rand = makeRand(seed)
  const items = []
  let angle = rand() * 30
  for (let i = 0; i < petals; i++) {
    const scale = (0.82 + (rand() + 1) * 0.19).toFixed(2)
    items.push(<path key={i} d={PETAL} transform={`rotate(${angle.toFixed(1)}) scale(${scale})`} />)
    angle += 360 / petals + rand() * 16
  }
  return (
    <g>
      {items}
      <circle r="2.6" fill="currentColor" stroke="none" />
    </g>
  )
}

/** Logo mark: a tilted hand-drawn card with an ink flower on its face. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 58" className={className} aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-8 22 29)"
      >
        <path d="M9 6.5 Q22 4.8 35.2 6.8 Q36.8 29 35.6 51.6 Q22 53.4 8.6 51.8 Q7.4 29 9 6.5 Z" />
        <g transform="translate(22 29) scale(0.34)" strokeWidth="7.5">
          <FlowerShape petals={5} seed={9} />
        </g>
      </g>
    </svg>
  )
}

/**
 * Borderless watercolor flower: soft filled petals, no outlines,
 * an optional deep-blue brush streak, paper-white centre.
 */
export function WatercolorFlowerSvg({
  petals = 5,
  seed = 1,
  accent = false,
  className,
}: {
  petals?: number
  seed?: number
  accent?: boolean
  className?: string
}) {
  const rand = makeRand(seed)
  const items = []
  let angle = rand() * 40
  let accentAngle = 0
  for (let i = 0; i < petals; i++) {
    const scale = (0.92 + (rand() + 1) * 0.17).toFixed(2)
    const color = WC_COLORS[(i + seed) % WC_COLORS.length]
    if (i === 1) accentAngle = angle
    items.push(
      <path
        key={i}
        d={WC_PETAL}
        fill={color}
        fillOpacity={0.88}
        transform={`rotate(${angle.toFixed(1)}) scale(${scale})`}
      />,
    )
    angle += 360 / petals + rand() * 12
  }
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <defs>
        <filter id="wcSoft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.4" />
        </filter>
      </defs>
      <g filter="url(#wcSoft)" stroke="none">
        {items}
        {accent && (
          <path
            d={WC_STREAK}
            fill="#2b4bb5"
            fillOpacity="0.92"
            transform={`rotate(${(accentAngle + 8).toFixed(1)}) scale(1.05)`}
          />
        )}
      </g>
    </svg>
  )
}
