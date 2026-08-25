import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const failures = []

function read(relativePath) {
  const absolutePath = resolve(root, relativePath)
  if (!existsSync(absolutePath)) {
    failures.push(`Arquivo ausente: ${relativePath}`)
    return ''
  }
  return readFileSync(absolutePath, 'utf8')
}

function check(condition, message) {
  if (!condition) failures.push(message)
}

function count(content, pattern) {
  return [...content.matchAll(pattern)].length
}

function checkPageMetadata(content, pageName, canonical) {
  check(count(content, /<title>/g) === 1, `${pageName}: deve existir exatamente um title`)
  check(
    count(content, /<meta\s+name="description"/g) === 1,
    `${pageName}: deve existir exatamente uma meta description`,
  )
  check(
    content.includes(`<link rel="canonical" href="${canonical}"`),
    `${pageName}: canonical incorreto ou ausente`,
  )
  check(content.includes('property="og:title"'), `${pageName}: og:title ausente`)
  check(content.includes('property="og:description"'), `${pageName}: og:description ausente`)
  check(content.includes(`property="og:url" content="${canonical}"`), `${pageName}: og:url incorreto`)
}

function checkHashLinks(content, pageName) {
  const ids = new Set([...content.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))
  for (const match of content.matchAll(/href="#([^"]+)"/g)) {
    check(ids.has(match[1]), `${pageName}: âncora #${match[1]} não possui destino`)
  }
}

const home = read('index.html')
const contactDocument = read('contact/index.html')
const contactComponent = read('src/pages/ContactPage.tsx')
const redirects = read('public/_redirects')
const robots = read('public/robots.txt')
const sitemap = read('public/sitemap.xml')
const headers = read('public/_headers')
const builtHome = read('dist/index.html')
const builtContact = read('dist/contact/index.html')

checkPageMetadata(home, 'Home', 'https://leed.digital/')
checkPageMetadata(contactDocument, 'Contato', 'https://leed.digital/contact/')
checkPageMetadata(builtHome, 'Home compilada', 'https://leed.digital/')
checkPageMetadata(builtContact, 'Contato compilado', 'https://leed.digital/contact/')

check(count(home, /<h1\b/g) === 1, 'Home: deve existir exatamente um h1')
check(count(contactComponent, /<h1\b/g) === 1, 'Contato: deve existir exatamente um h1')
checkHashLinks(home, 'Home')
check(home.includes('href="/contact/"'), 'Home: CTA para /contact/ ausente')
for (const location of ['header', 'hero', 'footer']) {
  check(home.includes(`data-contact-cta="${location}"`), `Home: CTA de contato ausente em ${location}`)
}
check(home.includes('event: "contact_cta_click"'), 'Home: evento de clique dos CTAs ausente')
check(contactComponent.includes('href="/"'), 'Contato: retorno para a Home ausente')

for (const field of ['name', 'email', 'message']) {
  const requiredField = new RegExp(`name="${field}"[\\s\\S]{0,220}?required`)
  check(requiredField.test(contactComponent), `Contato: campo obrigatório ${field} ausente`)
}

check(contactComponent.includes("type SubmitState = 'idle' | 'sending' | 'success' | 'error'"), 'Contato: estados do formulário incompletos')
check(contactComponent.includes('aria-busy='), 'Contato: formulário não comunica estado de envio')
check(contactComponent.includes('className="contact-skip-link"'), 'Contato: skip link ausente')
check(!contactDocument.includes('/favicon.svg'), 'Contato: referência quebrada ao favicon permanece')

check(redirects.includes('/contact   /contact/   301'), 'Redirect: /contact deve apontar para /contact/ com 301')
check(!/\/\*\s+\/index\.html\s+200/.test(redirects), 'Redirect: fallback global 200 cria soft 404')
check(robots.includes('Sitemap: https://leed.digital/sitemap.xml'), 'robots.txt: referência ao sitemap ausente')
check(sitemap.includes('<loc>https://leed.digital/</loc>'), 'sitemap.xml: Home ausente')
check(sitemap.includes('<loc>https://leed.digital/contact/</loc>'), 'sitemap.xml: Contato ausente')

for (const header of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) {
  check(headers.includes(header), `_headers: ${header} ausente`)
}

for (const output of ['dist/404.html', 'dist/robots.txt', 'dist/sitemap.xml', 'dist/_headers', 'dist/_redirects']) {
  check(existsSync(resolve(root, output)), `Build: ${output} ausente`)
}

if (failures.length > 0) {
  console.error(`Verificação falhou com ${failures.length} problema(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Verificação do site concluída sem falhas.')
