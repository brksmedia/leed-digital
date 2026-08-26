import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const dist = resolve(import.meta.dirname, '..', 'dist-review')
const draftSlugs = [
  'quando-uma-empresa-precisa-de-um-sistema-proprio',
  'automacao-agente-de-ia-e-sistema-operacional',
  'processos-adequados-para-agentes-de-ia',
]

test('modo explícito de revisão gera drafts sempre protegidos de indexação', () => {
  for (const slug of draftSlugs) {
    const path = join(dist, 'insights', slug, 'index.html')
    assert.ok(existsSync(path), `${slug} ausente no build explícito de revisão`)
    const html = readFileSync(path, 'utf8')
    assert.match(html, /name=["']robots["'][^>]+content=["']noindex, nofollow["']/i, `${slug} deve ser noindex`)
    assert.match(html, /Nota editorial:/i, `${slug} deve exibir nota editorial`)
    assert.match(html, /Status: revisão editorial/i, `${slug} deve identificar o status de revisão`)
    assert.doesNotMatch(html, /revisão por Lucas/i, `${slug} não pode expor identificador interno`)
    assert.doesNotMatch(html, /Publicado em/i, `${slug} não pode afirmar publicação`)
  }
})