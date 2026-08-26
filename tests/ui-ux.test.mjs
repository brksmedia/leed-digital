import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const source = (path) => readFileSync(resolve(root, path), 'utf8')

const requiredRoutes = [
  '/',
  '/sobre/',
  '/como-trabalhamos/',
  '/servicos/desenvolvimento-de-sistemas/',
  '/servicos/agentes-de-ia/',
  '/servicos/integracoes-e-dados/',
  '/casos/',
  '/insights/',
  '/contact/',
]

test('navegação compartilhada cobre as nove rotas e expõe menu móvel progressivo e acessível', () => {
  const nav = source('src/components/SiteNav.astro')
  const home = source('src/pages/index.astro')

  for (const route of requiredRoutes) {
    assert.ok(nav.includes(route), `navegação não cobre ${route}`)
  }
  assert.match(home, /<SiteNav\b/)
  assert.match(nav, /<details\b[^>]*class="site-menu"/)
  assert.match(nav, /<summary\b[^>]*aria-controls="site-navigation"[^>]*aria-expanded=/)
  assert.match(nav, /id="site-navigation"/)
  assert.match(nav, /aria-current=/)
  assert.match(nav, /keydown[\s\S]*Escape/)
  assert.match(nav, /event\.key === 'Enter'/)
  assert.match(nav, /event\.key === ' '/)
  assert.match(nav, /\.focus\(\)/)
  assert.match(nav, /addEventListener\(['"]toggle['"]/)
  assert.match(nav, /setAttribute\(['"]aria-expanded['"]/)
  assert.match(nav, /links\.forEach[\s\S]*addEventListener\(['"]click['"],\s*closeMenu\)/)
  assert.match(nav, /summary[\s\S]*queueMicrotask\(syncExpanded\)/)
  assert.match(nav, /removeAttribute\(['"]open['"]\)[\s\S]*syncExpanded\(\)/)
})

test('home mantém conteúdo reveal visível por padrão e possui recuperação quando observer não revela', () => {
  const home = source('src/pages/index.astro')

  assert.match(home, /Depois transformamos o\s*\{' '\}<span>processo/)
  assert.match(home, /\.reveal\s*\{[\s\S]*opacity:\s*1/)
  assert.match(home, /IntersectionObserver/)
  assert.match(home, /setTimeout\([\s\S]*classList\.remove\(['"]reveal-ready['"]\)/)
  assert.match(home, /<main id="top"[^>]*tabindex="-1"/)
  assert.doesNotMatch(home, /querySelector\(["']#clock["']\)/)
})

test('formulário preserva contrato e move foco para feedback de sucesso ou erro', () => {
  const form = source('src/components/ContactForm.tsx')

  assert.match(form, /useEffect/)
  assert.match(form, /useRef/)
  assert.match(form, /successRef\.current\?\.focus\(\)/)
  assert.match(form, /errorRef\.current\?\.focus\(\)/)
  assert.match(form, /<div[^>]*className="contact-form-result"[^>]*tabIndex=\{-1\}/)
  assert.match(form, /<p[^>]*className="contact-form-error"[^>]*tabIndex=\{-1\}/)
  assert.match(form, /aria-describedby=\{submitState === 'error' \? 'contact-form-note contact-form-error' : 'contact-form-note'\}/)
  assert.match(form, /id="contact-form-note"/)
  assert.match(form, /maxLength=\{1200\}/)
  assert.match(form, /name="_gotcha"/)
  assert.match(form, /action=\{FORM_ENDPOINT\}/)
})

test('formulário tem foco não cromático e preserva seletores legados essenciais', () => {
  const css = source('src/styles/contact.css')
  for (const selector of ['.contact-field', '.contact-submit', '.contact-form-result', '.contact-direct-link', '.contact-sidebar']) {
    assert.ok(css.includes(selector), `seletor legado removido: ${selector}`)
  }
  assert.match(css, /\.contact-field[^}]*:focus-visible[\s\S]*outline:/)
  assert.match(css, /\.contact-form-result:focus-visible/)
  assert.match(css, /\.contact-form-error:focus-visible/)
  assert.match(css, /box-shadow:/)
})

test('empty state de Insights ocupa a grade sem publicar drafts', () => {
  const insights = source('src/pages/insights/index.astro')
  const css = source('src/styles/global.css')

  assert.match(insights, /content-grid--empty/)
  assert.match(insights, /class="content-card content-card--empty"/)
  assert.match(css, /\.content-card--empty\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/)
  assert.match(insights, /!data\.draft/)
  assert.doesNotMatch(insights, /INCLUDE_DRAFTS/)
})

test('CTA preserva composição e associa texto ao título com foco e quebra responsiva', () => {
  const cta = source('src/components/PageCta.astro')
  const css = source('src/styles/global.css')

  assert.match(cta, /title = 'Qual parte da operação precisa funcionar melhor\?'/)
  assert.match(cta, /text = 'Conte o contexto\. A conversa começa pelo processo, pelas decisões e pelos dados que precisam se conectar\.'/)
  assert.match(cta, /aria-labelledby="page-cta-title"/)
  assert.match(cta, /aria-describedby="page-cta-description"/)
  assert.match(cta, /id="page-cta-description"/)
  assert.match(css, /\.button-link:focus-visible/)
  assert.match(css, /\.page-cta h2[^}]*overflow-wrap:/)
})

test('footer mantém grupos e oferece alvos móveis de pelo menos 44px', () => {
  const footer = source('src/components/SiteFooter.astro')

  assert.match(footer, /FOOTER_GROUPS/)
  assert.doesNotMatch(footer, />\s*(?:404|RSS|llms\.txt)\s*</i)
  assert.match(footer, /@media \(max-width: 620px\)[\s\S]*\.footer-group a\s*\{[^}]*min-height:\s*44px/)
  assert.match(footer, /\.footer-brand[^}]*min-height:\s*44px/)
})

test('foco global usa forma além de cor e layout evita overflow horizontal', () => {
  const css = source('src/styles/global.css')

  assert.match(css, /:focus-visible\s*\{[^}]*outline:[^}]*box-shadow:/)
  assert.match(css, /a:focus-visible\s*\{[^}]*text-decoration:/)
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*clip/)
})
