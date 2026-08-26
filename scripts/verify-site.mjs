import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const reviewDist = new URL('../dist-review', import.meta.url)
const publishedDist = new URL('../dist-published-fixture', import.meta.url)
const publishedFixture = new URL('../src/content/insights/fixture-tecnica-publicacao.md', import.meta.url)
const draftFixtureDir = new URL('../src/content/insights/fixture-review-nested/', import.meta.url)
const draftFixture = new URL('./draft-inline-comment.md', draftFixtureDir)
const invalidFixture = new URL('../src/content/insights/invalid%23name.md', import.meta.url)
const invalidSymlinkFixture = new URL('../src/content/insights/invalid%23link.md', import.meta.url)
const symlinkTarget = new URL('../src/content/insights/automacao-agente-de-ia-e-sistema-operacional.md', import.meta.url)
const draftFixtureContent = `---
title: Fixture técnica de revisão editorial
description: Conteúdo técnico temporário usado exclusivamente para verificar a proteção de drafts no sitemap.
publishedAt: 2026-01-14
status: review
draft: true # comentário YAML válido para reproduzir o caso-limite
topics:
  - fixture
  - revisão
---

Este arquivo existe somente durante a suíte automatizada e nunca integra o conteúdo de produção.
`
const publishedFixtureContent = `---
title: Fixture técnica de publicação editorial
description: Conteúdo técnico temporário usado exclusivamente para verificar o fluxo futuro de publicação do site.
publishedAt: 2026-01-15
status: published
draft: false
topics:
  - fixture
  - publicação
---

Este arquivo existe somente durante a suíte automatizada e nunca integra o conteúdo de produção.
`
let publishedFixtureCreated = false
let publishedDistOwned = false
let draftFixtureOwned = false
let invalidFixtureCreated = false
let invalidSymlinkCreated = false

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, { cwd: root, env, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} encerrou com status ${result.status ?? 1}`)
}

function runExpectFailure(command, args, expected, env = process.env) {
  const result = spawnSync(command, args, { cwd: root, env, encoding: 'utf8' })
  if (result.error) throw result.error
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  if (result.status === 0) throw new Error(`${command} ${args.join(' ')} deveria falhar`)
  if (!output.includes(expected)) throw new Error(`falha não contém mensagem esperada: ${expected}`)
}

const defaultBuildEnv = { ...process.env }
delete defaultBuildEnv.INCLUDE_DRAFTS

try {
  run(process.execPath, ['--test', 'tests/contact-form.test.mjs', 'tests/content-source.test.mjs', 'tests/insight-id.test.mjs'])
  if (existsSync(invalidFixture)) throw new Error('fixture inválida já existe; cleanup recusado')
  writeFileSync(invalidFixture, draftFixtureContent, { flag: 'wx' })
  invalidFixtureCreated = true
  runExpectFailure(
    process.execPath,
    ['./node_modules/astro/bin/astro.mjs', 'build'],
    'Nome de insight inválido',
    defaultBuildEnv,
  )
  rmSync(invalidFixture, { force: true })
  invalidFixtureCreated = false
  if (existsSync(invalidSymlinkFixture)) throw new Error('fixture de symlink já existe; cleanup recusado')
  symlinkSync(symlinkTarget, invalidSymlinkFixture)
  invalidSymlinkCreated = true
  runExpectFailure(
    process.execPath,
    ['./node_modules/astro/bin/astro.mjs', 'build'],
    'Links simbólicos não são permitidos',
    defaultBuildEnv,
  )
  rmSync(invalidSymlinkFixture, { force: true })
  invalidSymlinkCreated = false
  run(process.execPath, ['./node_modules/astro/bin/astro.mjs', 'build'], defaultBuildEnv)
  run(process.execPath, ['--test', 'tests/site-output.test.mjs', 'tests/server.test.mjs'], defaultBuildEnv)

  if (existsSync(draftFixtureDir)) throw new Error('fixture temporária de draft já existe; cleanup recusado')
  mkdirSync(draftFixtureDir)
  draftFixtureOwned = true
  writeFileSync(draftFixture, draftFixtureContent, { flag: 'wx' })
  rmSync(reviewDist, { recursive: true, force: true })
  run(
    process.execPath,
    ['./node_modules/astro/bin/astro.mjs', 'build'],
    { ...process.env, INCLUDE_DRAFTS: 'true' },
  )
  run(process.execPath, ['--test', 'tests/draft-review-output.test.mjs'])

  if (existsSync(publishedFixture) || existsSync(publishedDist)) {
    throw new Error('fixture temporária de publicação já existe; cleanup recusado')
  }
  writeFileSync(publishedFixture, publishedFixtureContent, { flag: 'wx' })
  publishedFixtureCreated = true
  publishedDistOwned = true
  run(
    process.execPath,
    ['./node_modules/astro/bin/astro.mjs', 'build', '--outDir', 'dist-published-fixture', '--force'],
    defaultBuildEnv,
  )
  run(process.execPath, ['--test', 'tests/published-insight-output.test.mjs'], defaultBuildEnv)
} finally {
  rmSync(reviewDist, { recursive: true, force: true })
  if (invalidFixtureCreated) rmSync(invalidFixture, { force: true })
  if (invalidSymlinkCreated) rmSync(invalidSymlinkFixture, { force: true })
  if (publishedDistOwned) rmSync(publishedDist, { recursive: true, force: true })
  if (publishedFixtureCreated) rmSync(publishedFixture, { force: true })
  if (draftFixtureOwned) rmSync(draftFixtureDir, { recursive: true, force: true })
}

console.log('Verificação completa dos builds padrão e de revisão concluída sem falhas.')
