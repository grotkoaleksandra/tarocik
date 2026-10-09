import type { Lang } from '../types'
import { ui } from '../lib/i18n'

export const SUPPORT_URL = 'https://buycoffee.to/cotoaleksandra'

/** A small boxed notice inviting a tip, set like a printer's advertisement. */
export function SupportNote({ lang }: { lang: Lang }) {
  return (
    <aside className="support-note">
      <p className="support-head">{ui.supportHead[lang]}</p>
      <p className="support-body">{ui.supportBody[lang]}</p>
      <a className="btn-ink support-link" href={SUPPORT_URL} target="_blank" rel="noopener">
        {ui.supportCta[lang]}
      </a>
    </aside>
  )
}
