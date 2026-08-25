# LEED Digital

Site institucional da LEED, construído como projeto Vite multipágina.

## Rotas

- `/`: Home estática em `index.html`.
- `/contact/`: página React em `contact/index.html`, montada por `src/contact-main.tsx`.

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm test
```

`npm test` deve ser executado depois do build e verifica metadata, sitemap, redirects, arquivos públicos, links internos essenciais e requisitos estruturais do formulário.

## Estrutura relevante

- `index.html`: Home e seus estilos/scripts.
- `src/pages/ContactPage.tsx`: comportamento da página de contato.
- `src/pages/contact-page.css`: estilos exclusivos do contato.
- `public/robots.txt`: política de rastreamento.
- `public/sitemap.xml`: sitemap técnico.
- `public/_redirects`: redirects do Cloudflare Pages.
- `public/_headers`: headers básicos de segurança.
- `docs/site-foundation.md`: sitemap, especificação por página, critérios de aceite e pendências.

## Publicação

O Cloudflare Pages publica automaticamente a branch `main`. Não faça push para `main` nem altere configuração de produção sem aprovação explícita.
