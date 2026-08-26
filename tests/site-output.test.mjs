import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const site = 'https://leed.digital'
const draftSlugs = [
  'quando-uma-empresa-precisa-de-um-sistema-proprio',
  'automacao-agente-de-ia-e-sistema-operacional',
  'processos-adequados-para-agentes-de-ia',
]

const routes = [
  { path: '/', file: 'index.html', types: ['Organization', 'WebSite'] },
  { path: '/contact/', file: 'contact/index.html', types: ['BreadcrumbList'] },
  { path: '/sobre/', file: 'sobre/index.html', types: ['BreadcrumbList'] },
  { path: '/como-trabalhamos/', file: 'como-trabalhamos/index.html', types: ['BreadcrumbList'] },
  { path: '/servicos/desenvolvimento-de-sistemas/', file: 'servicos/desenvolvimento-de-sistemas/index.html', types: ['Service', 'BreadcrumbList'] },
  { path: '/servicos/agentes-de-ia/', file: 'servicos/agentes-de-ia/index.html', types: ['Service', 'BreadcrumbList'] },
  { path: '/servicos/integracoes-e-dados/', file: 'servicos/integracoes-e-dados/index.html', types: ['Service', 'BreadcrumbList'] },
  { path: '/casos/', file: 'casos/index.html', types: ['BreadcrumbList'] },
  { path: '/insights/', file: 'insights/index.html', types: ['BreadcrumbList'] },
]

function htmlFor(route) {
  const path = join(dist, route.file)
  assert.ok(existsSync(path), `arquivo ausente para ${route.path}: ${route.file}`)
  return readFileSync(path, 'utf8')
}

function matchOne(html, expression, label) {
  const matches = [...html.matchAll(expression)]
  assert.equal(matches.length, 1, `${label}: esperado exatamente 1, encontrado ${matches.length}`)
  return matches[0]
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((value) => value['@graph'] ?? [value])
}

test('todas as rotas geram HTML estático completo com metadata canônica', () => {
  for (const route of routes) {
    const html = htmlFor(route)
    assert.match(html, /^<!doctype html>/i, `${route.path} sem doctype`)
    assert.match(html, /<html[^>]+lang=["']pt-BR["']/i, `${route.path} sem lang pt-BR`)
    assert.doesNotMatch(html, /<div[^>]+id=["']root["'][^>]*><\/div>/i, `${route.path} depende de shell vazio`)

    const title = matchOne(html, /<title>([^<]+)<\/title>/gi, `${route.path} title`)[1].trim()
    const h1 = matchOne(html, /<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/gi, `${route.path} h1`)[1]
    const description = matchOne(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/gi, `${route.path} description`)[1]
    const canonical = matchOne(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/gi, `${route.path} canonical`)[1]

    assert.ok(title.length >= 12, `${route.path} title curto`)
    assert.ok(h1.replace(/<[^>]+>/g, '').trim().length >= 8, `${route.path} h1 vazio`)
    assert.ok(description.length >= 70, `${route.path} description curta`)
    assert.equal(canonical, `${site}${route.path}`)
    assert.match(html, /property=["']og:title["']/i, `${route.path} sem Open Graph`)
    assert.match(html, /name=["']twitter:card["']/i, `${route.path} sem Twitter card`)
  }
})

test('tracking legado fica restrito às rotas já mensuradas e o formulário informa o processador', () => {
  for (const route of routes) {
    const html = htmlFor(route)
    if (route.path === '/' || route.path === '/contact/') {
      assert.match(html, /GTM-NP9RS6FC/, `${route.path} perdeu o GTM legado`)
      assert.match(html, /AW-16851840618/, `${route.path} perdeu o Google Ads legado`)
    } else {
      assert.doesNotMatch(html, /googletagmanager\.com|GTM-NP9RS6FC|AW-16851840618/, `${route.path} expandiu tracking sem decisão de consentimento`)
    }
  }

  const contactHtml = htmlFor(routes.find((route) => route.path === '/contact/'))
  assert.match(contactHtml, /processados pelo Formspree/i)
  assert.match(contactHtml, /window\.gtag\s*=\s*function\b/i, 'gtag precisa estar disponível para a ilha React')
  assert.match(contactHtml, /<form\b[^>]*\bmethod=["']post["']/i, 'formulário sem fallback POST')
  assert.match(contactHtml, /<form\b[^>]*\baction=["']https:\/\/formspree\.io\/f\/mwvwaypr["']/i, 'formulário sem action segura')
})

test('build padrão não gera nem referencia rotas de insights draft', () => {
  const publicArtifacts = [
    ...routes.map((route) => readFileSync(join(dist, route.file), 'utf8')),
    readFileSync(join(dist, 'sitemap-0.xml'), 'utf8'),
    readFileSync(join(dist, 'insights/rss.xml'), 'utf8'),
    readFileSync(join(dist, 'llms.txt'), 'utf8'),
  ].join('\n')

  for (const slug of draftSlugs) {
    assert.ok(!existsSync(join(dist, 'insights', slug, 'index.html')), `${slug} não pode gerar rota no build padrão`)
    assert.doesNotMatch(publicArtifacts, new RegExp(`/insights/${slug}/`), `${slug} não pode ser referenciado pelo build padrão`)
  }
})

test('JSON-LD é válido e usa somente tipos aplicáveis com semântica básica', () => {
  for (const route of routes) {
    const blocks = jsonLdBlocks(htmlFor(route))
    const types = blocks.map((block) => block['@type'])
    for (const type of route.types) assert.ok(types.includes(type), `${route.path} sem ${type}`)

    for (const block of blocks) {
      assert.equal(block['@context'], 'https://schema.org', `${route.path}: @context inválido`)
      assert.ok(block['@type'], `${route.path}: @type ausente`)
      if (block['@type'] === 'Organization') {
        assert.equal(block.name, 'LEED Digital')
        assert.equal(block.url, `${site}/`)
        for (const invented of ['address', 'foundingDate', 'numberOfEmployees', 'aggregateRating']) {
          assert.equal(block[invented], undefined, `Organization não pode inventar ${invented}`)
        }
      }
      if (block['@type'] === 'Service') {
        assert.equal(block.provider?.name, 'LEED Digital')
        assert.ok(block.name && block.description && block.url)
      }
      if (block['@type'] === 'Article') {
        assert.equal(block.author?.name, 'LEED Digital')
        assert.equal(block.publisher?.name, 'LEED Digital')
        assert.ok(block.headline && block.description && block.dateCreated)
        assert.equal(block.datePublished, undefined, `${route.path}: draft não pode declarar datePublished`)
      }
      if (block['@type'] === 'BreadcrumbList') {
        assert.ok(Array.isArray(block.itemListElement) && block.itemListElement.length >= 2)
        const breadcrumbUrls = block.itemListElement.map((item) => item.item)
        assert.equal(new Set(breadcrumbUrls).size, breadcrumbUrls.length, `${route.path}: breadcrumb repete URL`)
        assert.equal(breadcrumbUrls.at(-1), `${site}${route.path}`, `${route.path}: último breadcrumb não é a página atual`)
      }
    }
  }
})

test('links internos resolvem, usam minúsculas e barra final', () => {
  const available = new Set(routes.map((route) => route.path))
  available.add('/404.html')
  for (const route of routes) {
    const html = htmlFor(route)
    for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)) {
      const href = match[1]
      if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue
      const pathname = new URL(href, site).pathname
      assert.equal(pathname, pathname.toLowerCase(), `${route.path}: link não minúsculo ${href}`)
      assert.ok(pathname === '/' || pathname.endsWith('/') || pathname.includes('.'), `${route.path}: link sem barra final ${href}`)
      assert.ok(available.has(pathname), `${route.path}: link interno quebrado ${href}`)
    }
  }
})

test('navegação compartilhada marca a rota ativa e mantém fallback móvel nas nove páginas', () => {
  for (const route of routes) {
    const html = htmlFor(route)
    assert.match(html, /<header\b[^>]*class=["'][^"']*site-header/)
    assert.match(html, /<details\b[^>]*class=["'][^"']*site-menu/)
    assert.match(html, /<summary\b[^>]*aria-controls=["']site-navigation["'][^>]*aria-expanded=["']false["']/)

    const escaped = route.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const currentLinks = [...html.matchAll(new RegExp(`<a\\b[^>]*href=["']${escaped}["'][^>]*aria-current=["']page["']`, 'g'))]
    assert.ok(currentLinks.length >= 1, `${route.path} sem indicação de rota ativa`)
  }
})

test('rodapé funciona como mapa completo em todas as páginas', () => {
  const expectedLinks = [
    '/',
    '/servicos/desenvolvimento-de-sistemas/',
    '/servicos/agentes-de-ia/',
    '/servicos/integracoes-e-dados/',
    '/sobre/',
    '/como-trabalhamos/',
    '/casos/',
    '/insights/',
    '/contact/',
  ]

  for (const route of routes) {
    const html = htmlFor(route)
    const footer = matchOne(html, /<footer\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>([\s\S]*?)<\/footer>/gi, `${route.path} rodapé`)[1]
    for (const href of expectedLinks) {
      const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      assert.match(footer, new RegExp(`href=["']${escaped}["']`), `${route.path}: rodapé sem ${href}`)
    }
    assert.match(footer, />Soluções</)
    assert.match(footer, />Empresa</)
    assert.match(footer, />Conteúdo e contato</)
    assert.match(footer, /mailto:info@leed\.digital/)
  }
})

test('conteúdo público remove claims sem suporte e usa a marca canônica', () => {
  const publicHtml = routes.map(htmlFor).join('\n')
  for (const claim of ['98,4%', '98.4%', '>94%<', '−31%', '-31%', '>18<', 'um dia útil', '24 horas', 'LEED Ponto Digital']) {
    assert.ok(!publicHtml.includes(claim), `claim pública proibida encontrada: ${claim}`)
  }
  assert.match(publicHtml, /LEED Digital/)
  assert.match(publicHtml, /desenvolvimento de sistemas e agentes de IA para operações empresariais/i)
  assert.doesNotMatch(publicHtml, /afiliad|infoprodut|clickbank|taboola/i)
})

test('artefatos de discovery e hosting existem no build', () => {
  const required = ['404.html', '_headers', '_redirects', 'robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'insights/rss.xml', 'llms.txt']
  for (const file of required) assert.ok(existsSync(join(dist, file)), `artefato ausente: ${file}`)

  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8')
  assert.match(robots, /User-agent: \*/)
  assert.match(robots, /Allow: \//)
  assert.match(robots, /Sitemap: https:\/\/leed\.digital\/sitemap-index\.xml/)

  const redirects = readFileSync(join(dist, '_redirects'), 'utf8')
  assert.match(redirects, /^\/contact\s+\/contact\/\s+301$/m)

  const rss = readFileSync(join(dist, 'insights/rss.xml'), 'utf8')
  assert.match(rss, /<rss\b/)
  assert.equal((rss.match(/<item>/g) ?? []).length, 0)

  const llms = readFileSync(join(dist, 'llms.txt'), 'utf8')
  assert.match(llms, /^# LEED Digital/m)
  assert.match(llms, /https:\/\/leed\.digital\/servicos\/agentes-de-ia\//)
  assert.doesNotMatch(llms, /\/insights\/(?:quando|automacao|processos)-/)
  assert.doesNotMatch(llms, /\b(?:hipótese|aprovada|validada)\b/i)

  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8')
  assert.doesNotMatch(sitemap, /\/insights\/(?:quando|automacao|processos)-/)
})

test('nenhum case draft gera rota pública', () => {
  const caseRoot = join(dist, 'casos')
  const nestedHtml = readdirSync(caseRoot, { recursive: true })
    .filter((entry) => entry !== 'index.html')
    .filter((entry) => statSync(join(caseRoot, entry)).isFile() && entry.endsWith('.html'))
  assert.deepEqual(nestedHtml, [])
})
