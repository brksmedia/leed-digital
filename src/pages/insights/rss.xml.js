import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { insightPathFromId } from '../../lib/insight-id'

export async function GET(context) {
  const posts = (await getCollection('insights', ({ data }) => !data.draft)).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())

  return rss({
    title: 'Insights | LEED Digital',
    description: 'Análises sobre sistemas, agentes de IA e operações empresariais.',
    site: context.site,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: insightPathFromId(post.id),
    })),
  })
}
