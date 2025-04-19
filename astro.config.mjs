import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://pgrad.github.io',
  base: '/client',
  integrations: [react()],
  adapter: node({
    mode: 'standalone'
  })
});