/* The etched marks the site uses: the star, glory rays, the divider. */

/** Eight-pointed star, as cut in old woodblock tarot decks. Centred on 0,0, radius ~10. */
export const STAR8 =
  'M0 -10 L2.2 -5.3 L7.1 -7.1 L5.3 -2.2 L10 0 L5.3 2.2 L7.1 7.1 L2.2 5.3 L0 10 L-2.2 5.3 L-7.1 7.1 L-5.3 2.2 L-10 0 L-5.3 -2.2 L-7.1 -7.1 L-2.2 -5.3 Z'

/**
 * Glory: engraved rays radiating from a centre, alternating long and short,
 * the way devotional prints draw light around a saint.
 */
export function rays(cx: number, cy: number, inner: number, outer: number, count: number): string {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const r2 = i % 2 === 0 ? outer : outer * 0.78
    const x1 = cx + Math.cos(a) * inner
    const y1 = cy + Math.sin(a) * inner
    const x2 = cx + Math.cos(a) * r2
    const y2 = cy + Math.sin(a) * r2
    parts.push(`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`)
  }
  return parts.join(' ')
}

/** A large glory of rays, drawn behind the hero cards. */
export function Glory({ className }: { className?: string }) {
  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden="true">
      <path d={rays(0, 0, 70, 196, 72)} stroke="currentColor" strokeWidth="1.1" fill="none" />
      <circle r="62" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
    </svg>
  )
}

/** Section divider: a rule broken by a star between two dots. */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-rule" />
      <svg viewBox="-34 -11 68 22" className="divider-mark">
        <circle cx="-24" r="2" fill="currentColor" />
        <path d={STAR8} fill="currentColor" />
        <circle cx="24" r="2" fill="currentColor" />
      </svg>
      <span className="divider-rule" />
    </div>
  )
}
