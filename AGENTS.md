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
via `wrangler deploy` (config in `wrangler.jsonc`).

## Content

- Wiki articles: `src/content/wiki/<slug-categoria>/*.md`
  (`teoria`, `argentina`, `estudios`, `recursos`, `otro`) with front matter
  `title`, `description?`, `category` (Teoría | Argentina | Estudios |
  Recursos | Otro, required), `author` or `authors` (required), `date`
  (required), `updated?` (auto from last git commit, else `date`),
  `order?` (order first, then title) — schema in `src/content.config.ts`.
- Zero client-side JS in the output (only a static JSON-LD `<script>`).

## Conventions

- `trailingSlash: 'always'`: all internal links end in `/`.
- YAML parses `date: 2026-10-10` as a Date, so the schema uses
  `z.coerce.date()`. Format with `timeZone: "UTC"`.
