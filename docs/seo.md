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

A single `@graph` in `layout.tsx` with three linked nodes:

| Node | Notes |
| --- | --- |
| `ProfessionalService` | Name, description, `email`, `telephone` (both numbers), `areaServed: "IN"`, `priceRange`, `sameAs: [instagram]` |
| `WebSite` | Publisher → the organisation node |
| `FAQPage` | Generated from `faqs` in `lib/content` |

It's built from `brand` and `faqs`, so **contact details and FAQs can never drift
out of sync with the visible page** — that's the whole point of sourcing it from
content rather than duplicating literals.

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

## Known gaps

- **No OG image.** `openGraph` declares no `images`, so link previews render
  without artwork. Add `app/opengraph-image.png` (1200×630) — Next picks it up by
  convention. Worth doing; it's the highest-value SEO item outstanding.
- **Calendly link is still a placeholder** (`calendly.com/localrise`) in
  `components/sections/Contact.tsx`.

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

**More schema** (e.g. `BreadcrumbList`) → add a node to the `@graph` and link it
by `@id`, rather than emitting a second script tag.
