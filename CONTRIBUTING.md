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
order: 1
---

Contenido en Markdown...
```

`author: "Nombre"` (singular) is also accepted; `date` is required.
`order` is optional: listings sort by `order` ascending first (entries
without it go last), then by title — use it to pin e.g. Introducción
on top.
`updated` is optional: if omitted, the build stamps it automatically from
the last git commit touching the file (falling back to `date`), so
committing a change is what updates it — no hooks, no manual step.

3. Available categories: `Teoría`, `Argentina`, `Estudios`, `Recursos`,
   `Otro` (slugs: `teoria`, `argentina`, `estudios`, `recursos`, `otro`).
4. The article appears automatically on `/wiki/` (category boxes), on its
   category page `/wiki/categoria/<slug>/`, and at
   `/wiki/<slug-categoria>/<slug-articulo>/` with breadcrumb and TOC.

## Style

- Plain, beginner-friendly language.
- Argentina-specific notes (taxes, brokers, currency) are welcome,
  either in `Argentina` articles or inline.
- This site is educational only, never financial advice.

## Local preview

```bash
just run    # preferred (wraps npm run dev)
```

Or with npm directly:

```bash
npm install
npm run dev
```
