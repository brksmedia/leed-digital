# LEED Contact Page Implementation Plan

> **For agentic workers:** Implement inline in this session. The optional `superpowers:executing-plans` skill is not installed, so use the repository's existing React/Vite workflow and verify each deliverable directly.

**Goal:** Add a responsive `/contact` page that adapts Atomic Object's contact-page hierarchy to LEED's new editorial, systems-oriented visual language.

**Architecture:** Preserve the existing homepage and select the page from `window.location.pathname`, avoiding a new router dependency. Keep the contact page isolated in its own React component and scoped stylesheet. Reuse the Formspree endpoint already present in the repository, but replace the fire-and-forget flow with explicit loading, success, and error states.

**Tech Stack:** React 19, TypeScript, Vite 8, CSS, Lucide React.

**Spec:** User conversation on 2026-08-24 and the public structure of `https://atomicobject.com/contact`.

## Global Constraints

- Keep the existing homepage code and user changes intact.
- Do not add dependencies.
- Do not deploy, push, or change production infrastructure.
- Use Portuguese copy and LEED's current visual direction: cream, black, cobalt blue, signal lime, grid, mono labels, functional borders.
- The form must be single-column, have visible labels, 44px-or-larger targets, and usable loading, success, and error states.

---

### Task 1: Route and page shell

**Files:**
- Create: `src/pages/ContactPage.tsx`
- Create: `src/pages/contact-page.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `ContactPage(): JSX.Element`
- Consumes: `window.location.pathname` in `App()`

- [x] Create the contact page component with a semantic header, main content, form, contact channels, and footer.
- [x] Scope all visual rules below `.contact-page` so the existing homepage is unchanged.
- [x] Render `ContactPage` for `/contact` and keep the current page as the `/` fallback.
- [x] Run `npm run build`; expected result: TypeScript and Vite complete with exit code 0.

### Task 2: Contact form behavior and accessibility

**Files:**
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/pages/contact-page.css`

**Interfaces:**
- Produces: `submitState: 'idle' | 'sending' | 'success' | 'error'`
- Consumes: the existing Formspree endpoint `https://formspree.io/f/mwvwaypr`

- [x] Add required `name`, `email`, and `message` controls plus optional `company` and project-context fields.
- [x] Await the form request and show honest Portuguese feedback for sending, success, and failure.
- [x] Preserve native browser validation, visible focus, reduced-motion behavior, and minimum 44px interaction targets.
- [x] Run `npm run lint`; expected result: ESLint completes with exit code 0.

### Task 3: Responsive visual verification

**Files:**
- Modify if needed: `src/pages/contact-page.css`

**Interfaces:**
- Consumes: local Vite route `/contact`
- Produces: verified desktop and mobile layout without horizontal overflow.

- [x] Start the local Vite server.
- [x] Capture desktop and mobile renderings of `/contact`.
- [x] Check hierarchy, alignment, form readability, focus states, and overflow; make only corrective CSS changes.
- [x] Re-run `npm run build` and `npm run lint`; both must exit with code 0.
