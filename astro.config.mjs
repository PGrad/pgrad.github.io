import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://pgrad.github.io',
  base: '/home',
  integrations: [react(), AstroPWA()],
  adapter: node({
    mode: 'standalone'
  })
});