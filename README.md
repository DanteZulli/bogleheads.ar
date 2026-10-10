# bogleheads.ar

Unofficial Argentine community site about the Bogleheads® investment
philosophy: passive, indexed, periodic investing, with local context
(brokers, taxes, currency) and educational tools.

Static site built with [Astro](https://astro.build). Content lives in
Markdown under `src/pages/`. Deployed on Cloudflare Pages from `dist/`.

## Commands

```bash
npm install   # install dependencies
npm run dev   # local server with live reload (search needs a build, see below)
npm run build # static production build into dist/ + Pagefind search index
```

Site search is powered by [Pagefind](https://pagefind.app): `npm run build`
indexes `dist/` automatically. Search works in preview/production, not in
`npm run dev` (the index doesn't exist until you build).

## Deploy (Cloudflare Pages)

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `https://bogleheads.ar`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Every wiki article links to its
source file on GitHub ("Editar esta página").

## License

Site content: CC BY-NC-ND 4.0 (same spirit as bogleheads.es).
Code: MIT.
