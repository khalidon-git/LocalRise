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
| **Mock preview** | `lib/content/concepts.ts` | Card + detail-page code-rendered preview (`ConceptMock`/`ConceptPhone`) |
| **Live site** | `lib/content/conceptSites.ts` | The full, independent site at `/concepts/<slug>/live/` |

Both are keyed by the same `slug` — adding concept #11 means appending one
object to **each** file. Everything else (listing, detail page, live route,
homepage teaser) derives from these two arrays.

## Key files

| File | Role |
| --- | --- |
| `lib/content/concepts.ts` | Mock preview data + types (`Concept`, `ConceptIdentity`, `ConceptPreview`) |
| `lib/content/conceptSites.ts` | Live-site data + types (`ConceptSite`, `LiveTheme`, …) — verified real photography from Unsplash, per-brand copy |
| `components/concepts/ConceptMock.tsx` | Code-rendered desktop preview (6 layouts) |
| `components/concepts/ConceptPhone.tsx` | Code-rendered mobile preview |
| `components/concepts/ConceptCard.tsx` | Listing card — mock preview + Live Preview + Build Something Similar |
| `components/sections/Concepts.tsx` | Homepage teaser (first 4 + link to listing) |
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
Nav "Work" → `/#concepts` (the homepage teaser).

## How the mock preview works (unchanged)

Each concept carries an `identity` (colour, typography, corner radius) and a
`preview` (layout variant + fake copy). `ConceptMock` is **one component with
six layouts** — `centered`, `bold`, `editorial`, `grid`, `dark`, `split` — so
the previews read as genuinely different studios rather than one template
recoloured. See the table in git history / `concepts.ts` comments for the
current layout assignment per concept.

### Two constraints worth knowing (mock preview only)

**Typography uses system stacks.** `font-serif` (Georgia), `font-mono` and
`font-display` are existing Tailwind tokens — zero bytes, no external request.

**Every colour is a literal Tailwind class string** in `concepts.ts`
(`"bg-[#C6F24E]"`). Tailwind's JIT scans source text, so a computed
`` `bg-[${hex}]` `` produces **no CSS** and fails silently. Keep them literal.
See [content.md](./content.md).

## How the live site works

`ConceptSite.theme` holds two *different kinds* of literal value, and mixing
them up is the most likely mistake when adding a concept:

- **`font` / `headFont` / `radius` / `tracking`** — literal Tailwind class
  names (`"font-serif"`, `"rounded-2xl"`), applied directly as `className`.
  Same pattern as `ConceptMock`'s `identity`.
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
- Mock text is real text (not images), so it scales and is selectable.

## Extending

**Add a concept** — append one object to `concepts` in `concepts.ts` **and**
one to `conceptSites` in `conceptSites.ts`, same `slug` in both. Choose:

1. A `slug`, `industry`, and honest `summary`/`description` (`concepts.ts`).
2. A mock `identity` + `preview.layout` from the six `ConceptMock` variants.
3. A live `theme` — colours as raw hex/rgba, `font`/`headFont`/`radius` as
   **literal** Tailwind class names, a `heroStyle` (full-bleed / split /
   editorial-grid / centered-stat / product).
4. Live content: `hero`, `about`, `services` (4 items), a `showcase` (pick a
   `kind`) or, for a SaaS-shaped business, `dashboard` + `pricing` instead,
   `gallery`, `testimonials`, `faq`, `contact`.
5. Verify every image URL returns `200` before committing it.

**Add a live-site layout variant** — extend `LiveTheme["heroStyle"]` and add a
branch in `components/live/LiveHero.tsx`, the same way `ConceptMock` grows a
layout variant.

**Never** add fake testimonials with real people's names/photos, invented
metrics that could mislead, or drop the "Design Concept by LocalRise"
disclosure from a live site's footer. The honesty is the point.
