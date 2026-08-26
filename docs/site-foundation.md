# Fundação de busca e respostas de IA — LEED Digital

Última revisão: 2026-08-26

Status: rascunho local para revisão de Lucas. Não houve push, PR, merge ou deploy nesta execução.

## Entidade e posicionamento

- Marca canônica: **LEED Digital**.
- Posicionamento: **desenvolvimento de sistemas e agentes de IA para operações empresariais**.
- ICP inicial, tratado como hipótese: empresas brasileiras de serviços B2B com 10–50 pessoas, operação dependente de processos complexos, dados dispersos e ferramentas desconectadas; compradores principais: fundador, CEO, COO ou liderança de operações.
- Afiliados, infoprodutores e mercados adjacentes estão excluídos do ICP e da prova pública.

## Arquitetura

Astro gera HTML estático completo. React é usado apenas no formulário de contato, onde existe interatividade real. URLs públicas são minúsculas e usam barra final. O sitemap é gerado por `@astrojs/sitemap`; RSS e `llms.txt` existem, mas excluem insights enquanto estiverem em revisão; `robots.txt` permanece permissivo. O build padrão também exclui os próprios arquivos e rotas dos insights com `draft: true`.

## Mapa público em revisão

- `/`
- `/contact/`
- `/sobre/`
- `/como-trabalhamos/`
- `/servicos/desenvolvimento-de-sistemas/`
- `/servicos/agentes-de-ia/`
- `/servicos/integracoes-e-dados/`
- `/casos/`
- `/insights/`
- três artigos sob `/insights/<slug>/`, disponíveis somente no build local de revisão

## Política de prova

Nenhum cliente, depoimento, preço, equipe, endereço, data de fundação, rating, métrica ou resultado foi inventado. O placeholder de caso em `src/content/cases/` tem `draft: true` e não gera URL. Os números sem fonte que apareciam na Home anterior foram removidos. Qualquer caso futuro depende de validação factual e autorização de Lucas.

## Dados estruturados

- Home: `Organization` e `WebSite`.
- Serviços: `Service` e `BreadcrumbList`.
- Insights: `Article` e `BreadcrumbList`.
- Demais páginas internas: `BreadcrumbList` quando aplicável.

O conteúdo do schema é derivado do conteúdo visível e não inclui fatos corporativos ainda não confirmados.

## Tracking preservado

- GTM: `GTM-NP9RS6FC`.
- Google Ads: `AW-16851840618`.
- Conversão do formulário: `AW-16851840618/F-r4CKe8lZgcEOrcyuM-`.
- GA4 detectado previamente no GTM: `G-5BTEY6ZLSE`.
- Formspree: `mwvwaypr`.

Nenhum serviço externo foi alterado e nenhum formulário real foi enviado nos testes.

As tags legadas permanecem em `/` e `/contact/`, onde já existiam. As novas rotas não carregam GTM ou Google Ads até haver uma decisão específica de consentimento e mensuração, evitando ampliar tracking por padrão. O formulário informa que o Formspree processa os dados enviados para entregar a mensagem.

## Revisão necessária

1. Revisar Home, Sobre, Como trabalhamos e páginas de serviços.
2. Revisar os três insights, hoje `draft: true`, `noindex` e fora de sitemap/RSS/`llms.txt`, e aprovar suas datas editoriais.
3. Confirmar a comunicação pública do ICP.
4. Validar fatos antes de criar qualquer caso público.
5. Confirmar dados legais antes de uma política de privacidade.
6. Confirmar contas/propriedades de Search Console, Bing e Cloudflare antes de ações externas.
7. Investigar possível duplicidade entre tags carregadas diretamente e o GTM antes de alterar mensuração.

## Verificação local

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm test
```

A suíte cobre metadata, um H1 por rota, canonical, `lang`, links internos, JSON-LD, artifacts de discovery, formulário com requisição simulada, crawl local e 404 real.

Para revisão explícita dos três drafts, `npm run build:review` define `INCLUDE_DRAFTS=true` e grava o resultado isolado em `dist-review/`. Essas páginas sempre incluem `noindex, nofollow` e nota editorial. Não publicar nem fazer deploy desse diretório. Sem o opt-in exato, drafts não geram arquivo ou rota.
