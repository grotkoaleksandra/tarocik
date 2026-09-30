import type { HTMLAttributes, ReactNode } from 'react'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

/**
 * Layout wrapper for page sections. Content used to fade up on scroll; the
 * printed-book design sets everything on the page at once, like ink on paper.
 */
export function Reveal({ children, className = '', ...rest }: RevealProps) {
  return (
    <div className={className || undefined} {...rest}>
      {children}
    </div>
  )
}
