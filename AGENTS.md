# AGENTS.md — LocalRise

Working instructions for Codex on this repo. Deep detail lives in **`docs/`** (how
systems work) and **`knowledge/`** (why they're that way + what already broke). Read
the relevant doc before changing a subtle system — most rules below exist because
something failed once.

## What this is
A marketing site for a digital agency serving local Indian businesses.
**Statically-exported Next.js 14 App Router** — no backend, no API routes, no database.

| | |
| --- | --- |
| Framework | **Next.js 14.2.15** (App Router) — **not 15** |
| React | **18.3.1** — not 19 |
| Language | TypeScript 5.6, `strict` |
| Styles | Tailwind 3.4 (tokens in `tailwind.config.ts`) |
| Animation | **Framer Motion 11** only — no GSAP |
| Output | `output: "export"` → static `out/`, `trailingSlash: true`, images unoptimised |

## Hard invariants — do not violate
1. **No raw `<a href="/…">` for internal links.** Use `SmartLink` / `Button href`. A raw anchor reloads the document and destroys the audio engine. (`docs/navigation.md`, `knowledge/bugs/001`)
2. **No dynamically-built Tailwind class names** (`` `from-[${x}]` ``). JIT only emits CSS for literal strings; dynamic ones fail silently. (`docs/content.md`)
3. **`app/layout.tsx` must stay a server component** or all `metadata` silently drops. Providers stay separate client components. (`docs/seo.md`)
4. **No Next 15 / React 19 idioms** — no async `params`, `useActionState`, or `use()`.
5. **Static export** — no server actions, route handlers, runtime env, or ISR. Read `localStorage`/`window` in effects, never during render. Param routes need `generateStaticParams`. Never commit `out/`.
6. **Content lives in `lib/content`** (barrel `@/lib/content`), never hard-coded. Keep coupled shapes in sync: `services`⇄`serviceDetails` (shared `id`), `serviceDetails.faqPicks` (indices into `faqs`), `relatedPackageId` → `packages[].id`.
7. **Honest content** — no fabricated testimonials, client logos, or metrics; concept sites stay labelled "Design Concept". A validator demanding a field is not licence to invent it. (`knowledge/decisions/004`)
8. **Zero external requests** — self-hosted fonts, inline SVG. Don't add Google Fonts, CDNs, or new runtime dependencies without a strong reason.
9. **Conventions**: `@/` import alias (never `../../`); components export named **and** default; `"use client"` only where state/effects/context/Framer require it; comments explain **why**.
10. **Verify the artifact, not the status.** `npx tsc --noEmit` for type safety; `npm run build` for anything touching routes/metadata/config, and confirm `out/` is correct. Green ≠ working (`knowledge/bugs/005`).

## Delegate to specialised subagents (`.codex/agents/`)
Prefer routing focused work to the right specialist — it keeps context small, edits
accurate, and lets tasks run in parallel. Agent definitions live in `.codex/agents/`.

| Task | Agent |
| --- | --- |
| Build/adjust sections, primitives, responsive layout | **ui-builder** |
| Routing, metadata, JSON-LD, sitemap, `next.config`, static-export | **nextjs-expert** |
| Motion — Framer / Tailwind keyframes / scroll / micro-interactions | **animation-specialist** |
| Copy, headlines, CTAs, metadata & schema wording | **seo-copywriter** |
| Section inventory, page order/flow, content-model shape | **content-architect** |
| Core Web Vitals, bundle, client/server boundaries | **performance-optimizer** |
| Remove duplication, simplify, extract (behaviour preserved) | **refactor-engineer** |
| Visual / UX / accessibility review (read-only) | **design-reviewer** |
| TypeScript / security / correctness / invariant review (read-only) | **code-reviewer** |
| Cross-cutting planning, convention enforcement, routing work | **project-architect** |

**Default flow**: for a UI change → build with the relevant specialist, then run
**code-reviewer** (and **design-reviewer** for visible UI) before committing. For a
large or cross-cutting request, start with **project-architect** to decompose and
delegate.

## Commands
```bash
npm run dev       # local dev
npm run typecheck # TypeScript verification
npm run verify    # typecheck + static export build
npm run build     # static export → out/
```
Deploy: push to `main` → GitHub Action builds the `deploy` branch → Redeploy in
Hostinger hPanel. (`docs/deployment.md`)


## Repo skills
Reusable project workflows live in `.agents/skills/`. Read `.agents/skills/REGISTRY.md`
before creating a new skill, and update the registry whenever a skill is created,
updated, merged, or retired.
