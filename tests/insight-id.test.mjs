import assert from 'node:assert/strict'
import test from 'node:test'
import { insightIdFromEntry, insightPathFromId, insightUrlFromId } from '../src/lib/insight-id.ts'

test('ID preserva slugs editoriais seguros e diretórios explícitos', () => {
  assert.equal(insightIdFromEntry('pasta/artigo-2026.md'), 'pasta/artigo-2026')
})

test('nomes ambíguos ou incompatíveis com URLs falham sem normalização silenciosa', () => {
  for (const entry of [
    'collision#.md',
    'collision?.md',
    'collision%.md',
    'Alpha Beta.md',
    'Alpha-Beta.md',
    'olá.md',
    'pasta\\artigo.md',
    '   /nested.md',
    'pasta//nested.md',
  ]) {
    assert.throws(() => insightIdFromEntry(entry), /Nome de insight inválido/)
  }
})

test('path e URL aceitam apenas IDs canônicos seguros', () => {
  assert.equal(insightPathFromId('pasta/artigo-2026'), '/insights/pasta/artigo-2026/')
  assert.equal(insightUrlFromId('pasta/artigo-2026'), 'https://leed.digital/insights/pasta/artigo-2026/')
  for (const id of ['pasta/olá', 'pasta/draft-#', '/nested', 'pasta//nested']) {
    assert.throws(() => insightPathFromId(id), /ID de insight inválido/)
  }
})
