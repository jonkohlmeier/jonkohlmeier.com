// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const legacySitemapPaths = new Set([
  '/blog/',
  '/categories/life/',
  '/categories/productivity/',
  '/categories/web-design/',
  '/categories/finer-things-in-life/',
]);

const includeInSitemap = (page) => {
  const pathname = new URL(page).pathname;
  if (legacySitemapPaths.has(pathname)) return false;
  return !pathname.startsWith('/writing/') || pathname === '/writing/';
};

// https://astro.build/config
export default defineConfig({
  site: 'https://jonkohlmeier.com',
  integrations: [mdx(), sitemap({ filter: includeInSitemap })],

  vite: {
    plugins: [tailwindcss()],
  },
});
