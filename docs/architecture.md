# Architecture

## Purpose

LocalRise is a marketing site for a digital agency serving local Indian
businesses. It is a **statically exported Next.js 14 App Router site** — no
backend, no database, no API routes.

## Stack

| Thing | Version / choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 14.2.15** (App Router) | **Not 15.** Don't use Next 15 idioms. |
| React | **18.3.1** | Not 19 — no `useActionState`, no `use()`. |
| Language | TypeScript 5.6, `strict: true` | |
| Styles | Tailwind 3.4 | Design tokens in `tailwind.config.ts` |
| Animation | Framer Motion 11 | See [animations.md](./animations.md) |
| Fonts | `@fontsource-variable` (self-hosted) | No external font requests |
| Output | `output: "export"` → `out/` | Static files only |

`next.config.mjs` sets `output: "export"`, `images: { unoptimized: true }` and
`trailingSlash: true`. Consequences worth internalising:

- **No server at runtime.** No route handlers, no server actions, no runtime env
  vars, no ISR. Anything dynamic must happen in the browser.
- **`next/image` optimisation is off.** Images are served as-is.
- **Every route is prerendered at build time.** Client-only state (localStorage,
  `window`) is unavailable during that render — read it in an effect instead, or
  you'll get a hydration mismatch. See [onboarding.md](./onboarding.md).

## Folder layout

A quick-reference sketch — see [repository-structure.md](./repository-structure.md)
for the exhaustive, kept-current version (every subfolder, naming/import
conventions, "where does a new X go").

```
app/
  layout.tsx              root layout: metadata, JSON-LD, providers, chrome
  page.tsx                homepage — composes sections in order
  process/page.tsx        complete project process
  faq/page.tsx            FAQ plus page-scoped FAQPage schema
  why-us/page.tsx         positioning and differentiators
  contact/page.tsx        the contact page
  services/[slug]/page.tsx  per-service pages (generateStaticParams)
  concepts/**              Concept Websites gallery + live sites (docs/concepts.md)
  lp/website-design/page.tsx  a standalone ads landing page
  sitemap.ts robots.ts globals.css icon.svg

components/
  ui/            primitives: Button, SmartLink, Icon, Logo, Reveal, Magnetic,
                 SectionHeading
  layout/        site chrome rendered by the root layout: Nav, Footer,
                 WhatsAppButton
  sections/      homepage/service page content blocks
  illustrations/ code-rendered/inline-SVG artwork: BrowserMock, ServiceVisual,
                 SpotScenes, HeroVideo
  concepts/      Concept Websites card + real-screenshot preview components
  live/          the Concept Websites "live site" rendering engine
  contact/       the /contact/ page's own sections
  cart/          CartDrawer
  audio/         AudioToggle (UI only)
  analytics/     GoogleTag (gtag.js loader)

providers/       AudioProvider, CartProvider  (React context + engines)
hooks/           useScrollLock, useCarousel
lib/
  content/       all site copy, split by domain, re-exported via index.ts
  communication/ the "start a conversation" (WhatsApp) layer
  analytics/     GA4 / Google Ads config
  utils.ts       cx(), formatINR()
  palette.ts     rotating brand gradients
  navigation.ts  isInternalHref()
  onboarding.ts  localStorage preference
public/          served as-is: fonts pull in via @fontsource, hero video,
                 concept screenshots, service photos, .htaccess
assets/          committed source files public/ assets are derived from
temp/            intake-only staging folder — always empty besides its README
docs/            you are here
knowledge/       why things are the way they are, and what already broke
```

### Why this shape, and not `features/` + `services/`

This is a small, ~50-file site with no backend (`/`, `/why-us`,
`/services/[slug]`, `/concepts/**` — still just static pages, no dynamic
backend). An enterprise scaffold
(`features/`, `services/`, `constants/`, `assets/`) was considered and
deliberately rejected: each folder would hold one file and add import depth
without adding a seam. Structure should track real complexity.

The split that *does* earn its place is **engine vs presentation**:
`AudioProvider` owns audio logic, `AudioToggle` only renders. Same idea behind
`useCarousel` (scroll maths) vs `IndividualServices` (markup).

Revisit this if the site gains a backend, auth, or several genuinely separate
product areas.

## Conventions

- **Import alias**: `@/*` → repo root (`tsconfig.json`). Always `@/components/...`,
  never `../../`.
- **Components**: named export + a `default` export. Import the named one.
- **`"use client"`** only where needed — state, effects, Framer Motion, context.
  Sections that are pure markup stay server components.
- **Content lives in `lib/content`**, never hard-coded in components.
- **Comments explain _why_**, not what. Don't narrate the code.

## Data flow

```
lib/content/*  →  section components  →  app/page.tsx
                                          ↑
                        app/layout.tsx (providers + chrome)
```

There is no client-server data flow. All content is compiled in at build time.

## Extending

- **New homepage section** → `components/sections/`, content into `lib/content/`,
  compose in `app/page.tsx`.
- **New route** → a folder in `app/`. If it needs params, add
  `generateStaticParams` (required for static export).
- **New primitive** → `components/ui/`, only if used 2+ places.
- **New global behaviour** → a provider in `providers/`, mounted in the root
  layout. Read [providers.md](./providers.md) first — order matters.
