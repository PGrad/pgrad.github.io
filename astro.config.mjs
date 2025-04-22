import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://paulgrad.netlify.app/',
  integrations: [react(),
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
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
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
  adapter: netlify({
    edgeMiddleware: true,
  }),
});