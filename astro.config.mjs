import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { readFileSync, readdirSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { insightIdFromEntry, insightUrlFromId } from './src/lib/insight-id.ts'

const insightsRoot = new URL('./src/content/insights', import.meta.url)
const insightsRootPath = fileURLToPath(insightsRoot)
const allInsightEntries = readdirSync(insightsRoot, { recursive: true, withFileTypes: true })
if (allInsightEntries.some((entry) => entry.isSymbolicLink())) {
  throw new Error('Links simbólicos não são permitidos em src/content/insights')
}
const insightEntries = allInsightEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => {
    const filePath = resolve(entry.parentPath, entry.name)
    const id = insightIdFromEntry(relative(insightsRootPath, filePath))
    const source = readFileSync(filePath, 'utf8')
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? ''
    return {
      id,
      draft: parse(frontmatter).draft === true,
    }
  })
const draftInsightPaths = new Set(
  insightEntries.filter(({ draft }) => draft).map(({ id }) => insightUrlFromId(id)),
)

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
      filter: (page) => !draftInsightPaths.has(page),
    }),
  ],
})
