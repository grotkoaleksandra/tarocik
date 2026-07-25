# Tarocik

A bilingual (Polish/English) tarot website for the **tarocik** domain.

## Features

- **Card of the day** — a deterministic daily card, the same for every visitor
  on a given date, with a flip-to-reveal animation
- **Interactive readings** — three spreads (one card, three-card
  past/present/future, five-card cross of guidance) with shuffle and flip
  animations; cards can appear reversed
- **Card meanings library** — all 78 cards with upright and reversed keywords
  and meanings, searchable and filterable by arcana/suit
- **PL/EN toggle** — full Polish and English content; the choice is remembered
  in localStorage and the default follows the browser language
- **Original card art** — every card face is drawn in SVG (gold on midnight),
  no external images

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build (dist/)
npm run preview    # serve the production build
```

## Deploying to your domain

`npm run build` produces a fully static site in `dist/` — host it anywhere
(Netlify, Vercel, Cloudflare Pages, GitHub Pages) and point the tarocik domain
at it.
