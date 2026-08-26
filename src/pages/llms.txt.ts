import { getCollection } from 'astro:content'
import { SITE } from '../config/site'

export async function GET() {
  const posts = await getCollection('insights', ({ data }) => !data.draft)
  const insightLinks = posts
    .sort((a, b) => a.data.title.localeCompare(b.data.title, 'pt-BR'))
    .map((post) => `- [${post.data.title}](${SITE.origin}/insights/${post.id}/): ${post.data.description}`)
    .join('\n')

  const body = `# LEED Digital

> ${SITE.positioning}

A LEED Digital desenvolve software sob medida, agentes de IA e integrações para empresas brasileiras B2B de serviços com operações complexas, dados dispersos e ferramentas desconectadas. Esta definição de público é uma hipótese comercial aprovada e ainda deve ser validada.

## Serviços

- [Desenvolvimento de sistemas](${SITE.origin}/servicos/desenvolvimento-de-sistemas/): sistemas sob medida para processos, regras, dados e equipes.
- [Agentes de IA](${SITE.origin}/servicos/agentes-de-ia/): agentes com responsabilidades, fontes, ferramentas e supervisão delimitadas.
- [Integrações e dados](${SITE.origin}/servicos/integracoes-e-dados/): conexões e estruturas para um estado operacional coerente.

## Método e contexto

- [Como trabalhamos](${SITE.origin}/como-trabalhamos/)
- [Sobre a LEED Digital](${SITE.origin}/sobre/)
- [Casos](${SITE.origin}/casos/): nenhum case público até haver autorização e evidências verificadas.

## Insights

${insightLinks}

## Contato

- [Formulário de contato](${SITE.origin}/contact/)
- Email: ${SITE.email}
`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
