# Contributing

Thanks for helping with bogleheads.ar! This is an unofficial, open
educational project. Content is written in Spanish (es-AR).

## Editing an existing article

Wiki articles live in `src/content/wiki/` as Markdown files. You can edit
them directly on the GitHub website or clone the repo and propose changes
through a pull request.

## Adding a new wiki article

1. Create a `.md` file in its category folder, e.g.
   `src/content/wiki/argentina/mi-articulo.md` (`teoria`, `argentina`,
   `estudios`, `recursos`, `otro`).
2. Use this front matter (no layout needed — collection pages render
   automatically):

```markdown
---
title: "Título del artículo"
description: "Resumen corto para SEO y listados."
category: "Argentina"
authors: ["Dante Zulli"]
date: 2026-10-10
---

Contenido en Markdown...
```

`author: "Nombre"` (singular) is also accepted; `date` is required.
`updated` is optional: if omitted, the build stamps it automatically from
the last git commit touching the file (falling back to `date`), so
committing a change is what updates it — no hooks, no manual step.

3. Available categories: `Teoría`, `Argentina`, `Estudios`, `Recursos`,
   `Otro` (slugs: `teoria`, `argentina`, `estudios`, `recursos`, `otro`).
4. The article appears automatically on `/wiki/` (category boxes), on its
   category page `/wiki/categoria/<slug>/`, and at
   `/wiki/<slug-categoria>/<slug-articulo>/` with breadcrumb and TOC.

## Style

- Plain, beginner-friendly language. No hype, no promises of returns.
- Argentina-specific notes (taxes, brokers, currency) go in `Argentina`
  or inline as asides.
- This site is educational only, never financial advice.

## Editorial policy (golden rule)

- Universal theory is not duplicated here — it is linked. If an article
  would read the same for any country, don't write it: link to
  bogleheads.es or bogleheads.org instead (`Teoría` = curated links).
- Every original article must answer "what changes in Argentina?": local
  numbers, procedures, taxes, or context — with an effective date, since
  local info rots fast.
- Every article ends with a `Referencias` section in APA 7th format, plus
  `Para profundizar` links. Always attribute; never copy-paste.

## Local preview

```bash
npm install
npm run dev
```
