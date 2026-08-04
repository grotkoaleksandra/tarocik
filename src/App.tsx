import { useEffect, useState } from 'react'
import type { Lang } from './types'
import { loadLang, saveLang, ui } from './lib/i18n'
import { Home } from './components/Home'
import { Reading } from './components/Reading'
import { Library } from './components/Library'
import { Guide } from './components/Guide'
import { DailyPage } from './components/DailyPage'
import { CardPage } from './components/CardPage'
import { LogoMark, WatercolorFlowerSvg } from './components/Doodles'
import { cardBySlug, cardSlug } from './lib/slugs'
import { cardById } from './data/cards'
import { SITE, viewPaths, viewTitles, viewDescriptions } from './lib/meta'
import type { TarotCard } from './types'

type View = 'home' | 'daily' | 'reading' | 'library' | 'guide' | 'card'

interface Route {
  view: View
  cardId?: string
}

const normalize = (p: string) => p.replace(/\/+$/, '') || '/'

const legacyHashes: Record<string, Exclude<View, 'card'>> = {
  reading: 'reading',
  library: 'library',
  guide: 'guide',
}

type StaticView = Exclude<View, 'card'>

const routeFromLocation = (ssrPath?: string): Route => {
  const hash = typeof window === 'undefined' ? '' : window.location.hash.replace('#', '')
  if (legacyHashes[hash]) return { view: legacyHashes[hash] }
  const path = normalize(ssrPath ?? window.location.pathname)
  if (path.startsWith('/karta/')) {
    const card = cardBySlug(path.slice('/karta/'.length))
    if (card) return { view: 'card', cardId: card.id }
    return { view: 'library' }
  }
  const match = (Object.keys(viewPaths) as StaticView[]).find(
    (v) => normalize(viewPaths[v]) === path,
  )
  return { view: match ?? 'home' }
}

function setMeta(view: StaticView, lang: Lang) {
  document.title = viewTitles[view][lang]
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', viewDescriptions[view][lang])
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE + viewPaths[view])
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', SITE + viewPaths[view])
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute('content', viewTitles[view][lang])
}

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  const [lang, setLang] = useState<Lang>(loadLang)
  const [route, setRoute] = useState<Route>(() => routeFromLocation(ssrPath))
  const view = route.view

  // Migrate legacy #hash URLs to real paths once, on load.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (legacyHashes[hash]) {
      window.history.replaceState(null, '', viewPaths[legacyHashes[hash]])
    }
  }, [])

  useEffect(() => {
    const onPop = () => setRoute(routeFromLocation())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (view !== 'card') setMeta(view, lang)
  }, [view, lang])

  const go = (v: StaticView) => {
    if (normalize(window.location.pathname) !== normalize(viewPaths[v])) {
      window.history.pushState(null, '', viewPaths[v])
    }
    setRoute({ view: v })
    window.scrollTo(0, 0)
  }

  const goCard = (card: TarotCard) => {
    const path = `/karta/${cardSlug(card)}/`
    if (normalize(window.location.pathname) !== normalize(path)) {
      window.history.pushState(null, '', path)
    }
    setRoute({ view: 'card', cardId: card.id })
    window.scrollTo(0, 0)
  }

  const navigate = (v: StaticView) => (e: React.MouseEvent) => {
    e.preventDefault()
    go(v)
  }

  const switchLang = (l: Lang) => {
    setLang(l)
    saveLang(l)
  }

  const navItems: { id: StaticView; label: string }[] = [
    { id: 'daily', label: ui.navHome[lang] },
    { id: 'reading', label: ui.navReading[lang] },
    { id: 'library', label: ui.navLibrary[lang] },
    { id: 'guide', label: ui.navGuide[lang] },
  ]

  return (
    <div className="app">
      <div className="stars-bg" aria-hidden="true" />
      {view !== 'home' && (
        <div className="doodles" aria-hidden="true">
          <WatercolorFlowerSvg petals={5} seed={4} accent className="doodle doodle-a" />
          <WatercolorFlowerSvg petals={6} seed={17} className="doodle doodle-b" />
          <WatercolorFlowerSvg petals={5} seed={31} className="doodle doodle-c" />
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="/" onClick={navigate('home')}>
          <LogoMark className="brand-mark" />
          <span className="brand-word">Tarocik</span>
        </a>
        <nav className="site-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`nav-link ${view === item.id ? 'is-active' : ''}`}
              href={viewPaths[item.id]}
              onClick={navigate(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === 'pl' ? 'is-active' : ''}
            onClick={() => switchLang('pl')}
          >
            PL
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            className={lang === 'en' ? 'is-active' : ''}
            onClick={() => switchLang('en')}
          >
            EN
          </button>
        </div>
      </header>
      <main key={view + (route.cardId ?? '')}>
        {view === 'home' && <Home lang={lang} onNavigate={go} />}
        {view === 'daily' && <DailyPage lang={lang} />}
        {view === 'reading' && <Reading lang={lang} />}
        {view === 'library' && <Library lang={lang} onOpenCard={goCard} />}
        {view === 'guide' && <Guide lang={lang} onOpenCard={goCard} />}
        {view === 'card' && route.cardId && cardById.get(route.cardId) && (
          <CardPage
            card={cardById.get(route.cardId)!}
            lang={lang}
            onOpenCard={goCard}
            onOpenLibrary={() => go('library')}
            onOpenReading={() => go('reading')}
          />
        )}
      </main>
      <footer className="site-footer">
        <LogoMark className="footer-mark" />
        <p className="footer-brand">Tarocik</p>
        <p className="footer-note">{ui.footerNote[lang]}</p>
        <p className="footer-credit">
          {ui.madeBy[lang]}:{' '}
          <a href="https://cotoaleksandra.com" target="_blank" rel="noopener">
            cotoaleksandra.com
          </a>
          {' · '}
          <a href="https://instagram.com/cotoaleksandra" target="_blank" rel="noopener">
            Instagram
          </a>
          {' · '}
          <a href="mailto:cotoaleksandra@gmail.com">cotoaleksandra@gmail.com</a>
        </p>
        <p className="footer-meta">© 2026 Tarocik · {ui.disclaimerShort[lang]}</p>
      </footer>
    </div>
  )
}
