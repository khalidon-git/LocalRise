# Changelog

Notable changes, newest first. Commit hashes link the detail; this records the
*why* at a level a reader can scan.

Deploy = push `main` → GitHub Action rebuilds the `deploy` branch → **Redeploy**
in hPanel. See [deployment.md](./deployment.md).

---

## 2026-07-21

### Consent-gated Website WhatsApp Click conversion

Configured the owner-supplied Google Ads conversion destination for genuine
WhatsApp contact actions. Every production WhatsApp CTA already converges on
`lib/communication/startConversation()`; that seam now queues exactly one Ads
conversion per accepted-consent click before opening the unchanged `wa.me`
destination. Absent or denied consent remains a tracking no-op.

---

## 2026-07-18

### Indexing fixes + GA4/Google Ads conversion tracking
An audit found `localrise.in` had **zero pages indexed by Google** despite the
site being technically crawlable — most likely fallout from the historical
403 ([BUG-005](../knowledge/bugs/005-hostinger-served-source-403.md)), plus a
few real gaps fixed here: `www.localrise.in` was serving a live duplicate of
every page instead of redirecting to the canonical non-www host (fixed via a
301 in `public/.htaccess`); `FAQPage` schema had been silently dropped from
`layout.tsx` during the `/why-us/` restructure and was never re-added — moved
there as a page-level script, built from the same `faqs` it displays; service
pages had no `BreadcrumbList` schema, now added alongside the existing
`Service` node; and the long-standing missing OG/Twitter share image is now a
static `app/opengraph-image.png` (the "proper" `next/og`-generated route hits
a Windows-only crash in `@vercel/og`, documented in `docs/seo.md`).

Also added **GA4 + Google Ads conversion tracking** (`lib/analytics/config.ts`,
`components/analytics/GoogleTag.tsx`) — a second, deliberate exception to the
zero-external-request rule, scoped to `gtag.js` only, since LocalRise is
running outbound Google Ads and needs to attribute leads
([ADR-008](../knowledge/decisions/008-analytics-conversion-tracking.md)).
Ships with obvious placeholder IDs; inert (zero external requests) until the
owner pastes real ones. WhatsApp conversation starts now fire a conversion
event via the existing `lib/communication/` layer.

### Channel-agnostic communication layer — `12c9672`
New `lib/communication/` is now the single entrypoint for every "start a
conversation" CTA site-wide (contact form, cart, package/service/industry/
concept CTAs). `StartConversationInput` is a discriminated union on `type`;
`buildMessage()` composes the plain-text body; `openWhatsApp()` picks between
`brand.whatsappHref`/`whatsappAltHref` once per session (persisted in
`sessionStorage`) and opens `wa.me`. Shaped so a second channel (email, a
future chatbot) is a new case, not a rewrite — see `Channel` type. The contact
form moved off the homepage to its own `/contact/` route
(`components/contact/ContactForm.tsx`); it has no submission backend, matching
the static-export constraint — submitting opens WhatsApp with the fields
pre-filled, same pattern the cart already used.

## 2026-07-17

### Concept live sites + subagent workflow
Ten Concept Websites replace the previous six, matched to a fixed premium
brief (restaurant, dental, hotel, real estate, gym, fashion, interior design,
architecture, SaaS, wedding photography). Each now has a real, independent,
chrome-free site at `/concepts/[slug]/live/` — own nav, hero, story, services,
an industry-specific section (menu/rooms/treatments/listings/programs/
lookbook/projects/packages, or a code-rendered dashboard + pricing for the
SaaS concept), gallery, testimonials, FAQ and contact — themed independently
via `lib/content/conceptSites.ts`. LocalRise's chrome is suppressed on that
route by a new `SiteChrome` component
([ADR-007](../knowledge/decisions/007-concept-live-sites.md), supersedes
[ADR-005](../knowledge/decisions/005-no-live-demo-button.md)). Live routes use
real, verified Unsplash photography as a scoped exception to the site's usual
zero-external-request rule; every live site still carries a permanent "Design
Concept by LocalRise" disclosure and CTA back to `/#contact`, and routes are
`noindex` + excluded from the sitemap. Also added `.claude/agents/` — ten
specialised subagents (ui-builder, nextjs-expert, animation-specialist,
seo-copywriter, content-architect, performance-optimizer, refactor-engineer,
design-reviewer, code-reviewer, project-architect) and a root `CLAUDE.md`
routing future work to them.

### Concept Websites — `8ff5dc4`
Six fictional concept sites (clinic, restaurant, hotel, furniture, gym, salon),
each with a distinct identity: palette, typography (system serif/mono), corner
radius and one of six preview layouts. Replaces the old Portfolio section.
Adding a concept is one object in `lib/content/concepts.ts`.
New routes `/concepts/` and `/concepts/[slug]/` — site went 14 → 21 pages.
Deliberately **no "Live Demo" button** — the detail page *is* the demo
([ADR-005](../knowledge/decisions/005-no-live-demo-button.md)).
Also fixed sitemap trailing slashes ([BUG-007](../knowledge/bugs/007-sitemap-trailing-slash.md)).

### SEO audit — `1a384f5`
Audited source, build and live site directly (referenced reports were never
attached). Four fixes worth doing; documented why the rest isn't.
See [seo-audit.md](./seo-audit.md).

### Removed testimonials + eyebrow labels — `df11dd8`
Deleted the Testimonials section entirely and every eyebrow/kicker label
sitewide. Section padding tightened 80/96/120 → 56/64/80px. Headings and
descriptions kept — the labels only restated them.

### Welcome modal + docs — `444d4f1`
First-visit modal offering the guided audio experience or silent browsing;
choice persisted in localStorage. Required consent-gating the audio engine
([BUG-004](../knowledge/bugs/004-gesture-fallback-hijacked-browse-silently.md)).
Added the `docs/` knowledge base.

### Restructure — `488a3d0`
`components/{ui,layout,sections,cart,audio}`, `providers/`, `hooks/`, and
`lib/data.ts` (512 lines) split into `lib/content/*` behind a barrel.
`useCarousel` extracted (`IndividualServices` 220 → 137 lines).
Right-sized deliberately — no `features/`/`services/` ceremony
([ADR-001](../knowledge/decisions/001-right-sized-architecture.md)).

### Persistent audio — `3a9c5f3`
Fixed audio restarting on navigation and "only starting after navigating".
Root cause was raw `<a>` internal links forcing full page loads
([BUG-001](../knowledge/bugs/001-raw-anchor-destroys-audio.md)), plus a
self-disabling gesture fallback
([BUG-002](../knowledge/bugs/002-gesture-fallback-self-disabling.md)).
Also fixed a scroll-lock conflict
([BUG-003](../knowledge/bugs/003-scroll-lock-conflict.md)).

### Audio optimisation — `9b16b70`
Opus 32k (417 KB) + MP3 48k (601 KB) fallback, both encoded from the original
128k master. Down from 1,635 KB (**-75%**). `preload="none"` so visitors who
never interact download nothing.

### Live for the first time — `2026-07-17`
localrise.in served a **403 for its entire existence** until this point:
Hostinger was pointed at `main` (raw `.tsx` source, no `index.html`).
Fixed by pointing it at the built `deploy` branch
([BUG-005](../knowledge/bugs/005-hostinger-served-source-403.md)).

---

## 2026-07-16

- Illustration system: hero scene, per-industry visuals, spot scenes; colour
  rolled across every section (`5067eb6`, `0ec68cf`).
- Intro audio added (`0c201ed`).
- Real contact details, second phone number, Instagram; removed dead social
  links and the leftover Vercel link.
- Stopped tracking `.next/` and `out/` — 163 build artifacts had been committed
  ([BUG-006](../knowledge/bugs/006-build-artifacts-tracked.md)).
