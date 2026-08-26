# LEED Digital

Site institucional em Astro, com saída estática completa para busca tradicional e respostas de IA. A única ilha React é o formulário de contato.

## Rotas

- `/` e `/contact/`
- `/sobre/` e `/como-trabalhamos/`
- `/servicos/desenvolvimento-de-sistemas/`
- `/servicos/agentes-de-ia/`
- `/servicos/integracoes-e-dados/`
- `/casos/`
- `/insights/` e três artigos iniciais

Os três insights permanecem `draft: true`: geram HTML local com `noindex`, mas ficam fora do índice, sitemap, RSS e `llms.txt` até aprovação. Casos não validados permanecem em `src/content/cases/` com `draft: true` e não geram rota pública.

## Comandos

```bash
npm ci
npm run check
npm run lint
npm run build
npm test
npm run preview
```

`npm test` verifica o formulário com `fetch` simulado (sem chamada ao Formspree), collections, HTML estático, metadata, links, JSON-LD, arquivos de discovery, rotas do preview e 404 real.

## Estrutura

- `astro.config.mjs`: output estático, domínio canônico, trailing slash e sitemap.
- `src/layouts/` e `src/components/`: layouts, navegação, rodapé, metadata, JSON-LD e CTA reutilizáveis.
- `src/content/`: collections de insights e casos.
- `src/pages/`: rotas estáticas, RSS e `llms.txt`.
- `tests/`: checks unitários, de build e de servidor local.
- `docs/`: fundação editorial, prompts, medição, inventário e bloqueios.

## Publicação

O repositório documenta Cloudflare Pages com auto-deploy a partir de `main`. Esta branch é apenas local: push, PR, merge e deploy não fazem parte desta execução. Revise textos, schemas e diff antes de autorizar qualquer publicação.
