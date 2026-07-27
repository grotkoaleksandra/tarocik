import { useMemo, useState } from 'react'
import type { Lang, TarotCard } from '../types'
import { allCards } from '../data/cards'
import { ui } from '../lib/i18n'
import { CardArt } from './CardArt'
import { Reveal } from './Reveal'
import { Sparkle } from './Doodles'
import { cardSlug } from '../lib/slugs'

type Filter = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

const filters: { id: Filter; label: keyof typeof ui }[] = [
  { id: 'all', label: 'filterAll' },
  { id: 'major', label: 'filterMajor' },
  { id: 'wands', label: 'filterWands' },
  { id: 'cups', label: 'filterCups' },
  { id: 'swords', label: 'filterSwords' },
  { id: 'pentacles', label: 'filterPentacles' },
]

export function Library({ lang, onOpenCard }: { lang: Lang; onOpenCard: (card: TarotCard) => void }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allCards.filter((c) => {
      if (filter === 'major' && c.arcana !== 'major') return false
      if (filter !== 'all' && filter !== 'major' && c.suit !== filter) return false
      if (q && !c.name.pl.toLowerCase().includes(q) && !c.name.en.toLowerCase().includes(q))
        return false
      return true
    })
  }, [filter, query])

  return (
    <section className="library">
      <Reveal>
        <header className="page-head">
          <span className="page-index" aria-hidden="true">03</span>
          <Sparkle className="hd hd-head-spark" />
          <h2 className="page-title">{ui.libraryTitle[lang]}</h2>
          <p className="page-sub">{ui.libraryIntro[lang]}</p>
        </header>
      </Reveal>
      <Reveal className="library-controls" delay={80}>
        <input
          type="search"
          className="search-input"
          placeholder={ui.searchPlaceholder[lang]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-row">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-chip ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {ui[f.label][lang]}
            </button>
          ))}
        </div>
      </Reveal>
      {visible.length === 0 ? (
        <p className="section-sub">{ui.noResults[lang]}</p>
      ) : (
        <Reveal className="card-grid" delay={140}>
          {visible.map((c) => (
            <a
              key={c.id}
              className="grid-card"
              href={`/karta/${cardSlug(c)}/`}
              onClick={(e) => {
                e.preventDefault()
                onOpenCard(c)
              }}
            >
              <CardArt card={c} lang={lang} />
              <span className="grid-card-name">{c.name[lang]}</span>
            </a>
          ))}
        </Reveal>
      )}
    </section>
  )
}
