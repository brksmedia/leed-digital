# Fundação do site LEED

Última revisão: 2026-08-25

## Escopo atual

Site empresarial enxuto para apresentar a atuação da LEED em software sob medida e converter interesse em contato. Copy, direção visual e expansão de conteúdo serão discutidas separadamente.

## Sitemap essencial

```text
Home (/)
└── Contato (/contact/)
```

Páginas futuras bloqueadas por conteúdo ou prova ainda não fornecidos:

- Política de privacidade (`/privacidade/`): depende de razão social, CNPJ, controlador, finalidade, retenção, compartilhamentos e canal para titulares.
- Cases (`/cases/`): depende de autorização, contexto, escopo, evidências e resultados reais.
- Sobre (`/sobre/`): depende de história, equipe, estrutura e informações institucionais confirmadas.

## Especificação por página

### Home (`/`)

- Objetivo: explicar que a LEED projeta e desenvolve software sob medida e encaminhar interessados para contato.
- Público atual inferido do conteúdo: pessoas responsáveis por operações, processos, dados e produtos digitais. Validação comercial pendente.
- Mensagem principal atual: “Transformamos processos complexos em sistemas claros.”
- Seções atuais: proposta principal; forma de trabalho; exemplos visuais de solução; capacidades; CTA de contato.
- Provas necessárias: cases reais, clientes autorizados, depoimentos, equipe responsável e resultados comprováveis. Todas pendentes.
- CTA primário: “Conversar sobre o projeto”, levando a `/contact/`.
- Mobile: mesma informação do desktop; sem rolagem horizontal; CTA alcançável; tipografia sem corte; motion reduzido respeitado.
- Eventos de conversão desejados: `contact_cta_clicked` e chegada à página de contato. Implementação pendente de plano de consentimento e revisão do GTM.
- Critérios de aceite:
  - exatamente um `h1`;
  - título, description e canonical presentes;
  - CTA aponta para `/contact/`;
  - links internos não quebram;
  - nenhuma afirmação de case ou resultado é publicada sem prova;
  - layout funciona em 390 px e 1440 px sem overflow horizontal.

### Contato (`/contact/`)

- Objetivo: receber contexto de um projeto e oferecer canais diretos de contato.
- Público: visitante que já reconheceu um problema operacional ou uma necessidade de software.
- Mensagem principal atual: “Conte o que precisa funcionar melhor.”
- Seções atuais: introdução; formulário; contato por email e WhatsApp; próximos passos.
- Provas necessárias: prazo de resposta operacionalmente sustentável e política de privacidade publicada. Pendentes de confirmação.
- CTA primário: envio do formulário.
- CTAs secundários: email e WhatsApp existentes no repositório.
- Mobile: formulário em uma coluna; campos e botões com pelo menos 44 px; labels visíveis; mensagens de sucesso e erro legíveis; ordem de leitura preservada.
- Eventos de conversão atuais: conversão do Google Ads após resposta bem-sucedida do Formspree.
- Eventos desejados: `contact_form_started`, `contact_form_submitted`, `contact_channel_clicked`. Implementação pendente de consentimento e revisão do GTM.
- Critérios de aceite:
  - exatamente um `h1` e hierarquia sequencial de headings;
  - nome, email e mensagem obrigatórios;
  - empresa e estágio opcionais;
  - formulário inválido não é enviado;
  - estados enviando, sucesso e erro existem;
  - nenhuma PII é enviada como propriedade de analytics;
  - email, WhatsApp e retorno à Home funcionam;
  - título, description e canonical presentes;
  - layout funciona em 390 px e 1440 px sem overflow horizontal.

## Regras de URL e navegação

- Canonical sem parâmetros: `https://leed.digital/` e `https://leed.digital/contact/`.
- URLs em minúsculas e com barra final para diretórios.
- `/contact` redireciona permanentemente para `/contact/`.
- URLs inexistentes não podem retornar a Home com status 200.
- Home e Contato devem se conectar nos dois sentidos.

## Tracking atual

- Google Tag Manager: `GTM-NP9RS6FC`.
- Google Ads: `AW-16851840618`.
- Conversão de formulário: `AW-16851840618/F-r4CKe8lZgcEOrcyuM-`.
- Endpoint do formulário: Formspree `mwvwaypr`.

## Pendências que bloqueiam implementação segura

1. Confirmar se o GTM já contém a tag `AW-16851840618`; hoje Google Ads e GTM são carregados diretamente e podem gerar duplicidade.
2. Definir países atendidos e requisitos de consentimento de cookies.
3. Fornecer dados legais para a política de privacidade.
4. Confirmar se “respondemos em até um dia útil” é um compromisso operacional real.
5. Classificar os três blocos “Projetos em operação” como cases reais ou exemplos conceituais. Os números `98,4%`, `94%`, `−31%` e `18` não possuem fonte no repositório.
6. Fornecer favicon e imagem social oficiais.

## Evidências e comandos de verificação

```bash
npm run build
npm run lint
npm test
```

O teste automatizado valida arquivos essenciais, metadata, rotas internas e requisitos estruturais do formulário. Testes de produção e publicação exigem aprovação explícita.

## Resultado da verificação local em 2026-08-25

| Critério | Resultado | Evidência |
|---|---|---|
| Build multipágina | Aprovado | `dist/index.html` e `dist/contact/index.html` gerados |
| Lint | Aprovado | ESLint encerrou com código 0 |
| Teste estrutural | Aprovado | `npm test` encerrou sem falhas |
| Home em 1440 px | Aprovado | um `h1`, canonical correto, CTA válido e sem overflow |
| Contato em 1440 px | Aprovado | um `h1`, headings `H1 → H2 → H2` e sem overflow |
| Contato em 390 px | Aprovado | formulário em uma coluna, botão de 58 px e sem overflow |
| Validação do formulário | Aprovado localmente | inválido vazio; válido com nome, email e mensagem preenchidos |
| Links essenciais | Aprovado | Home, email, WhatsApp, CTA e skip link encontrados |
| Arquivos de SEO | Aprovado localmente | `robots.txt` e `sitemap.xml` retornaram 200 no preview |
| Console do navegador | Aprovado | nenhuma exceção observada |
| Envio real do formulário | Não executado | evita criar lead ou mensagem externa sem autorização específica |
| Status 404 em produção | Pendente | `_redirects` foi corrigido, mas requer publicação e verificação HTTP |
| Tags e consentimento | Pendente | exige inspeção do GTM e definição jurídica |
