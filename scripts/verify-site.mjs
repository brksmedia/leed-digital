import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const reviewDist = new URL('../dist-review', import.meta.url)

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, { cwd: root, env, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} encerrou com status ${result.status ?? 1}`)
}

const defaultBuildEnv = { ...process.env }
delete defaultBuildEnv.INCLUDE_DRAFTS

try {
  run(process.execPath, ['--test', 'tests/contact-form.test.mjs', 'tests/content-source.test.mjs'])
  run(process.execPath, ['./node_modules/astro/bin/astro.mjs', 'build'], defaultBuildEnv)
  run(process.execPath, ['--test', 'tests/site-output.test.mjs', 'tests/server.test.mjs'], defaultBuildEnv)

  rmSync(reviewDist, { recursive: true, force: true })
  run(
    process.execPath,
    ['./node_modules/astro/bin/astro.mjs', 'build'],
    { ...process.env, INCLUDE_DRAFTS: 'true' },
  )
  run(process.execPath, ['--test', 'tests/draft-review-output.test.mjs'])
} finally {
  rmSync(reviewDist, { recursive: true, force: true })
}

console.log('Verificação completa dos builds padrão e de revisão concluída sem falhas.')
