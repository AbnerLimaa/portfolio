// @ts-check
import fs from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import { unified } from '@astrojs/markdown-remark';

// Replace with your production URL after deploying to Vercel / Netlify.
// It powers the sitemap and the canonical / Open Graph URLs in BaseLayout.
const SITE_URL = 'https://astro-starter-portfolio.vercel.app';

export default defineConfig({
  site: SITE_URL,

  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
      ]
    }),
    shikiConfig: {
      langs: [
        JSON.parse(fs.readFileSync(new URL('./src/caja.tmLanguage.json', import.meta.url), 'utf-8'))
      ]
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false,
    }
  },

  integrations: [sitemap()],

  // Prefetches internal links on hover/viewport entry for near-instant navigation.
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  // Astro's built-in Fonts API: self-hosts and optimizes these at build time
  // (no Google-hosted requests, no extra npm packages, automatic preloading).
  // Each cssVariable below is consumed in src/styles/global.css inside the
  // Tailwind @theme block (--font-display, --font-body, --font-mono).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--ff-display',
      weights: ['400', '500', '600'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--ff-body',
      weights: ['400', '500', '600'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Mono',
      cssVariable: '--ff-mono',
      weights: ['400', '700'],
      subsets: ['latin'],
    },
  ],
});
