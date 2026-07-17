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

```
app/
  layout.tsx              root layout: metadata, JSON-LD, providers, chrome
  page.tsx                homepage — composes sections in order
  services/[slug]/page.tsx  per-service pages (generateStaticParams)
  sitemap.ts robots.ts globals.css icon.svg

components/
  ui/            primitives: Button, SmartLink, Icon, Logo, Reveal, Magnetic,
                 SectionHeading
  layout/        site chrome rendered by the root layout: Nav, Footer,
                 WhatsAppButton
  sections/      homepage/service page content blocks
  illustrations/ inline SVG artwork: HeroScene, SpotScenes
  cart/          CartDrawer
  audio/         AudioToggle (UI only)
  onboarding/    WelcomeModal

providers/       AudioProvider, CartProvider  (React context + engines)
hooks/           useScrollLock, useCarousel
lib/
  content/       all site copy, split by domain, re-exported via index.ts
  utils.ts       cx(), formatINR()
  palette.ts     rotating brand gradients
  navigation.ts  isInternalHref()
  onboarding.ts  localStorage preference
public/          intro.ogg, intro.mp3, .htaccess
docs/            you are here
```

### Why this shape, and not `features/` + `services/`

This is a **2-route**, ~50-file site with no backend. An enterprise scaffold
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
