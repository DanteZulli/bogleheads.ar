# <img src="public/favicon.svg" width="24" height="24" alt="Faro Año Nuevo" /> bogleheads.ar

Unofficial Argentine community site about the Bogleheads® investment
philosophy: passive, indexed, periodic investing, with local context
(brokers, taxes, currency) and educational tools.

Static site built with [Astro](https://astro.build). Content lives in
Markdown under `src/content/`. Deployed on Cloudflare Workers Static Assets
from `dist/` (see `wrangler.jsonc`).

## Commands

With [just](https://github.com/casey/just) (`just help` lists recipes):

```bash
just run    # local server with live reload
just build  # static production build into dist/
```

Or with npm directly:

```bash
npm install   # install dependencies
npm run dev   # local server with live reload
npm run build # static production build into dist/
```

## Deploy (Cloudflare Pages)

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `https://bogleheads.ar`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Wiki articles live in
`src/content/wiki/` as Markdown files.

Brand assets (lighthouse variants) live in `public/marca/`. Book covers go
in `public/libros/` and are referenced from `src/pages/bibliografia/`.

## License

Site content: CC BY-SA 4.0 (same license as Wikipedia).
Code: MIT (see [LICENSE](LICENSE)).
