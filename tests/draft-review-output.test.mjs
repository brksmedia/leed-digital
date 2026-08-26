import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const dist = resolve(import.meta.dirname, '..', 'dist-review')
const draftRoutes = [
  { fileSlug: 'quando-uma-empresa-precisa-de-um-sistema-proprio', urlSlug: 'quando-uma-empresa-precisa-de-um-sistema-proprio' },
  { fileSlug: 'automacao-agente-de-ia-e-sistema-operacional', urlSlug: 'automacao-agente-de-ia-e-sistema-operacional' },
  { fileSlug: 'processos-adequados-para-agentes-de-ia', urlSlug: 'processos-adequados-para-agentes-de-ia' },
  { fileSlug: 'fixture-review-nested/draft-inline-comment', urlSlug: 'fixture-review-nested/draft-inline-comment' },
]

test('modo explícito de revisão gera drafts sempre protegidos de indexação', () => {
  for (const { fileSlug } of draftRoutes) {
    const path = join(dist, 'insights', fileSlug, 'index.html')
    assert.ok(existsSync(path), `${fileSlug} ausente no build explícito de revisão`)
    const html = readFileSync(path, 'utf8')
    assert.match(html, /name=["']robots["'][^>]+content=["']noindex, nofollow["']/i, `${fileSlug} deve ser noindex`)
    assert.match(html, /Nota editorial:/i, `${fileSlug} deve exibir nota editorial`)
    assert.match(html, /Status: revisão editorial/i, `${fileSlug} deve identificar o status de revisão`)
    assert.doesNotMatch(html, /revisão por Lucas/i, `${fileSlug} não pode expor identificador interno`)
    assert.doesNotMatch(html, /Publicado em/i, `${fileSlug} não pode afirmar publicação`)
  }
})

test('modo de revisão não promove drafts nos canais públicos', () => {
  const publicArtifacts = [
    readFileSync(join(dist, 'insights', 'index.html'), 'utf8'),
    readFileSync(join(dist, 'sitemap-0.xml'), 'utf8'),
    readFileSync(join(dist, 'insights', 'rss.xml'), 'utf8'),
    readFileSync(join(dist, 'llms.txt'), 'utf8'),
  ].join('\n')

  for (const { urlSlug } of draftRoutes) {
    assert.doesNotMatch(publicArtifacts, new RegExp(`/insights/${urlSlug}/`), `${urlSlug} não pode ser promovido no build de revisão`)
  }
})