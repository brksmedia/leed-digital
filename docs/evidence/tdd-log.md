# Registro TDD da fundação Astro

Data: 2026-08-26

Este arquivo registra comandos realmente executados. Nenhum envio real ao Formspree ou alteração externa é permitido.

## Ciclos RED/GREEN

### RED 1: contrato de páginas, metadata, JSON-LD, links e artefatos

Comando:

```text
node --test tests/site-output.test.mjs
```

Saída: exit 1, `tests 6`, `pass 0`, `fail 6`. Falhas esperadas principais: `/contact/ depende de shell vazio`, `/ sem Organization`, `arquivo ausente para /sobre/`, `artefato ausente: sitemap-index.xml` e diretório público de casos ausente.

### RED 2: collections

Comando:

```text
node --test tests/content-source.test.mjs
```

Saída: exit 1, `tests 3`, `pass 0`, `fail 3`. Falhas esperadas: `src/content.config.ts ausente`, `collection insights ausente` e `collection cases ausente`.

### RED 3: formulário sem rede

Comando:

```text
node --test tests/contact-form.test.mjs
```

Saída: exit 1, `tests 1`, `pass 0`, `fail 1`. Falha esperada: `ERR_MODULE_NOT_FOUND` para `src/lib/contact-form.mjs`.

### RED 4: servidor e barra final

Comando:

```text
node --test tests/server.test.mjs
```

Saída: exit 1, `tests 1`, `pass 0`, `fail 1`. O preview Vite existente respondeu `/contact` com `200`, contrariando o redirect canônico esperado.

### GREEN 1–4: fundação Astro implementada

Comandos executados:

```text
npm run check
npm run lint
npm run build
npm run test:unit
npm run test:build
```

Resultados observados após a implementação: Astro check com 0 erros e 0 warnings; lint exit 0; build estático concluído com 13 páginas; suíte unitária com 4/4 testes aprovados; suíte de build/servidor com 7/7 testes aprovados.

### RED 5: runner legado ainda verificava arquivos Vite

Comando:

```text
npm test
```

Saída: exit 1 com 34 falhas esperadas porque `scripts/verify-site.mjs` ainda procurava `index.html`, `contact/index.html`, `src/pages/ContactPage.tsx` e `public/sitemap.xml` da arquitetura removida.

### GREEN 5: runner principal adaptado

Comando:

```text
npm test
```

Saída: exit 0; 4/4 testes unitários e 7/7 testes de build/servidor aprovados. O teste do formulário usa `fetch` injetado e não envia requisição real ao Formspree.

### RED 6: documentação operacional ausente

Comando:

```text
node --test tests/content-source.test.mjs
```

Saída: exit 1; o novo teste de documentação falhou pelo motivo esperado: `README.md ausente`.

### GREEN 6: README e fundação restaurados para Astro

Comando:

```text
node --test tests/content-source.test.mjs
```

Saída: exit 0; 4/4 testes aprovados, incluindo presença e contratos mínimos de `README.md` e `docs/site-foundation.md`.

### RED 7: encerramento do preview tinha condição de corrida

Comando:

```text
npm ci && npm run typecheck && npm run lint && npm run build && npm test
```

Saída: instalação, typecheck, lint e build aprovados; a suíte terminou com o teste de preview cancelado (`Promise resolution is still pending`) porque o listener de `exit` era registrado depois de enviar `SIGTERM`.

### GREEN 7: teardown do preview sem corrida

Comando:

```text
for i in 1 2 3 4 5; do node --test tests/server.test.mjs || exit 1; done
```

Saída: cinco execuções consecutivas aprovadas. O teste agora registra o listener antes de enviar `SIGTERM` e não aguarda quando o processo já encerrou.

### RED 8: tracking expandido inadvertidamente

Comando:

```text
npm run check && npm run lint && npm run build && npm test
```

Saída: check, lint e build aprovados; `npm test` falhou no contrato “tracking legado fica restrito às rotas já mensuradas” porque `BaseLayout` carregava GTM e Google Ads também nas páginas novas.

### GREEN 8: tracking preservado somente em Home e Contato

Comando:

```text
npm run build && npm test
```

Saída: build estático aprovado; suíte unitária 5/5 e suíte de build/servidor 8/8. `BaseLayout` agora exige opt-in explícito e apenas `/contact/` o ativa; a Home preserva seu tracking próprio.

### RED 9: achados da revisão independente

Comando:

```text
npm run build && node --test tests/site-output.test.mjs
```

Saída: 5/7 testes aprovados e 2 falhas esperadas. O HTML estático do formulário não tinha fallback `method="post"`/`action` e os BreadcrumbLists de serviços repetiam a URL da página atual no item intermediário.

### GREEN 9: fallback seguro e breadcrumbs únicos

Comando:

```text
npm run check && npm run lint && npm run build && npm test && npm audit
```

Saída: check e lint aprovados; build estático com 13 páginas; suíte unitária 5/5; suíte de build/servidor 8/8; audit com 0 vulnerabilidades. O formulário agora degrada para POST direto ao Formspree sem PII na URL e “Serviços” aponta para `/#capabilities` nos breadcrumbs visíveis e estruturados.

### RED 10: drafts editoriais ainda sinalizados como publicados

Comando:

```text
npm run check && npm run lint && npm run build && npm test && npm audit
```

Saída: a suíte unitária falhou porque os frontmatters já estavam `draft: true`, mas o contrato anterior ainda esperava `draft: false`, expondo uma inconsistência na política editorial.

### GREEN 10: insights locais protegidos de discovery

Comando:

```text
npm run check && npm run lint && npm run build && npm test && npm audit
```

Saída: check/lint/build aprovados; suíte unitária 5/5 e suíte de build/servidor 9/9; audit 0. Os artigos continuam gerando HTML local para revisão, com `draft: true`, `noindex, nofollow`, `dateCreated` e exclusão de sitemap, RSS e `llms.txt` até aprovação.

### RED 11: conversão do formulário não alcançava `window.gtag`

Comando:

```text
node --test tests/site-output.test.mjs
```

Saída: 7/8 testes aprovados. A asserção nova mostrou que `define:vars` envolvia `function gtag()` em um IIFE, enquanto a ilha React chama `window.gtag`, impedindo o disparo da conversão após sucesso.

### GREEN 11: `gtag` publicado explicitamente no escopo global

Comando:

```text
npm run check && npm run lint && npm run build && npm test && npm audit
```

Saída: check e lint aprovados; build estático com 13 páginas; suíte unitária 5/5; suíte de build/servidor 9/9; audit com 0 vulnerabilidades. O tracking legado agora define `window.gtag` explicitamente e o teste do HTML compilado protege a integração com a ilha React.

### RED 12: drafts gerados no build padrão e nota interna em `llms.txt`

Comando:

```text
npm run build && node --test tests/site-output.test.mjs tests/server.test.mjs
```

Saída: 5/9 testes aprovados e 4 falhas esperadas. As três rotas draft existiam e respondiam 200, páginas de serviços ainda as referenciavam, e `llms.txt` continha “hipótese”, “aprovada” e “validada”.

### GREEN 12: build padrão fail-closed e revisão local opt-in

Comandos:

```text
npm run build && node --test tests/site-output.test.mjs tests/server.test.mjs
node --test tests/content-source.test.mjs
npm test
```

Saída: o build padrão gerou 10 páginas, não gerou nem referenciou os três drafts e passou 9/9 testes de output/preview; a documentação passou 4/4. `npm test` também gerou um build isolado de revisão com `INCLUDE_DRAFTS=true`, confirmou as três rotas com `noindex, nofollow` e nota editorial em 1/1 teste, e removeu `dist-review` ao terminar. `llms.txt` passou sem os termos internos proibidos.

### RED/GREEN 13: isolamento contra variável herdada

Comando RED:

```text
INCLUDE_DRAFTS=true npm test
```

Saída RED: 8/9 testes do build padrão passaram; o subprocesso de preview herdou a variável e procurou `dist-review` antes da fase de revisão. No GREEN, o runner passou o ambiente sem `INCLUDE_DRAFTS` tanto ao build quanto aos testes/preview padrão; a mesma execução adversarial passou e `dist-review` foi removido ao final.

### RED 14: conteúdo aprovado não podia se tornar publicável

Comando:

```text
npm test
```

Saída: os builds padrão e de revisão passaram, mas o build da fixture temporária falhou no schema porque `status` aceitava somente `review` e `draft` aceitava somente `true`. Isso reproduziu o bloqueio antes de alterar a implementação.

### GREEN 14: estados editoriais discriminados e publicação verificável

Comando:

```text
npm test
```

Saída: 5/5 testes de fonte/formulário, 9/9 do build padrão, 2/2 do build de revisão e 2/2 da fixture publicada. A publicação temporária gerou rota sem `noindex`, sem linguagem de rascunho, com `datePublished`, e apareceu na listagem, sitemap, RSS e `llms.txt`. Drafts continuaram fora desses canais no modo de revisão, e todos os arquivos temporários foram removidos em `finally`.

### RED/GREEN 15: frontmatter YAML comentado no sitemap

Comando RED:

```text
npm test
```

Saída RED: 1/2 testes do build de revisão passou. Uma fixture draft aninhada com `draft: true # comentário` gerou corretamente sua rota protegida, mas vazou para o sitemap porque o filtro usava regex em vez de interpretar YAML.

No GREEN, `astro.config.mjs` passou a analisar o frontmatter com o parser `yaml` declarado diretamente. A suíte passou 5/5 + 9/9 + 2/2 + 2/2, removeu a URL comentada/aninhada do sitemap e limpou fixture e builds temporários em `finally`.

### RED/GREEN 16: caminhos locais e URLs canônicas divergentes

Comando RED:

```text
npm test
```

Saída RED: 1/2 testes do build de revisão passou. A fixture draft em caminho aninhado com espaços e Unicode gerou rota protegida, mas sua URL percent-encoded vazou no sitemap porque o filtro comparava um pathname de `file:` e uma URL não canônica.

No GREEN, `fileURLToPath()` passou a tratar o caminho local e um gerador de ID compartilhado passou a alimentar tanto o loader `glob` quanto o filtro do sitemap. `new URL()` produz a URL canônica codificada. A suíte voltou a 5/5 + 9/9 + 2/2 + 2/2, com cleanup integral.
