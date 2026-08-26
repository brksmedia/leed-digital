import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const contentRoot = join(root, 'src/content')

test('collections têm schema explícito para insights e cases', () => {
  const configPath = join(root, 'src/content.config.ts')
  assert.ok(existsSync(configPath), 'src/content.config.ts ausente')
  const config = readFileSync(configPath, 'utf8')
  assert.match(config, /defineCollection/)
  assert.match(config, /status/)
  assert.match(config, /draft/)
  assert.match(config, /insights/)
  assert.match(config, /cases/)
})

test('há três insights substantivos marcados para revisão', () => {
  const dir = join(contentRoot, 'insights')
  assert.ok(existsSync(dir), 'collection insights ausente')
  const files = readdirSync(dir).filter((file) => file.endsWith('.md'))
  assert.equal(files.length, 3)

  for (const file of files) {
    const markdown = readFileSync(join(dir, file), 'utf8')
    assert.match(markdown, /^status: review$/m, `${file} sem status review`)
    assert.match(markdown, /^draft: true$/m, `${file} deve permanecer draft até aprovação`)
    assert.match(markdown, /^publishedAt: \d{4}-\d{2}-\d{2}$/m, `${file} sem data`)
    const body = markdown.replace(/^---[\s\S]*?---/, '').trim()
    assert.ok(body.split(/\s+/).length >= 650, `${file} precisa ser substantivo`)
    assert.doesNotMatch(body, /como modelo de linguagem|revolucion|game.?changer|chatbot genérico/i)
  }
})

test('case placeholder não contém fatos e permanece draft', () => {
  const dir = join(contentRoot, 'cases')
  assert.ok(existsSync(dir), 'collection cases ausente')
  const files = readdirSync(dir).filter((file) => file.endsWith('.md'))
  assert.equal(files.length, 1)
  const markdown = readFileSync(join(dir, files[0]), 'utf8')
  assert.match(markdown, /^draft: true$/m)
  assert.match(markdown, /^status: placeholder$/m)
  assert.doesNotMatch(markdown, /client|cliente|resultado|%|R\$|econom|aument|reduz/i)
})

test('documentação de operação descreve Astro, revisão e publicação bloqueada', () => {
  const readRequired = (relativePath) => {
    const absolutePath = join(root, relativePath)
    assert.ok(existsSync(absolutePath), `${relativePath} ausente`)
    return readFileSync(absolutePath, 'utf8')
  }

  const readme = readRequired('README.md')
  assert.match(readme, /Astro/i)
  assert.match(readme, /npm run check/)
  assert.match(readme, /Cloudflare Pages/i)

  const foundation = readRequired('docs/site-foundation.md')
  assert.match(foundation, /LEED Digital/)
  assert.match(foundation, /rascunho|revisão/i)
  assert.match(foundation, /não (?:foi|houve) (?:feito )?(?:push|deploy)|push.*fora do escopo/i)
})
