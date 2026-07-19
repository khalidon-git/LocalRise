# SEO & metadata

## Purpose

Local businesses find LocalRise through search. Everything here is static and
build-time — there is no server to render meta tags dynamically.

## Key files

| File | Role |
| --- | --- |
| `app/layout.tsx` | Global `metadata`, `viewport`, JSON-LD graph |
| `app/services/[slug]/page.tsx` | Per-page `generateMetadata` |
| `app/sitemap.ts` | Sitemap |
| `app/robots.ts` | robots.txt |
| `lib/content/*` | The source data for all of the above |

Canonical host is `https://localrise.in`, declared as a `siteUrl` constant in
`layout.tsx`, `sitemap.ts` and `robots.ts`. **Changing domain means updating all
three.**

## Global metadata

`app/layout.tsx` exports a `Metadata` object with `metadataBase`, a title
template (`%s · LocalRise`), description, keywords, Open Graph, Twitter card,
canonical and robots directives.

> `app/layout.tsx` must stay a **server component** to export `metadata`. Adding
> `"use client"` silently drops all of it. This is why providers are separate
> client components rather than inlined. See [providers.md](./providers.md).

## JSON-LD

`layout.tsx` emits a global `@graph` with two linked nodes, built from `brand`
so **contact details can never drift out of sync with the visible page**:

| Node | Notes |
| --- | --- |
| `ProfessionalService` | Name, description, `email`, `telephone` (both numbers), `areaServed: "IN"`, `priceRange`, `sameAs: [instagram]` |
| `WebSite` | Publisher → the organisation node |

Per-page schema is added inline on the page that actually renders the matching
content, not the global graph — so nothing emits on a page where a visitor
can't see it:

| Page | Schema | Source |
| --- | --- | --- |
| `/faq/` | `FAQPage` | `faqs` in `lib/content` — the only page rendering the complete FAQ |
| `/services/[slug]/` | `Service` + `BreadcrumbList` (Home → Services → title) | `serviceDetails` |
| `/concepts/` | `CollectionPage` | `concepts` |
| `/concepts/[slug]/` | `CreativeWork` + `BreadcrumbList` | `concepts` |

`FAQPage` briefly lived in the global graph and was emitting on every page
(including the homepage, where no FAQ is visible). It now lives on `/faq/`, following the same
per-page pattern already used by the concept pages.

Injected via `<script type="application/ld+json">` with `dangerouslySetInnerHTML`.
Safe here: the input is our own build-time content, not user data.

Validate changes with Google's Rich Results Test.

## Per-service pages

`generateMetadata({ params })` builds title/description per slug from
`serviceDetails`. `generateStaticParams` enumerates slugs — **required** for
static export; a slug missing from it simply won't exist.

## Sitemap & robots

`app/sitemap.ts` and `app/robots.ts` are Next's file conventions, emitted as
static `sitemap.xml` / `robots.txt`. The sitemap enumerates `/` plus each service
route from `lib/content`, so new services appear automatically.

## OG / Twitter image

`app/opengraph-image.png` (1200×630, static file) — Next's file convention
auto-wires `og:image` **and** `twitter:image` (Twitter inherits the OG image
when `twitter` declares none of its own, which is the case in `layout.tsx`).
Pure static-file copy, so it's fully `output: export`-compatible on any OS.

> We tried `app/opengraph-image.tsx` with `next/og`'s `ImageResponse` first —
> it's the more "proper" convention since it stays in sync with content
> automatically. It crashes at import on Windows (`@vercel/og`'s Node runtime
> does a `fileURLToPath` call that breaks under Windows path handling), and
> `runtime: "edge"` — the workaround — isn't allowed under `output: "export"`.
> If that gets fixed upstream, or builds move to Linux-only, it's worth
> revisiting. Until then, regenerate the static PNG by hand when the brand
> visuals change.

## Known gaps

- **Calendly link is still a placeholder** (`calendly.com/localrise`) in
  `components/contact/ContactMethods.tsx`. Blocked on the owner setting up a
  real Calendly account — can't be fixed in code.

## Analytics & conversion tracking

GA4 + Google Ads conversion tracking via `components/analytics/GoogleTag.tsx`
(mounted in `layout.tsx`, still a server component) and
`lib/analytics/config.ts`. This is a **second, deliberate exception** to the
site's zero-external-request rule — see
[ADR-008](../knowledge/decisions/008-analytics-conversion-tracking.md) for the
full reasoning (ADR-007 was the first, for concept-site imagery).

Ships with placeholder IDs — the tag renders nothing and the site makes no
external request until real GA4/Google Ads IDs are pasted into
`lib/analytics/config.ts`. `lib/communication/index.ts`'s
`trackConversationStart()` fires the conversion event once enabled.
**Before enabling in production, add a cookie/consent notice** — loading
`gtag.js` sets Google cookies, which typically requires visitor consent under
Indian (DPDP Act) and EU (GDPR) rules depending on audience. Not yet built;
flagged here so it isn't missed.

## Performance (SEO-adjacent)

Rankings care about speed, and this site is already strong: self-hosted fonts
(no external requests), inline SVG (no image payload), static HTML, `preload="none"`
on audio so non-interacting visitors download none of it.

`public/.htaccess` sets a 1-year immutable cache on `/_next/static/` only —
those filenames are content-hashed, so they can never go stale. **Don't widen
that rule to unhashed paths**; you'd be unable to ship a fix.

## Extending

**New route** → add it to `app/sitemap.ts`. Nothing else enumerates routes.

**Change contact details** → edit `brand` in `lib/content/brand.ts` only. Page
copy *and* JSON-LD update together.

**New FAQ** → append to `faqs`. It appears on the page and in `FAQPage` schema
automatically. Note `serviceDetails.faqPicks` are **array indices** — reordering
FAQs repoints them. See [content.md](./content.md).

**More schema** on an existing page → add it as a page-level inline
`<script type="application/ld+json">` (a `@graph` of related nodes if there's
more than one), following the pattern in `services/[slug]/page.tsx` or
`concepts/[slug]/page.tsx` — not the global graph in `layout.tsx`, which should
stay limited to things true on every page.
