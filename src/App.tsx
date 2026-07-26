import { useEffect, useState } from 'react'
import type { Lang } from './types'
import { loadLang, saveLang, ui } from './lib/i18n'
import { Home } from './components/Home'
import { Reading } from './components/Reading'
import { Library } from './components/Library'
import { Guide } from './components/Guide'
import { LogoMark, WatercolorFlowerSvg } from './components/Doodles'

type View = 'home' | 'reading' | 'library' | 'guide'

const viewFromHash = (): View => {
  const h = window.location.hash.replace('#', '')
  return h === 'reading' || h === 'library' || h === 'guide' ? h : 'home'
}

const viewTitles: Record<View, { pl: string; en: string }> = {
  home: { pl: 'Tarocik — tarot online', en: 'Tarocik — tarot online' },
  reading: { pl: 'Rozkłady — Tarocik', en: 'Readings — Tarocik' },
  library: { pl: 'Znaczenia kart — Tarocik', en: 'Card meanings — Tarocik' },
  guide: { pl: 'Jak czytać tarota — Tarocik', en: 'How to read tarot — Tarocik' },
}

export default function App() {
  const [lang, setLang] = useState<Lang>(loadLang)
  const [view, setView] = useState<View>(viewFromHash)

  useEffect(() => {
    const onHash = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    document.title = viewTitles[view][lang]
  }, [view, lang])

  const go = (v: View) => {
    window.location.hash = v === 'home' ? '' : v
    setView(v)
  }

  const switchLang = (l: Lang) => {
    setLang(l)
    saveLang(l)
  }

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: ui.navHome[lang] },
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
        <button type="button" className="brand" onClick={() => go('home')}>
          <LogoMark className="brand-mark" />
          <span className="brand-word">Tarocik</span>
        </button>
        <nav className="site-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${view === item.id ? 'is-active' : ''}`}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
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
      <main key={view}>
        {view === 'home' && <Home lang={lang} onNavigate={go} />}
        {view === 'reading' && <Reading lang={lang} />}
        {view === 'library' && <Library lang={lang} />}
        {view === 'guide' && <Guide lang={lang} />}
      </main>
      <footer className="site-footer">
        <LogoMark className="footer-mark" />
        <p className="footer-brand">Tarocik</p>
        <p className="footer-note">{ui.footerNote[lang]}</p>
        <p className="footer-meta">© 2026 Tarocik · {ui.disclaimerShort[lang]}</p>
      </footer>
    </div>
  )
}
