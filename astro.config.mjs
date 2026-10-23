import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Copies sitemap-index.xml → sitemap.xml for legacy URL compatibility.
 */
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

/**
 * Custom sitemap plugin: injects <xhtml:link> hreflang alternates (pt, pt-BR, x-default)
 * into every <url> block so Google can confirm multilingual targeting via sitemap.
 * Required because @astrojs/sitemap does NOT auto-generate xhtml:link entries.
 */
function sitemapHreflangSerializer() {
  return {
    name: 'sitemap-hreflang-inject',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        // Process all sitemap-*.xml files except the index
        const files = fs.readdirSync(distPath).filter(
          (f) => f.startsWith('sitemap-') && f.endsWith('.xml') && f !== 'sitemap-index.xml'
        );

        for (const file of files) {
          const filePath = path.join(distPath, file);
          let content = fs.readFileSync(filePath, 'utf-8');

          // Ensure xhtml namespace is declared on the <urlset> element
          if (!content.includes('xmlns:xhtml')) {
            content = content.replace(
              '<urlset ',
              '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" '
            );
          }

          // Inject <xhtml:link> hreflang tags immediately after each <loc> entry
          content = content.replace(
            /(<loc>(https:\/\/cronometrodigital\.com[^<]*)<\/loc>)/g,
            (match, _full, url) => {
              const cleanUrl = url.trim();
              return (
                `${match}\n` +
                `    <xhtml:link rel="alternate" hreflang="pt" href="${cleanUrl}"/>\n` +
                `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${cleanUrl}"/>\n` +
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${cleanUrl}"/>`
              );
            }
          );

          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`✓ Injected hreflang xhtml:link into ${file}`);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://cronometrodigital.com',
  trailingSlash: 'never',
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
    sitemapHreflangSerializer(), // Runs first — injects xhtml:link hreflang into sitemap URLs
    sitemapAlias(),              // Runs second — copies index to sitemap.xml alias
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});