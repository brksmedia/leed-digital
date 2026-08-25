# LEED Homepage Production Implementation Plan

> **For agentic workers:** Implement inline in this session. The optional `superpowers:executing-plans` skill is not installed, so use the repository's existing React/Vite and Cloudflare Pages workflow.

**Goal:** Publish the approved `visual-reference.html` design as the production homepage while preserving the new contact page at `/contact/`.

**Architecture:** Use Vite as a multi-page build. The root `index.html` becomes the approved static homepage, while `contact/index.html` mounts the existing React contact page through a dedicated entry point. Cloudflare Pages continues to deploy automatically from `main`.

**Tech Stack:** Vite 8, React 19, TypeScript, CSS, Cloudflare Pages.

**Spec:** `visual-reference.html` plus the contact-page implementation approved in this conversation.

## Global Constraints

- Preserve unrelated user files and the existing email correction in `src/App.tsx`.
- Publish the exact approved homepage visual rather than redesigning it.
- Keep `/contact/` functional as a direct URL.
- Do not add dependencies or change hosting providers.
- Build and lint must pass before pushing `main`.
- Verify the live homepage and contact route after Cloudflare completes deployment.

---

### Task 1: Convert the project to a multi-page build

**Files:**
- Modify: `vite.config.ts`
- Create: `contact/index.html`
- Create: `src/contact-main.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `dist/index.html` and `dist/contact/index.html`
- Consumes: `ContactPage` from `src/pages/ContactPage.tsx`

- [x] Configure explicit Vite inputs for the root and contact HTML documents.
- [x] Mount `ContactPage` from the dedicated contact entry point.
- [x] Remove the temporary pathname switch from the legacy app while preserving the user's email correction.

### Task 2: Promote the approved homepage

**Files:**
- Replace: `index.html` from `visual-reference.html`
- Modify: `index.html`

**Interfaces:**
- Produces: the production root homepage.
- Consumes: the approved visual prototype's complete HTML, CSS, and progressive-enhancement script.

- [x] Promote the approved prototype without changing its layout.
- [x] Point the final project CTA to `/contact/`.
- [x] Verify semantic title, description, Portuguese language, and reduced-motion behavior.

### Task 3: Validate and publish

**Files:**
- Test: `dist/index.html`
- Test: `dist/contact/index.html`

**Interfaces:**
- Consumes: Cloudflare Pages automatic deployment from GitHub `main`.
- Produces: updated `https://leed.digital/` and `https://leed.digital/contact/`.

- [x] Run `npm run build` and confirm both HTML entry points exist in `dist`.
- [x] Run `npm run lint` and browser checks at desktop and mobile widths.
- [ ] Commit only homepage/contact production files and push `main`.
- [ ] Wait for the Pages deployment and verify both live URLs.
