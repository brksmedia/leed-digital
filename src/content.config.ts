import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { insightIdFromEntry } from './lib/insight-id'

const insightBaseSchema = z.object({
  title: z.string().min(20),
  description: z.string().min(70),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  topics: z.array(z.string()).min(2),
})

const insightSchema = z.discriminatedUnion('draft', [
  insightBaseSchema.extend({ status: z.literal('review'), draft: z.literal(true) }),
  insightBaseSchema.extend({ status: z.literal('published'), draft: z.literal(false) }),
])

const caseSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.literal('placeholder'),
  draft: z.literal(true),
})

const insights = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/insights',
    generateId: ({ entry }) => insightIdFromEntry(entry),
  }),
  schema: insightSchema,
})

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: caseSchema,
})

export const collections = { insights, cases }
