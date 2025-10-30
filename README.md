# Puffs of Smoke

Personal site and writing hub for Jonathan Kohlmeier. Built with [Astro](https://astro.build/), Tailwind, and content collections.

## Getting started

```bash
npm install
npm run dev
```

The development server runs at <http://localhost:4321>. Astro uses file-based routing—pages live in `src/pages`, longform content in `src/content/blog`, and shared UI in `src/components` + `src/layouts`.

## Commands

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start local dev server with hot reload        |
| `npm run build` | Create a production build in `dist/`          |
| `npm run preview` | Preview the production build locally        |
| `npm run astro -- --help` | List all Astro CLI capabilities     |

## Content & structure

- `src/pages/index.astro` – landing page with hero, lead capture, and service overview.
- `src/pages/writing/` – writing archive with `/blog/` routes for backward compatibility.
- `src/content/blog/` – Markdown essays with typed frontmatter (see `src/content.config.ts`).
- `src/pages/services.astro`, `contact.astro`, `now.astro`, `thanks.astro` – supporting pages for advisory work and outreach.

Images for posts live in `src/assets/blog/`. Global styles and design tokens live in `src/styles/global.css` with Tailwind utilities layered on top.

## Deployment

The site expects Node 18+ (see CI workflow in `.github/workflows/build-and-deploy.yml`). Static output in `dist/` can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## License

Copyright © 2025 Jonathan Kohlmeier. All rights reserved.
