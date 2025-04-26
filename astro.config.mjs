import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paulgrad.netlify.app/',
  integrations: [react(),
    // allows for the use of MDX in Astro
    // to write blog posts.
    mdx(),
    // automatically generates a sitemap https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(), 
    // adds PWA support to the site.
    // automatically generates the manifest and service worker.
    AstroPWA({
      mode: 'development',
      base: '/',
      scope: '/',
      registerType: 'autoUpdate',
      manifest: {
        "background_color": "#ffffff",
        "description": "The personal website of Paul Grad, a Frontend Developer based in Oakland, CA.",
        "dir": "ltr",
        "display": "standalone",
        "name": "Paul's Projects",
        "orientation": "any",
        "scope": "https://paulgrad.netlify.app/",
        "short_name": "All Paul",
        "start_url": "/",
        "theme_color": "#000000",
        "icons": [
          {
            "src": "/pwa_icon.png",
            "sizes": "600x600"
          }
        ],
        "id": "?source=paul_portfolio",
        "lang": "en"
      },
      pwaAssets: {
        config: true,
      },
      workbox: {
        navigateFallback: '/',
        maximumFileSizeToCacheInBytes: 3000000,
        globPatterns: ['**/*.{css,js,ts,json,html,svg,jpg,png,ico,txt}'],
        navigateFallbackDenylist: [/^\/api/, /^\/blog/],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    })
  ],
  // adapter builds for Netlify deploys,
  // and allows for use of edge functions.
  adapter: netlify({
    edgeMiddleware: true,
  }),
});