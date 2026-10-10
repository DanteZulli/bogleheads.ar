# Contributing

Thanks for helping with bogleheads.ar! This is an unofficial, open
educational project. Content is written in Spanish (es-AR).

## Editing an existing article

Wiki articles live in `src/content/wiki/` as Markdown files. You can edit
them directly on the GitHub website or clone the repo and propose changes
through a pull request.

## Adding a new wiki article

1. Create a `.md` file in `src/content/wiki/`, e.g.
   `src/content/wiki/mi-articulo.md`.
2. Use this front matter (no layout needed — collection pages render
   automatically):

```markdown
---
title: "Título del artículo"
description: "Resumen corto para SEO y listados."
category: "Teoría"
date: 2026-10-10
---

Contenido en Markdown...
```

3. Available categories: `Teoría`, `Argentina`, `Estudios`, `Recursos`,
   `Otro`.
4. The article appears automatically on `/wiki/` (grouped by category)
   and the edit link is generated from its URL.

## Style

- Plain, beginner-friendly language. No hype, no promises of returns.
- Argentina-specific notes (taxes, brokers, currency) go in `Argentina`
  or inline as asides.
- This site is educational only, never financial advice.

## Local preview

```bash
npm install
npm run dev
```
