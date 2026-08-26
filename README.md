# LEED Digital

Site institucional em Astro, com saída estática completa para busca tradicional e respostas de IA. A única ilha React é o formulário de contato.

## Rotas

- `/` e `/contact/`
- `/sobre/` e `/como-trabalhamos/`
- `/servicos/desenvolvimento-de-sistemas/`
- `/servicos/agentes-de-ia/`
- `/servicos/integracoes-e-dados/`
- `/casos/`
- `/insights/`; os três artigos iniciais existem somente no modo local de revisão

Os três insights permanecem `draft: true`: o build padrão não gera seus arquivos ou rotas e não os referencia em páginas, sitemap, RSS ou `llms.txt`. Casos não validados permanecem em `src/content/cases/` com `draft: true` e não geram rota pública.

### Revisão local de drafts

O opt-in exato `INCLUDE_DRAFTS=true` habilita um build isolado para revisão:

```bash
npm run build:review
INCLUDE_DRAFTS=true npm run preview
```

O resultado fica em `dist-review/`. Os artigos draft mantêm `noindex, nofollow`, status de revisão e nota editorial visível. Não publicar nem fazer deploy de `dist-review`; esse artefato existe somente para revisão local. Qualquer valor diferente da string exata `true` mantém os drafts excluídos.

## Comandos

```bash
npm ci
npm run check
npm run lint
npm run build
npm test
npm run preview
```

`npm test` verifica o formulário com `fetch` simulado (sem chamada ao Formspree), collections, HTML estático, metadata, links, JSON-LD, arquivos de discovery, rotas do preview, 404 real e os contratos separados dos builds padrão e de revisão.

## Estrutura

- `astro.config.mjs`: output estático, domínio canônico, trailing slash e sitemap.
- `src/layouts/` e `src/components/`: layouts, navegação, rodapé, metadata, JSON-LD e CTA reutilizáveis.
- `src/content/`: collections de insights e casos.
- `src/pages/`: rotas estáticas, RSS e `llms.txt`.
- `tests/`: checks unitários, de build e de servidor local.
- `docs/`: fundação editorial, prompts, medição, inventário e bloqueios.

## Publicação

O repositório documenta Cloudflare Pages com auto-deploy a partir de `main`. Esta branch é apenas local: push, PR, merge e deploy não fazem parte desta execução. Revise textos, schemas e diff antes de autorizar qualquer publicação.
