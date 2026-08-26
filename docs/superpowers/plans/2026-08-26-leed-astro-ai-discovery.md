# LEED Digital Astro AI Discovery Implementation Plan

> **For agentic workers:** Execute inline in this session. Strict RED/GREEN evidence is recorded in `docs/evidence/tdd-log.md`; implementation workers do not commit, e o profile operations cria o commit local somente após a revisão final.

**Goal:** Migrate the LEED Digital institutional site from Vite to static Astro and add a verifiable AI-discovery content foundation without changing the approved home design or publishing unvalidated proof.

**Architecture:** Astro generates every public route as full static HTML. Shared Astro components own metadata, JSON-LD, navigation, footer, CTA and editorial structure; the contact form is the only hydrated React island. Astro content collections validate insights and draft cases, while Node tests inspect build output and exercise a local preview server.

**Tech Stack:** Astro, React, TypeScript, Zod-backed content collections, Node test runner, ESLint, `@astrojs/sitemap`, `@astrojs/rss`.

**Spec:** User-approved requirements supplied on 2026-08-26.

## Global Constraints

- Never read, modify, add, move, delete or stage `email-signature.html` or `visual-reference.html`.
- Inspect tracked repository files only; do not inspect private or internal repositories.
- Work locally without push, PR, deploy or external-service mutations; o commit local aprovado pertence ao fechamento revisado da execução.
- Write and run a failing test before each behavior group, then implement minimally and run it green.
- Preserve GTM `GTM-NP9RS6FC`, Ads `AW-16851840618`, conversion `AW-16851840618/F-r4CKe8lZgcEOrcyuM-` and Formspree form `mwvwaypr`.
- Public brand is `LEED Digital`; public positioning is development of systems and AI agents for business operations.
- Never publish unvalidated case facts, clients, metrics, results, address, team, founding data, prices or ratings.
- URLs are lowercase with trailing slash; static output must return a real 404 for unknown routes.

---

### Task 1: Astro build contract

**Files:**
- Create: `astro.config.mjs`, `src/content.config.ts`, `tests/build-contract.test.mjs`
- Modify: `package.json`, `tsconfig.json`, `eslint.config.js`
- Remove after proof: `vite.config.ts`, obsolete Vite entry points

**Interfaces:**
- Produces: `npm run check`, `npm run build`, `npm run test:build`
- Consumes: Astro static output and site origin `https://leed.digital`

- [ ] Add a Node test asserting Astro configuration, required scripts and expected `dist` route files.
- [ ] Run `node --test tests/build-contract.test.mjs` and record the missing-Astro failure.
- [ ] Install Astro integrations and implement static configuration plus scripts.
- [ ] Run the same test after build and record the passing result.

### Task 2: Shared static page system and routes

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/{SiteNav,SiteFooter,Metadata,JsonLd,PageCta,EditorialPage,Breadcrumbs}.astro`
- Create: the required `.astro` route files under `src/pages/`
- Create: `src/styles/global.css`
- Migrate: tracked `index.html` home into the Astro route
- Test: `tests/pages.test.mjs`, `tests/links.test.mjs`, `tests/structured-data.test.mjs`

**Interfaces:**
- Produces: per-route title, H1, description, canonical, `pt-BR`, navigation and applicable JSON-LD
- Consumes: lower-case trailing-slash route definitions and shared brand constants

- [ ] Add route/metadata/link/JSON-LD tests for all required public URLs and forbidden claims.
- [ ] Run those tests against the absent Astro output and record the expected failures.
- [ ] Implement reusable static components, preserve the home visual language and add the seven new institutional routes.
- [ ] Build and rerun the tests until all route contracts pass.

### Task 3: Content collections and editorial discovery

**Files:**
- Create: `src/content/insights/*.md`, `src/content/cases/placeholder.md`
- Create: `src/pages/insights/[...slug].astro`, `src/pages/insights/rss.xml.js`
- Modify: `src/pages/insights/index.astro`, `src/pages/casos/index.astro`
- Test: `tests/content.test.mjs`

**Interfaces:**
- Produces: three review-marked public Article pages and zero public routes for draft cases
- Consumes: collection schemas with `status`, title, description, dates and draft flags

- [ ] Add tests for three substantive insight entries, review status, generated Article pages and excluded draft cases.
- [ ] Run the content test and record the missing-collection failure.
- [ ] Implement schemas, three human-written articles and a fact-free case placeholder marked draft.
- [ ] Build and rerun the content test green.

### Task 4: Contact React island

**Files:**
- Create: `src/components/ContactForm.tsx`, `src/components/contact-form.css`, `tests/contact-form.test.mjs`
- Modify: `src/pages/contact/index.astro`

**Interfaces:**
- Produces: `submitContactForm(form, fetchImpl, onConversion)` and hydrated accessible UI states
- Consumes: Formspree `https://formspree.io/f/mwvwaypr` and Ads conversion ID

- [ ] Add a test with an injected fetch mock proving endpoint, POST body, success/error behavior and zero network access.
- [ ] Run it before implementation and record the missing-module failure.
- [ ] Implement the minimal submission helper and React island while keeping all surrounding contact content static.
- [ ] Run the contact test green and confirm no real request occurs.

### Task 5: Discovery artifacts, server verification and documentation

**Files:**
- Create: `src/pages/llms.txt.ts`, `docs/{prompt-battery,measurement-plan,verified-inventory,login-approval-blockers}.md`
- Modify: `public/robots.txt`, `public/_headers`, `README.md`, `docs/site-foundation.md`, `scripts/verify-site.mjs`
- Remove: hand-authored `public/sitemap.xml`
- Test: `tests/server.test.mjs`, `tests/discovery-files.test.mjs`

**Interfaces:**
- Produces: generated sitemap, RSS, `llms.txt`, permissive robots, true preview 404 and honest internal inventory
- Consumes: only the inventory facts explicitly supplied by the user

- [ ] Add artifact and preview-server tests, including 200s for every route and a non-200 unknown path.
- [ ] Run them before implementation and record expected missing-artifact/server failures.
- [ ] Implement discovery files, exact internal documentation and updated foundation docs.
- [ ] Run `npm install`, `npm run check`, `npm run lint`, `npm run build` and `npm test`; record exact final outputs.
- [ ] Prove obsolete React/Vite files have no imports, remove only those files, rerun the complete verification, inspect the unstaged diff and confirm protected-file status is unchanged.
