import { useEffect } from 'react'
import type { Lang } from '../types'
import type { Faq } from '../lib/faq'
import { Reveal } from './Reveal'
import { Sparkle } from './Doodles'
import { setJsonLd } from '../lib/jsonld'
import { faqPageLd } from '../lib/schema'

const heading = {
  pl: 'Częste pytania',
  en: 'Frequently asked questions',
}

interface Props {
  faqs: Faq[]
  lang: Lang
  /** JSON-LD element id. Matches the id the prerenderer bakes into this
   *  route's HTML, so the client upserts rather than duplicating it.
   *  Card pages emit their FAQ inside the page graph instead — they pass none. */
  ldId?: string
}

/** Visible Q&A block. Rendered as real text (not an accordion) so that both
 *  readers and answer engines get the complete answer without interaction. */
export function FaqSection({ faqs, lang, ldId }: Props) {
  useEffect(() => {
    if (!ldId) return
    setJsonLd(ldId, faqPageLd(faqs, lang))
    return () => setJsonLd(ldId, null)
  }, [faqs, lang, ldId])

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <Reveal>
        <h2 className="faq-title" id="faq-heading">
          <Sparkle className="hd hd-faq-spark" />
          {heading[lang]}
        </h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <Reveal key={f.q.en} className="faq-item" delay={i * 50}>
            <h3 className="faq-q">{f.q[lang]}</h3>
            <p className="faq-a">{f.a[lang]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
