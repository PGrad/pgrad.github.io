import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://paulgrad.netlify.app/',
  integrations: [react(), AstroPWA()],
  adapter: netlify({
    edgeMiddleware: true,
  }),
});