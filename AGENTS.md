# AGENTS.md - bogleheads.ar

Astro static wiki in Spanish (es-AR). Unofficial Bogleheads® community
site for Argentina. Content: CC BY-SA 4.0. Code: MIT.

## Commands (just)

```bash
just help     # list recipes
just run      # astro dev (npm run dev)
just build    # astro build -> dist/ (npm run build)
just preview  # serve dist/ locally (astro preview)
```

No tests, lint, typecheck, or CI exist — `just build` is the verification
step. Deploy: Cloudflare Workers Static Assets from `dist/`
via `wrangler deploy` (config in `wrangler.jsonc`, worker name
`bogleheads-ar`). No SSR adapter — output stays fully static.
Note: `astro dev` serves Astro's own default 404 page, not
`src/pages/404.astro`. In `astro preview`, unknown routes serve
`dist/404.html` only with trailing slash (`/noexiste/` works, `/noexiste`
shows Astro's built-in notice) because `trailingSlash: 'always'`. In
production, Workers serves `dist/404.html` for any miss via
`not_found_handling = "404-page"`.

## Content

- Wiki articles: `src/content/wiki/*.md` with front matter `title`,
  `description?`, `category` (Teoría | Argentina | Estudios | Recursos |
  Otro), `date?`, `updated?` — schema in `src/content.config.ts`. No
  `layout` key: `src/pages/wiki/[...slug].astro` renders the collection.
- `/wiki/` index groups by category plus 5 most recent by `date`;
  `src/pages/llms.txt.js` auto-generates `/llms.txt` from all articles —
  no manual step when adding articles.
- No per-article edit links or disclaimers. GitHub/contribution pointers
  live only in the footer, the `/wiki/` note, and Acerca; the unofficial /
  not-financial-advice banner lives in `Base.astro`. Don't duplicate them
  in articles.
- Golden rule: universal theory is linked, not duplicated; original
  articles must carry Argentine context + effective date + APA 7
  `Referencias` (see CONTRIBUTING.md).
- Bibliography books are hardcoded in `src/pages/bibliografia/index.astro`;
  `cover` is optional — drop the file into `public/libros/` (create the
  dir; local files only, no hotlinking) and reference it there.

## Site conventions

- `trailingSlash: 'always'` (`astro.config.mjs`): all internal links end
  in `/` (`/wiki/`, `/acerca/`, `/wiki/<slug>/`).
- Zero client-side JS in the output (only a static JSON-LD `<script>`).
  Charts/figures must be static SVG or local images — no chart libraries,
  no CDNs.
- Palette (CSS vars in `src/styles/global.css`): `#001F3F` `#003366`
  `#005B99` `#007BFF` `#A8DADC`.
- Brand assets: `public/marca/` (Faro Año Nuevo lighthouse mark). SEO
  (OG/Twitter/JSON-LD/sitemap) is centralized in `src/layouts/Base.astro`;
  social card is the committed `public/marca/og-card.png` (source:
  `og-card.svg`) — regenerate both together.

## Astro gotcha: whitespace around links

Astro collapses newlines between text and inline tags, gluing words
("desdeGitHub"). Use explicit `{" "}` at text↔tag line boundaries — it is
the standard JSX mechanism, invisible in the output, and stable under
Prettier/Zed format-on-save. After building, verify output with:

```bash
grep -rhoE '.{16}<(a|strong|em|code)[ >][^>]*>' dist/ | grep -E '[A-Za-z0-9]<(a|strong|em)' || echo ok
grep -rhoE '</(a|strong|em|code)>.{16}' dist/ | grep -E '</(a|strong|em)>[A-Za-z]' || echo ok
```

## Dates

YAML parses `date: 2026-10-10` as a Date, so the collection schema uses
`z.coerce.date()`. Format with `timeZone: "UTC"` to avoid off-by-one days.
