# Comparação visual e de entrega

Data: 2026-08-26. Comparação local; nenhuma publicação foi realizada.

## Screenshots

| Ambiente | Desktop | Mobile |
|---|---|---|
| Produção atual | `docs/evidence/production-home-desktop-1440.png` (1425×5282) | `docs/evidence/production-home-mobile-390.png` (390×6393) |
| Astro local | `docs/evidence/astro-home-desktop-1440.png` (1440×5282) | `docs/evidence/astro-home-mobile-390.png` (390×6409) |

As quatro capturas são full-page. Elementos de reveal foram forçados como visíveis somente durante a captura, sem mudança no código do site.

## Resultado visual

- Mantidos: grid, rails laterais, paleta papel/preto/azul/lima, família tipográfica, hero, diagrama operacional, seções escuras/azuis, cartões de projeto, CTAs e responsividade.
- Mobile: `scrollWidth` e `clientWidth` medidos em 390 px; não houve overflow horizontal.
- Desktop local: `scrollWidth` e `clientWidth` medidos em 1440 px; não houve overflow horizontal.
- A home local preserva a altura desktop de 5282 px da produção.

## Diferenças intencionais

- Marca alterada para LEED Digital.
- Posicionamento passa a mencionar sistemas e agentes de IA para operações empresariais.
- Números sem fonte foram substituídos por rótulos conceituais não métricos.
- “Projetos em operação” passou a “Recortes de solução” para não sugerir cases comprovados.
- Rodapé e microcopy foram atualizados; o sistema visual não foi redesenhado.

## Entrega de HTML e JavaScript

Baseline observada antes da migração:

- Home: 48.818 bytes de HTML, sem bundle JavaScript próprio separado (scripts pequenos inline; tags externas preservadas).
- Contato: 2.605 bytes de shell HTML + 199.530 bytes de JavaScript + 9.460 bytes de CSS no build Vite.

Build Astro local:

- Home: 18.806 bytes de HTML + 26.817 bytes de CSS; nenhum bundle JavaScript Astro referenciado pela Home. O conteúdo principal está no HTML sem executar JS.
- Contato: 13.089 bytes de HTML completo + ilha React. Assets compartilhados/da ilha: `client` 184.048 bytes, React 7.555 bytes, ContactForm 5.827 bytes; CSS do contato 9.463 bytes. O JavaScript fica restrito à rota interativa.
- Todas as demais páginas editoriais são HTML estático completo.

A comparação é básica e mede bytes brutos de build, não Core Web Vitals de produção. Fontes e tags externas permanecem dependências de rede e não foram alteradas. GTM e Google Ads foram preservados apenas na Home e no Contato, rotas já mensuradas antes da migração; as novas rotas não ampliam tracking por padrão.
