import { useMemo, useState } from 'react'
import type { Lang, TarotCard } from '../types'
import { allCards } from '../data/cards'
import { ui } from '../lib/i18n'
import { CardArt } from './CardArt'
import { CardDetail } from './CardDetail'

type Filter = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

const filters: { id: Filter; label: keyof typeof ui }[] = [
  { id: 'all', label: 'filterAll' },
  { id: 'major', label: 'filterMajor' },
  { id: 'wands', label: 'filterWands' },
  { id: 'cups', label: 'filterCups' },
  { id: 'swords', label: 'filterSwords' },
  { id: 'pentacles', label: 'filterPentacles' },
]

export function Library({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TarotCard | null>(null)

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
      <h2 className="section-title">{ui.libraryTitle[lang]}</h2>
      <p className="section-sub">{ui.libraryIntro[lang]}</p>
      <div className="library-controls">
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
      </div>
      {visible.length === 0 ? (
        <p className="section-sub">{ui.noResults[lang]}</p>
      ) : (
        <div className="card-grid">
          {visible.map((c) => (
            <button
              key={c.id}
              type="button"
              className="grid-card"
              onClick={() => setSelected(c)}
            >
              <CardArt card={c} lang={lang} />
              <span className="grid-card-name">{c.name[lang]}</span>
            </button>
          ))}
        </div>
      )}
      {selected && <CardDetail card={selected} lang={lang} onClose={() => setSelected(null)} />}
    </section>
  )
}
