# ADR-007 — Concept Websites get real, browsable "live" sites

**Date**: 2026-07-17 · **Status**: Accepted · **Supersedes**: [ADR-005](./005-no-live-demo-button.md)

## Context

[ADR-005](./005-no-live-demo-button.md) rejected a "Live Demo" button because no
real demo existed behind it — the detail page's code-rendered mock stood in for
one. ADR-005 explicitly left the door open: *"Real demos … remain viable. Scope
one concept at a time."*

A new brief asked for a premium **Concept Websites gallery**: ten fictional
brands, each feeling like an independent $50–80k agency site, with a genuine
"Live Preview" that opens a chrome-free, independent-feeling website — not a
mockup inside LocalRise's own nav/footer.

## Decision

Build real, browsable **"live" concept sites** at `/concepts/[slug]/live/`.

- Each is a full page: nav, hero, story, offering, gallery, testimonials, FAQ,
  contact, footer, plus 1–2 industry-specific sections — themed independently
  (palette, type, layout rhythm, imagery) so it doesn't read as a reskinned
  template.
- LocalRise's global chrome (`Nav`, `Footer`, `WhatsAppButton`, `AudioToggle`,
  `CartDrawer`, `WelcomeModal`) is **suppressed** on this route via `SiteChrome`
  (`components/layout/SiteChrome.tsx`), a small client component that checks
  the pathname. `app/layout.tsx` stays a server component — see
  [seo.md](../../docs/seo.md) on why that must never change.
- The illusion is real but never total: every live site carries one small,
  tasteful **"Design Concept by LocalRise"** badge and a **"Love this style? →
  Build something similar"** CTA back to LocalRise. This satisfies the honest-
  content policy ([ADR-004](./004-honest-content-policy.md)) without breaking
  immersion — the badge doesn't shout, but it's never absent.
- The old code-rendered `ConceptMock`/`ConceptPhone` previews **stay** on the
  listing and detail pages (`/concepts/`, `/concepts/[slug]/`) — they're the
  fast-loading, zero-image preview a visitor sees before committing to a full
  page load. "Live Preview" is now an additional, real destination, not a
  replacement for the mock.

## Why

The brief's central goal — *"I want MY business to look exactly like this,"*
not *"we can build your website"* — needs a visitor to forget they're on an
agency site for a few seconds. A card-sized mock inside LocalRise's own chrome
can't do that; a standalone page can.

ADR-005's objection (a button that opens nothing is a lie) no longer applies:
the button now opens something real.

## Alternatives rejected

| Option | Why not |
| --- | --- |
| Keep only the mock (status quo) | Doesn't deliver the "forget it's a demo" goal the brief asks for |
| External CDN images | Breaks the site's zero-external-request static-export identity |
| No fictional-business disclosure at all | Violates honest-content policy — would read as implied client work |
| Separate Next.js app/subdomain per concept | Massive infra overkill for a marketing site with no backend |

## Trade-offs

- **Cost**: ten more static routes, more images (see performance notes below),
  more surface area to keep on-brand and accessible.
- **Benefit**: the flagship feature of the whole gallery — a live site is far
  more persuasive than a mock, and it's still 100% honest.

## Implications for imagery (supersedes the "no raster images" assumption)

The rest of LocalRise is zero-external-request (self-hosted fonts, inline SVG,
`images: { unoptimized: true }`). Live concept sites use **real photography**
from Unsplash's CDN (`images.unsplash.com`), chosen because the brief requires
"large photography" and "editorial quality" that inline SVG cannot deliver.
This is a deliberate, scoped exception:

- Confined to `components/live/*` and the `/concepts/*/live/` routes — the
  rest of the site (services, packages, homepage) is untouched and stays
  zero-external-request.
- Every image URL was checked for a `200` response before use (see
  `lib/content/conceptSites.ts`); dimensions/quality are constrained via
  Unsplash's URL params (`w`, `q`, `auto=format`) to keep payload reasonable.
- `loading="lazy"` below the fold; hero images use `fetchpriority="high"` and
  are the only eagerly-loaded image per page.
- If this becomes a maintenance burden (dead links, licensing concerns), the
  fallback is `ConceptMock`'s approach: swap to code-rendered visuals per
  concept, one at a time — the component boundary (`LiveHero`, `LiveGallery`,
  etc.) already isolates where images are consumed.

## Future

Scope concept #11+ the same way: one data object in
`lib/content/conceptSites.ts`, reusing the `components/live/*` primitives.
Adding a genuinely new *layout personality* (not just new theme tokens) means
adding a new variant to the relevant `Live*` component, mirroring how
`ConceptMock` added layout variants.
