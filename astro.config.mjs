import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://leed.digital',
  output: 'static',
  outDir: process.env.INCLUDE_DRAFTS === 'true' ? './dist-review' : './dist',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.startsWith('https://leed.digital/insights/') || page === 'https://leed.digital/insights/',
    }),
  ],
})
