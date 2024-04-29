import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  build: {
    assetsPrefix: process.env.ASSETS_PREFIX
  },
  integrations: [starlight({
    title: 'Homedocs',
    logo: {
      src: './src/icon.svg',
      replacesTitle: true
    },
    customCss: ['./src/styles/custom.css']
  }), relativeLinks()]
});