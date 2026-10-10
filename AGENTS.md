# AGENTS.md - bogleheads.ar

Astro static wiki in Spanish (es-AR). Unofficial Bogleheads® community
site for Argentina. Content: CC BY-SA 4.0. Code: MIT.

## Commands (just)

```bash
just help   # list recipes
just run    # astro dev (npm run dev)
just build  # astro build -> dist/ (npm run build)
```

No tests, lint, typecheck, or CI exist — `just build` is the verification
step. (The justfile comment mentioning Pagefind is stale: no search
indexing exists.) Deploy: Cloudflare Workers Static Assets from `dist/`
via `wrangler deploy` (config in `wrangler.jsonc`, worker name
`bogleheads-ar`). No SSR adapter — output stays fully static.

## Content

- Wiki articles: `src/content/wiki/*.md` with front matter `title`,
  `description?`, `category` (Teoría | Argentina | Estudios | Recursos |
  Otro), `date?`, `updated?` — schema in `src/content.config.ts`. No
  `layout` key: `src/pages/wiki/[...slug].astro` renders the collection.
- `/wiki/` index groups by category plus 5 most recent by `date`;
  `src/pages/llms.txt.js` auto-generates `/llms.txt` from all articles —
  no manual step when adding articles.
- No per-article edit links or disclaimers (the CONTRIBUTING.md "edit link
  is generated" line is stale — none exists). GitHub/contribution pointers
  live only in the footer, the `/wiki/` note, and Acerca; the unofficial /
  not-financial-advice banner lives in `Base.astro`. Don't duplicate them
  in articles.
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

Astro collapses newlines between text and tags, gluing words to links
("desdeGitHub"). Always use explicit `{" "}` at text↔`<a>` boundaries
across lines. After building, verify with:

```bash
grep -rhoE '.{16}<a [^>]*>' dist/ | grep -E '[A-Za-z0-9]<a ' || echo ok
grep -rhoE '</a>.{16}' dist/ | grep -E '</a>[A-Za-z]' || echo ok
```

## Dates

YAML parses `date: 2026-10-10` as a Date, so the collection schema uses
`z.coerce.date()`. Format with `timeZone: "UTC"` to avoid off-by-one days.
