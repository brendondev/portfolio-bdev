import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brendondev.thedev.me',
  integrations: [
    tailwind(),
    sitemap()
  ],
  prefetch: {
    prefetchAll: true
  },
  build: {
    assets: 'assets'
  }
});
