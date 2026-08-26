import { spawnSync } from 'node:child_process'

const suites = [
  ['tests/contact-form.test.mjs', 'tests/content-source.test.mjs'],
  ['tests/site-output.test.mjs', 'tests/server.test.mjs'],
]

for (const files of suites) {
  const result = spawnSync(process.execPath, ['--test', ...files], {
    cwd: new URL('..', import.meta.url),
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log('Verificação completa do site Astro concluída sem falhas.')
