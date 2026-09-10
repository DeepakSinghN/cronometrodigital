// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

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
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});