# LocalRise

**Helping local businesses grow online.**

A premium, conversion-focused marketing website for a digital agency that helps local Indian businesses get online, get found on Google, and connect with customers over WhatsApp.

Built to feel calm, trustworthy and expensive — while speaking in plain language a clinic, restaurant or shop owner actually understands.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** design system (tokens in `tailwind.config.ts`)
- **Framer Motion** for scroll reveals, magnetic buttons and micro-interactions
- **Self-hosted fonts** via `@fontsource` (Space Grotesk display + Inter body) — no external font requests
- SEO: metadata, Open Graph, Twitter cards, JSON-LD (`ProfessionalService` + `FAQPage`), `sitemap.ts`, `robots.ts`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Project structure

```
app/          routes — homepage, /why-us/, /contact/, /services/[slug]/, /concepts/**
components/   ui/, layout/, sections/, illustrations/, concepts/, live/, contact/,
              cart/, audio/, onboarding/, analytics/
lib/          content/ (all site copy), communication/, analytics/, + small
              single-purpose modules (utils, palette, navigation, onboarding)
providers/    AudioProvider, CartProvider
hooks/        useScrollLock, useCarousel
public/       served as-is (images, video, audio, fonts pulled in via @fontsource)
assets/       committed source files public/ assets are derived from
temp/         intake-only staging folder for new assets — always empty besides a README
docs/         how the systems work
knowledge/    why they're that way, and what already broke
```

Full breakdown, naming conventions, and "where does a new file go" guidance:
[docs/repository-structure.md](./docs/repository-structure.md).

## Customising

Almost everything you'll want to change lives in **`lib/content/`** (a barrel
of files split by domain — see `lib/content/index.ts`) — copy, prices,
services, packages, industries, FAQs, and the `brand` object.

### ⚠️ Still placeholders

Contact details in `lib/content/brand.ts` → `brand` (phone, WhatsApp, email, Instagram) are live. Remaining:

- "Schedule a meeting" link → `components/contact/ContactMethods.tsx` (currently `calendly.com/localrise`)
- Canonical domain / site URL — hard-coded per-file rather than centralised; see [knowledge/tech-debt.md](./knowledge/tech-debt.md) #5

### Design tokens

- **Colours, radii, shadows, type scale, animations** → `tailwind.config.ts`
- Accent colour is a single electric blue (`accent.DEFAULT` `#2F5BFF`). Change it in one place to re-theme.

## How the contact form works

There is no backend. On submit, `components/contact/ContactForm.tsx` composes the visitor's details into a message via `lib/communication/` and **opens WhatsApp** (`wa.me`) pre-filled — so leads land directly in the owner's chat. Every other "start a conversation" CTA site-wide (cart, package/service/concept buttons) goes through the same layer. Swap `openWhatsApp()` in `lib/communication/` if you'd rather POST to an API/CRM.

## Accessibility & performance

- Semantic landmarks, keyboard-operable accordions/tabs, visible focus rings, `prefers-reduced-motion` respected
- No external network calls at runtime (fonts self-hosted, icons inline) → fast, private, resilient

## Deployment

Live at **localrise.in**, on **Hostinger** shared hosting via its GitHub integration.

Hostinger clones the repo into `public_html` and serves it as-is — it does **not** run a build. Since `main` holds source only (`/out/` is gitignored), it can't be served directly. So:

1. Push to `main`.
2. `.github/workflows/deploy.yml` runs `npm ci && npm run build` and force-pushes the contents of `out/` to the **`deploy`** branch.
3. Hostinger is pointed at `deploy` (hPanel → Websites → localrise.in → Advanced → GIT), where `index.html` sits at the root.

**`deploy` is generated — never commit to it by hand; it gets force-pushed on every build.** All real work happens on `main`.

`public/.htaccess` is copied into the build and configures the 404 page and asset caching.

---

© LocalRise. Made for local businesses in India.
