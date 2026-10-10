# AGENTS.md - bogleheads.ar

Astro (static) wiki in Spanish (es-AR). Unofficial Bogleheads® community
site for Argentina. Content: CC BY-SA 4.0. Code: MIT.

## Commands (just)

```bash
just help   # list recipes
just run    # astro dev
just build  # astro build
```

## Conventions

- Wiki articles: `src/content/wiki/*.md` with front matter `title`,
  `description?`, `category` (Teoría | Argentina | Estudios | Recursos |
  Otro), `date?`, `updated?`. No `layout` key needed — `[...slug].astro`
  renders the collection automatically.
- No per-article edit links or disclaimers. Keep articles clean: GitHub is
  referenced only in the footer and on Acerca.
- Palette (navy): `#001F3F` `#003366` `#005B99` `#007BFF` `#A8DADC`.
- Brand assets: `public/marca/`. Book covers (local files only, no
  hotlinking): `public/libros/`, referenced from the bibliography page.
- Zero client-side JS in the output (build-to-last). Charts/figures must be
  static SVG or local images — no chart libraries, no CDNs.
- SEO: `@astrojs/sitemap` (build-time only), `src/pages/llms.txt.js`
  auto-generates `/llms.txt` from the wiki, OG/Twitter/JSON-LD live in
  `src/layouts/Base.astro`, social card is the committed
  `public/marca/og-card.png` (source: `og-card.svg`).

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
