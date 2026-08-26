import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import test from 'node:test'

const port = 43219
const origin = `http://127.0.0.1:${port}`
const draftRoutes = [
  '/insights/quando-uma-empresa-precisa-de-um-sistema-proprio/',
  '/insights/automacao-agente-de-ia-e-sistema-operacional/',
  '/insights/processos-adequados-para-agentes-de-ia/',
]
const routes = [
  '/', '/contact/', '/sobre/', '/como-trabalhamos/',
  '/servicos/desenvolvimento-de-sistemas/', '/servicos/agentes-de-ia/',
  '/servicos/integracoes-e-dados/', '/casos/', '/insights/',
  '/robots.txt', '/sitemap-index.xml', '/insights/rss.xml', '/llms.txt',
]

async function waitForServer(child) {
  let output = ''
  child.stdout.on('data', (chunk) => { output += chunk })
  child.stderr.on('data', (chunk) => { output += chunk })

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`preview encerrou antes de iniciar:\n${output}`)
    try {
      const response = await fetch(`${origin}/`)
      if (response.ok) return
    } catch {
      // Preview ainda não aceitou conexões; a próxima tentativa verifica novamente.
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`preview não iniciou:\n${output}`)
}

test('preview local serve todas as rotas e retorna 404 real', { timeout: 20_000 }, async () => {
  const child = spawn(process.execPath, ['./node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: new URL('..', import.meta.url),
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  try {
    await waitForServer(child)
    for (const route of routes) {
      const response = await fetch(`${origin}${route}`, { redirect: 'manual' })
      assert.equal(response.status, 200, `${route} retornou ${response.status}`)
    }

    for (const route of draftRoutes) {
      const response = await fetch(`${origin}${route}`, { redirect: 'manual' })
      assert.equal(response.status, 404, `${route} draft retornou ${response.status} no preview padrão`)
    }

    const redirect = await fetch(`${origin}/contact`, { redirect: 'manual' })
    assert.notEqual(redirect.status, 200, '/contact sem barra não pode criar uma URL duplicada com status 200')
    if ([301, 302, 307, 308].includes(redirect.status)) {
      assert.equal(new URL(redirect.headers.get('location'), origin).pathname, '/contact/')
    } else {
      assert.equal(redirect.status, 404, `/contact retornou ${redirect.status}`)
    }

    const missing = await fetch(`${origin}/rota-que-nao-existe/`, { redirect: 'manual' })
    assert.equal(missing.status, 404)
    assert.match(await missing.text(), /Página não encontrada|404/i)
  } finally {
    if (child.exitCode === null) {
      const exited = new Promise((resolve) => child.once('exit', resolve))
      child.kill('SIGTERM')
      await exited
    }
  }
})
