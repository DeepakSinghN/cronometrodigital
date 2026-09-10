import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

function sitemapAlias() {
  return {
    name: 'sitemap-alias',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        const indexPath = path.join(distPath, 'sitemap-index.xml');
        const aliasPath = path.join(distPath, 'sitemap.xml');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, aliasPath);
          console.log('✓ Copied sitemap-index.xml to sitemap.xml in dist');
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://cronometrodigital.com',
  integrations: [
    sitemap({
      // Exclude old English redirect stubs & error pages from sitemap
      filter: (page) =>
        !page.includes('/about-us') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/terms-and-conditions') &&
        !page.includes('/contact-us') &&
        !page.includes('/404') &&
        !page.includes('/500'),
      // Set Portuguese language for all sitemap entries
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
        },
      },
    }),
    sitemapAlias(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});