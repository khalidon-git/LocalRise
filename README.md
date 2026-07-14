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
app/
  layout.tsx        Fonts, SEO metadata, JSON-LD structured data
  page.tsx          Composes every section in order
  globals.css       Design tokens, base styles, utilities
  icon.svg          Favicon (LocalRise mark)
  sitemap.ts robots.ts
components/
  Icon.tsx          Dependency-free line-icon set
  ui/               Button, Reveal/Stagger, Magnetic, SectionHeading, Logo
  sections/         Nav, Hero, HeroDashboard, TrustBar, Services, Packages,
                    PackageCard, IndividualServices, Industries, Portfolio,
                    Process, WhyChooseUs, Testimonials, FAQ, Contact,
                    Footer, WhatsAppButton
lib/
  data.ts           ALL site content (copy, pricing, services, FAQs…)
  utils.ts          cx() + formatINR()
```

## Customising

Almost everything you'll want to change lives in **`lib/data.ts`** — copy, prices, services, packages, industries, FAQs, and the `brand` object.

### ⚠️ Replace before launch (currently placeholders)

In `lib/data.ts` → `brand`:
- `phoneDisplay` / `phoneHref` — real phone number
- `whatsappHref` — real WhatsApp number (digits only, incl. country code, no `+`)
- `email` — real email

Elsewhere:
- Social links → `components/sections/Footer.tsx`
- "Schedule a meeting" link → `components/sections/Contact.tsx` (currently `calendly.com/localrise`)
- Canonical domain / site URL → `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` (currently `https://localrise.in`)
- Add a real `opengraph-image` (e.g. `app/opengraph-image.png`) for rich link previews

### Design tokens

- **Colours, radii, shadows, type scale, animations** → `tailwind.config.ts`
- Accent colour is a single electric blue (`accent.DEFAULT` `#2F5BFF`). Change it in one place to re-theme.

## How the contact form works

There is no backend. On submit, the form composes the visitor's details into a message and **opens WhatsApp** (`wa.me`) pre-filled — so leads land directly in the owner's chat. Swap `onSubmit` in `Contact.tsx` if you'd rather POST to an API/CRM.

## Accessibility & performance

- Semantic landmarks, keyboard-operable accordions/tabs, visible focus rings, `prefers-reduced-motion` respected
- No external network calls at runtime (fonts self-hosted, icons inline) → fast, private, resilient
- Deploy to **Vercel** (zero-config) or any Node host.

---

© LocalRise. Made for local businesses in India.
