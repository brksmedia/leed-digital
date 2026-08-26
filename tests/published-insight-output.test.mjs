import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const dist = resolve(import.meta.dirname, '..', 'dist-published-fixture')
const fileSlug = 'fixture-tecnica-publicacao'
const urlSlug = 'fixture-tecnica-publicacao'
const title = 'Fixture técnica de publicação editorial'

test('insight publicado gera página indexável com metadata de publicação', () => {
  const articlePath = join(dist, 'insights', fileSlug, 'index.html')
  assert.ok(existsSync(articlePath), 'fixture publicada não gerou rota')
  const html = readFileSync(articlePath, 'utf8')

  assert.doesNotMatch(html, /name=["']robots["'][^>]+content=["'][^"']*(?:noindex|nofollow)/i)
  assert.doesNotMatch(html, /rascunho|revisão editorial|nota editorial|conteúdo em revisão/i)
  assert.match(html, /Publicado em 15\/01\/2026/i)

  const articleJsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((value) => value['@graph'] ?? [value])
    .find((value) => value['@type'] === 'Article')
  assert.ok(articleJsonLd, 'JSON-LD Article ausente')
  assert.equal(articleJsonLd.datePublished, '2026-01-15T00:00:00.000Z')
  assert.equal(articleJsonLd.headline, title)
  assert.equal(articleJsonLd.mainEntityOfPage, `https://leed.digital/insights/${urlSlug}/`)
  assert.match(html, new RegExp(`<link rel="canonical" href="https://leed\\.digital/insights/${urlSlug}/"`))
})

test('insight publicado aparece em listagem, sitemap, RSS e llms.txt', () => {
  const artifacts = {
    index: readFileSync(join(dist, 'insights', 'index.html'), 'utf8'),
    sitemap: readFileSync(join(dist, 'sitemap-0.xml'), 'utf8'),
    rss: readFileSync(join(dist, 'insights', 'rss.xml'), 'utf8'),
    llms: readFileSync(join(dist, 'llms.txt'), 'utf8'),
  }

  for (const [name, content] of Object.entries(artifacts)) {
    assert.match(content, new RegExp(`/insights/${urlSlug}/`), `${name} não referencia a publicação`)
  }
  assert.match(artifacts.index, new RegExp(title))
  assert.match(artifacts.rss, /<item>/)
})