import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Fades content up once it scrolls into view (once per mount).
 * Uses a rAF-throttled scroll check rather than IntersectionObserver so the
 * content can never be left invisible if observer callbacks don't run.
 * Pass layout classes via className — they land on the wrapper div.
 */
export function Reveal({ children, delay = 0, className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    let done = false

    const cleanup = () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearInterval(poll)
    }

    const check = () => {
      if (done) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight - 40 && r.bottom > 0) {
        done = true
        setVisible(true)
        cleanup()
      }
    }

    // Belt and braces: scroll/resize events plus a slow poll, so content can
    // never stay invisible in environments with unreliable event timing.
    const poll = setInterval(check, 400)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return cleanup
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
