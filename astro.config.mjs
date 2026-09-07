// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: confirm production domain before deploy (assumed meridium.sg from enquiries@meridium.sg)
export default defineConfig({
  site: 'https://meridium.sg',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
