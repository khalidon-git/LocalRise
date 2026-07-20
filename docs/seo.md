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
| `lib/seo/*` | Canonical constants, metadata builder and safe JSON-LD serializer |
| `lib/content/*` | The source data for all of the above |

Canonical host is `https://localrise.in`, declared once as `SITE_URL` in
`lib/seo/config.ts` and consumed by metadata, schema, sitemap and robots output.

## Global metadata

`app/layout.tsx` exports a `Metadata` object with `metadataBase`, a title
template (`%s | LocalRise India`), the homepage title/description, Open Graph,
Twitter, canonical, verification and detailed robots directives. Internal pages
use `createPageMetadata()` so canonicals and social images cannot drift.

> `app/layout.tsx` must stay a **server component** to export `metadata`. Adding
> `"use client"` silently drops all of it. This is why providers are separate
> client components rather than inlined. See [providers.md](./providers.md).

## JSON-LD

`layout.tsx` emits a global `@graph` with two linked nodes, built from `brand`
so **contact details can never drift out of sync with the visible page**:

| Node | Notes |
| --- | --- |
| `Organization` | Name/alternate names, verified logo/contact details, India service area, expertise and official Instagram profile; no fabricated address |
| `WebSite` | `LocalRise India`, locale and publisher → the organisation node |

The homepage adds its own `WebPage` node. It is deliberately not in the root
layout because that would claim every route is the homepage.

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
Every page uses `serializeJsonLd()`, which removes empty values and escapes `<`
and script-sensitive line separators. Inputs remain trusted build-time content.

Validate changes with Google's Rich Results Test.

## Per-service pages

`generateMetadata({ params })` builds title/description per slug from
`serviceDetails`. `generateStaticParams` enumerates slugs — **required** for
static export; a slug missing from it simply won't exist.

## Sitemap & robots

`app/sitemap.ts` and `app/robots.ts` are Next's file conventions, emitted as
static `sitemap.xml` / `robots.txt`. The sitemap enumerates canonical indexable
routes and deliberately omits build-time `lastmod`, arbitrary priority and
change-frequency values. Noindex ad/live-preview routes are excluded.

## OG / Twitter image

`app/opengraph-image.png` (1200×630, static file) — Next's file convention
provides the image asset. The root metadata and `createPageMetadata()` both
declare the absolute asset explicitly for Open Graph and Twitter cards.
Pure static-file copy, so it's fully `output: export`-compatible on any OS.

> We tried `app/opengraph-image.tsx` with `next/og`'s `ImageResponse` first —
> it's the more "proper" convention since it stays in sync with content
> automatically. It crashes at import on Windows (`@vercel/og`'s Node runtime
> does a `fileURLToPath` call that breaks under Windows path handling), and
> `runtime: "edge"` — the workaround — isn't allowed under `output: "export"`.
> If that gets fixed upstream, or builds move to Linux-only, it's worth
> revisiting. Until then, regenerate the static PNG by hand when the brand
> visuals change.

## Crawl and AI-discovery files

`public/llms.txt` provides a concise, factual page map. It is experimental and
does not guarantee indexing. `robots.ts` explicitly permits general crawlers,
OAI-SearchBot, GPTBot, Claude-SearchBot, Claude-User and ClaudeBot; the general
allow rule already covers them, while explicit rules make policy easy to adjust.

`scripts/submit-indexnow.mjs` is an opt-in deployment utility. It requires an
environment key, a deployed public verification file and explicit changed URLs.
It is not called from pages or every deployment.

## Analytics & conversion tracking

Consent-gated Google Ads measurement, with dormant GA4/conversion-event support,
lives in `components/analytics/GoogleTag.tsx` (mounted in the server
`layout.tsx`) and `lib/analytics/config.ts`. This is a **second, deliberate exception** to the
site's zero-external-request rule — see
[ADR-008](../knowledge/decisions/008-analytics-conversion-tracking.md) for the
full reasoning (ADR-007 was the first, for concept-site imagery).

The Google Ads account tag ID is configured. Before a visitor chooses Accept,
the client initializes a local Consent Mode v2 queue with `ad_storage`,
`analytics_storage`, `ad_user_data` and `ad_personalization` denied; it does not
render or request `gtag.js`. Accepting persists `localrise_consent_v1`, updates
all four fields to granted, and loads/configures the tag once. Rejecting keeps
the tag absent. The footer's Cookie preferences control lets visitors revise
the choice. Withdrawing after opt-in saves denied, clears recognised first-party
Google advertising cookies and reloads the page so the executed Google runtime
cannot continue in the document. GA4 and the Ads conversion label remain obvious placeholders, so
no GA4 or WhatsApp conversion event is emitted.

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
`concepts/[slug]/page.tsx`, and serialize with `serializeJsonLd()` — not the global graph in `layout.tsx`, which should
stay limited to things true on every page.
