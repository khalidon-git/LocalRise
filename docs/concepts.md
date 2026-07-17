# Concept Websites

## Purpose

Show design range through **premium fictional websites** for different
industries. A young studio has no client logos to show; these prove capability
without borrowing anyone else's work — or implying clients we don't have.

> **These are design concepts, never client projects.** Every surface badges them
> ("Design Concept"), the detail page states the business is fictional in prose,
> and the JSON-LD `abstract` says so too. This is load-bearing — see the honest-
> content rules in [content.md](./content.md). Do not let these drift into
> implied case studies or add invented metrics.

Replaces the old `Portfolio` section (same intent, richer model).

## Key files

| File | Role |
| --- | --- |
| `lib/content/concepts.ts` | Data + types. **The whole system derives from this.** |
| `components/concepts/ConceptMock.tsx` | Code-rendered desktop preview (6 layouts) |
| `components/concepts/ConceptPhone.tsx` | Code-rendered mobile preview |
| `components/concepts/ConceptCard.tsx` | Listing card |
| `components/sections/Concepts.tsx` | Homepage teaser (first 4 + link to listing) |
| `app/concepts/page.tsx` | Listing page |
| `app/concepts/[slug]/page.tsx` | Detail page |

## Routes

| Route | Notes |
| --- | --- |
| `/concepts/` | Listing, `CollectionPage` schema |
| `/concepts/[slug]/` | Detail, `CreativeWork` + `BreadcrumbList` |

Both feed `app/sitemap.ts` automatically. Nav "Work" → `/#concepts` (the
homepage teaser).

## Data flow

```
lib/content/concepts.ts
   │
   ├──► components/sections/Concepts.tsx   (homepage: first 4)
   ├──► app/concepts/page.tsx              (listing: all)
   ├──► app/concepts/[slug]/page.tsx       (detail: generateStaticParams)
   └──► app/sitemap.ts                     (URLs)
              │
              └──► ConceptCard ──► ConceptMock / ConceptPhone
                                        ▲
                            concept.identity + concept.preview
```

## How the visual identity works

Each concept carries an `identity` (colour, typography, corner radius) and a
`preview` (layout variant + fake copy). `ConceptMock` is **one component with six
layouts** — `centered`, `bold`, `editorial`, `grid`, `dark`, `split` — so the
previews read as genuinely different studios rather than one template recoloured.

| Concept | Identity | Layout |
| --- | --- | --- |
| Aarohi Dental | Cool blue, sans, soft | `centered` |
| Spice Route Kitchen | Saffron/chilli, display, bold | `bold` |
| Veranda Stays | Forest green + cream, **serif**, sharp | `editorial` |
| Urban Nest Furniture | Terracotta + oat, sans | `grid` |
| Iron & Oak Fitness | Near-black + lime, **mono**, square | `dark` |
| Bloom Beauty Studio | Blush + plum, **serif**, heavy curves | `split` |

### Two constraints worth knowing

**Typography uses system stacks.** `font-serif` (Georgia) and `font-mono` were
added to `tailwind.config.ts` rather than new webfonts: they cost **zero bytes and
no external request**, which the whole site depends on ([seo.md](./seo.md)).
Don't add `@fontsource` packages just for previews.

**Every colour is a literal Tailwind class string** in `concepts.ts`
(`"bg-[#C6F24E]"`). Tailwind's JIT scans source text, so a computed
`` `bg-[${hex}]` `` produces **no CSS** and fails silently. Keep them literal.
See [content.md](./content.md).

## Why previews are code-rendered

No raster images. Same reason as the rest of the site: instant load, no binary
assets, nothing to optimise, and each preview stays editable in source. The
mockups are pure markup, so they work in server components and the static export.

If real screenshots are ever wanted, add an optional `image?: string` to
`Concept` and let it override `ConceptMock` — the old `projects.ts` used exactly
that pattern.

## "Live Demo"

There is deliberately **no separate live demo site**. The detail page *is* the
demo: a large desktop preview plus the phone view. A "Live Demo" button opening
nothing (or a dead link) would undercut the trust the rest of the site is built
on.

Building real browsable demos (`/concepts/[slug]/demo`) is a viable future step —
it's a full fictional site per concept, so scope it one at a time.

## SEO & accessibility

- `CollectionPage` (listing) and `CreativeWork` + `BreadcrumbList` (detail).
  **Not** portfolio/`Review` schema — that would imply client work.
- Canonicals, OG and Twitter per page; trailing slashes match `trailingSlash: true`.
- Visible breadcrumb matches the `BreadcrumbList` markup.
- One `<h1>` per detail page (the concept name).
- Whole card is a single link — one tap target, no nested interactives.
- Mock text is real text (not images), so it scales and is selectable.

## Extending

**Add a concept** — append one object to `concepts` in `lib/content/concepts.ts`.
The listing, detail page, sitemap, homepage teaser and "more concepts" all pick it
up. Nothing else to touch. Choose:

1. A `slug` (URL), `industry`, and honest `summary`/`description`.
2. An `identity` — pick colours that suit the industry, and a `font`/`radius`
   that carries the personality. **Literal class strings.**
3. A `preview.layout` from the six variants, plus plausible fake copy.

**Add a layout variant** — add a branch in `ConceptMock` and extend the
`ConceptPreview["layout"]` union. TypeScript will flag every concept needing a
decision.

**Never** add fake testimonials, invented metrics, or real brand names/logos to a
concept. The honesty is the point.
