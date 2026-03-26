# Copilot Instructions

## Build & Dev Commands

```bash
npm run dev       # Start local dev server (http://localhost:4321/ricardoguque/)
npm run build     # Production build
npm run preview   # Preview production build locally
```

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## Architecture

This is a personal portfolio site built with **Astro**, **Tailwind CSS**, and **Svelte** (for interactive components).

- `src/layouts/Layout.astro` — base HTML layout with Tailwind
- `src/pages/` — Astro pages (file-based routing)
- `public/` — static assets (images, favicon), served at the `/ricardoguque/` base path

**Site is hosted at** `https://ricardoguque.github.io/ricardoguque/` — the `base: '/ricardoguque'` path prefix in `astro.config.mjs` matters for all internal links and image `src` attributes. Use `import.meta.env.BASE_URL` to reference it dynamically.

## Conventions

- Use Tailwind utility classes for styling (no custom CSS files)
- Use `.astro` files for pages and layouts
- Use `.svelte` files when client-side interactivity is needed
- Public images are referenced with the base path prefix: `` `${base}image.jpg` ``
