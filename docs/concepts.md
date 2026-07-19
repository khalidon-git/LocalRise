# Concept Websites

## Purpose

Show design range through **premium fictional websites** for different
industries. A young studio has no client logos to show; these prove capability
without borrowing anyone else's work — or implying clients we don't have.

> **These are design concepts, never client projects.** Every surface badges
> them ("Design Concept"), the detail page states the business is fictional in
> prose, and live sites carry the same disclosure in their footer. This is
> load-bearing — see the honest-content rules in [content.md](./content.md).
> Do not let these drift into implied case studies or add invented metrics.

Replaces the old `Portfolio` section (same intent, richer model). The ten
concepts map exactly to the categories in
[knowledge/decisions/007](../knowledge/decisions/007-concept-live-sites.md):
Luxury Restaurant, Premium Dental Clinic, Boutique Hotel, Luxury Real Estate,
Modern Fitness Gym, Fashion Brand, Interior Design Studio, Architecture Firm,
SaaS Startup, Wedding Photography Studio.

## Two layers, two files

| Layer | File | Powers |
| --- | --- | --- |
| **Card/detail data** | `lib/content/concepts.ts` | Copy (`name`, `industry`, `summary`, `description`, `features`, `designNotes`) plus `identity` (palette/type chip) and `preview.domain` (the browser-chrome URL bar on `ScreenshotMock`) |
| **Live site** | `lib/content/conceptSites.ts` | The full, independent site at `/concepts/<slug>/live/` |

Both are keyed by the same `slug` — adding concept #11 means appending one
object to **each** file. Everything else (listing, detail page, live route,
homepage teaser) derives from these two arrays.

## Key files

| File | Role |
| --- | --- |
| `lib/content/concepts.ts` | Concept data + types (`Concept`, `ConceptIdentity`, `ConceptPreview`) — `identity`/`preview` still drive the palette chip and `/concepts/[slug]/live/` isn't affected by this file |
| `lib/content/conceptSites.ts` | Live-site data + types (`ConceptSite`, `LiveTheme`, …) — verified real photography from Unsplash, per-brand copy |
| `components/concepts/ConceptCard.tsx` | Listing card — real screenshot + Live Preview + Build Something Similar |
| `components/sections/FeaturedConcepts.tsx` | Homepage teaser — two curated concept cards (real screenshots) plus a CTA to the full `/concepts/` library |
| `components/concepts/ScreenshotMock.tsx` / `ScreenshotPhone.tsx` | Real-screenshot framing — a captured `<img>` inside browser-chrome/phone-bezel markup. Used everywhere a concept preview is shown: `ConceptCard`, the `/concepts/[slug]/` hero, and `FeaturedConcepts` |
| `scripts/capture-concept-screenshots.mjs` | Regenerates `public/concepts-shots/*.jpg` — **run this after any change to a concept's live site** |
| `app/concepts/page.tsx` | Listing page |
| `app/concepts/[slug]/page.tsx` | Detail page (mock preview, features, design notes) |
| `app/concepts/[slug]/live/page.tsx` | **Live site** — full, chrome-free, independent page |
| `components/live/*` | The live-site rendering engine (Nav, Hero, About, Services, Showcase, Dashboard, Pricing, Gallery, Testimonials, FAQ, Contact, Footer) |
| `components/layout/SiteChrome.tsx` | Suppresses LocalRise's Nav/Footer/etc on `/concepts/*/live/` routes |

## Routes

| Route | Notes | Indexed? |
| --- | --- | --- |
| `/concepts/` | Listing, `CollectionPage` schema | Yes |
| `/concepts/[slug]/` | Detail, `CreativeWork` + `BreadcrumbList` | Yes |
| `/concepts/[slug]/live/` | Full independent live site, no LocalRise chrome | **No** — `robots: { index: false, follow: true }` |

The listing and detail routes feed `app/sitemap.ts`; live routes are
deliberately **excluded** from the sitemap (noindex pages shouldn't be listed).
Nav "Work" → `/#concepts` (the homepage teaser section, `FeaturedConcepts.tsx`).
The homepage only ever shows two curated concepts (`noir-and-vine` and
`meridian-dental`, picked directly by `slug`) — the full ten live at
`/concepts/`, driven directly by `concepts` (all ten), not by the separate
9-category `industries` list `Contact.tsx`'s business-type dropdown uses.

## Real screenshots everywhere a concept is previewed

Every place a concept gets previewed — `FeaturedConcepts.tsx` (homepage),
`ConceptCard.tsx` (the `/concepts/` grid and detail-page "more concepts"),
and the `/concepts/[slug]/` hero — uses `ScreenshotMock` + `ScreenshotPhone`:
a captured `<img>` inside browser-chrome/phone-bezel framing. There is no
code-rendered fallback anymore; the earlier `ConceptMock`/`ConceptPhone`
components (six layout variants driven by `identity`/`preview`) were deleted
once nothing consumed them.

This started as a scoped exception for the homepage only, extending the
photography exception [ADR-007](../knowledge/decisions/007-concept-live-sites.md)
established for live concept pages — see that ADR's "Update" note for why it
was widened to every card/detail surface. Payload stays bounded because
`loading="lazy"` means only the screenshots actually scrolled into view ever
load (~60–130 KB per image, ~1.2 MB total across all 10 concepts if every
card were visible at once).

**These are static captures, not generated at build time** —
`scripts/capture-concept-screenshots.mjs` drives a headless browser against
each `/concepts/<slug>/live/` page and saves the result to
`public/concepts-shots/<slug>-{desktop,mobile}.jpg`. **Nothing warns you if a
screenshot goes stale.** Re-run the script (see the file header for exact
steps — Playwright is installed on demand, not a project dependency, same
pattern as the `ffmpeg-static` audio recipe in
[deployment.md](./deployment.md)) whenever a concept's copy, theme, or layout
changes in `conceptSites.ts`.

`concepts.ts`'s `identity` (colour/type/radius) still drives the small
gradient icon chip on `FeaturedConcepts` and the palette swatch on the
detail page. `preview.domain` is the only `preview` field still consumed
(the URL shown in `ScreenshotMock`'s browser-chrome bar) — the rest of
`ConceptPreview` (`layout`, `nav`, `heroKicker`, `heroTitle`, `heroSub`,
`cta`, `cards`) is unused now that nothing code-renders a mock from it. It's
left in place rather than stripped out with this change; trimming the type
and all ten data entries is a separate cleanup if it's ever worth doing.

## How the live site works

`ConceptSite.theme` holds two *different kinds* of literal value, and mixing
them up is the most likely mistake when adding a concept:

- **`font` / `headFont` / `radius` / `tracking`** — literal Tailwind class
  names (`"font-serif"`, `"rounded-2xl"`), applied directly as `className`.
  Same pattern as `concepts.ts`'s `identity`.
- **`bg` / `ink` / `brand` / … (colours)** — raw hex/rgba strings, applied as
  CSS custom properties via inline `style` on the page root
  (`components/live/LiveNav.tsx`'s `themeVars()`), then consumed through
  **literal** arbitrary-value classes like `bg-[var(--lv-bg)]`,
  `text-[var(--lv-ink)]` in every `components/live/*` file. The class string
  itself never changes between themes — only the CSS variable's value does —
  which is what keeps this safe under Tailwind's JIT. See `app/globals.css`'s
  `.lv-root` comment block for the full explanation.

`LiveSite` (`components/live/LiveSite.tsx`) is the orchestrator: it composes
Nav → Hero → About → Services → (Showcase, or Dashboard+Pricing for SaaS) →
Gallery → Testimonials → FAQ → Contact → Footer, all driven by one
`ConceptSite` object. Nine concepts get `LiveShowcase` (menu/rooms/treatments/
listings/programs/lookbook/projects/packages — one flexible card grid, styled
by `kind`); the SaaS concept (Flowstack) gets `LiveDashboardSection` +
`LivePricing` instead, because a photography-led "showcase" doesn't fit a
product — see `dashboard`/`pricing` fields on `ConceptSite`.

### Why live sites use real photography (the one deliberate exception)

The rest of LocalRise is zero-external-request (self-hosted fonts, inline
SVG). Live concept sites use real photography from `images.unsplash.com`
because the brief for this feature required "large photography" and
"editorial quality" that inline SVG can't deliver. This is a **scoped**
exception — confined to `components/live/*` and the `/concepts/*/live/`
routes. Full reasoning, alternatives considered, and the fallback plan if this
becomes unsustainable: [ADR-007](../knowledge/decisions/007-concept-live-sites.md).

Every image URL in `conceptSites.ts` was verified to return `200` before use.
If you add a new image, verify it the same way — a dead Unsplash ID fails
silently as a broken `<img>`, which is exactly the kind of "green build, broken
page" trap [BUG-005](../knowledge/bugs/005-hostinger-served-source-403.md) warns
about.

### Chrome suppression

`components/layout/SiteChrome.tsx` is a small client component (checks
`usePathname()`) that renders LocalRise's `Nav`/`Footer`/`WhatsAppButton`/
`AudioToggle`/`CartDrawer`/`WelcomeModal` everywhere **except**
`/concepts/[slug]/live/`. `app/layout.tsx` still stays a server component —
see [seo.md](./seo.md) on why that must never change; `SiteChrome` is what
makes the pathname-based branching possible without touching that constraint.

### The one place honesty is non-negotiable

`LiveFooter` renders a permanent **"Design Concept by LocalRise"** badge and a
**"Love this style? Build something similar"** CTA back to `/#contact`, on
every live site, every time. This is what keeps the illusion honest per
[ADR-004](../knowledge/decisions/004-honest-content-policy.md) — see
[ADR-007](../knowledge/decisions/007-concept-live-sites.md) for why this
supersedes the earlier "no Live Demo button" decision.

Contact info on live sites (`LiveContact`) renders as **plain text**, never as
functional `tel:`/`mailto:` links — these are fictional businesses with no
real phone line or inbox, and a non-interactive display can't mislead anyone
into thinking otherwise. All real CTAs (`hero.cta`, nav "contact" links,
pricing "Get started") are in-page anchors to `#contact`, which always works.

## "Live Demo" (historical)

[ADR-005](../knowledge/decisions/005-no-live-demo-button.md) originally
rejected a "Live Demo" button because no real demo existed. That's no longer
true — [ADR-007](../knowledge/decisions/007-concept-live-sites.md) supersedes
it now that `/concepts/[slug]/live/` is real. Read both if you're touching this
system; ADR-005 explains *why* the button was withheld for so long, ADR-007
explains what changed.

## SEO & accessibility

- `/concepts/` and `/concepts/[slug]/` keep `CollectionPage` / `CreativeWork` +
  `BreadcrumbList` schema — **not** portfolio/`Review` schema, which would
  imply client work.
- `/concepts/[slug]/live/` carries **no JSON-LD** and is `noindex, follow` —
  it's a preview experience, not an entity that should rank or appear as a
  distinct business in search results.
- Canonicals, OG and Twitter per indexed page; trailing slashes match
  `trailingSlash: true`.
- Live-site images: `loading="eager"` + `fetchPriority="high"` on the hero
  image only; everything else `loading="lazy"`. Explicit `width`/`height` to
  reserve aspect ratio and avoid layout shift.
- Card/detail copy (name, industry, summary) is real text (not images), so it
  scales and is selectable; only the site preview itself is an `<img>`.

## Extending

**Add a concept** — append one object to `concepts` in `concepts.ts` **and**
one to `conceptSites` in `conceptSites.ts`, same `slug` in both. Choose:

1. A `slug`, `industry`, and honest `summary`/`description` (`concepts.ts`).
2. An `identity` (colour/type/radius, for the gradient icon chip and palette
   swatch) and a `preview.domain` (shown in `ScreenshotMock`'s browser-chrome
   bar) — the rest of `preview` is currently unused, see above.
3. A live `theme` — colours as raw hex/rgba, `font`/`headFont`/`radius` as
   **literal** Tailwind class names, a `heroStyle` (full-bleed / split /
   editorial-grid / centered-stat / product).
4. Live content: `hero`, `about`, `services` (4 items), a `showcase` (pick a
   `kind`) or, for a SaaS-shaped business, `dashboard` + `pricing` instead,
   `gallery`, `testimonials`, `faq`, `contact`.
5. Verify every image URL returns `200` before committing it.
6. Add the new `slug` to the list in `scripts/capture-concept-screenshots.mjs`
   and run it — every card/detail/homepage preview depends on that capture,
   so a missing entry is a broken image, not a graceful fallback.

**Add a live-site layout variant** — extend `LiveTheme["heroStyle"]` and add a
branch in `components/live/LiveHero.tsx`.

**Never** add fake testimonials with real people's names/photos, invented
metrics that could mislead, or drop the "Design Concept by LocalRise"
disclosure from a live site's footer. The honesty is the point.
