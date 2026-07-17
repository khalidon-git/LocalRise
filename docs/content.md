# Content (`lib/content`)

## Purpose

**Every piece of site copy, pricing and structured data lives here** — never
hard-coded in components. Change a phone number once and it updates the nav,
contact section, footer, WhatsApp links and the SEO schema together.

## Layout

```
lib/content/
  index.ts        barrel — always import from "@/lib/content"
  brand.ts        brand, nav, trustItems, stats
  services.ts     services (bento) + serviceDetails (pages) + individualServices
  packages.ts     packages, Package/Feature types
  industries.ts   industries + accent colours
  projects.ts     demo portfolio projects
  process.ts      process steps, whyChooseUs
  faqs.ts         faqs (also feeds FAQPage JSON-LD)
```

```ts
import { brand, services, packages } from "@/lib/content";
```

Split from a single 512-line `data.ts` for scannability. The barrel keeps imports
short and lets the file layout change without touching consumers.

## The three coupled shapes

**1. `services` ⇄ `serviceDetails`** — keyed by the same `id`. Adding a service to
both automatically produces `/services/<id>` via `generateStaticParams`. Add to
`services` only and the page 404s; add to `serviceDetails` only and it's
unreachable.

**2. `serviceDetails.faqPicks`** — **indices into the `faqs` array**. Reordering or
removing FAQs silently repoints them at the wrong questions. Fragile; if FAQs
churn, switch to ids.

**3. `serviceDetails.relatedPackageId`** — must match a `packages[].id`.

## Tailwind gradients: the trap

Accent gradients are stored as **literal class strings**:

```ts
accent: "from-[#2f5bff] to-[#5b84ff]"
```

Tailwind's JIT scans source files for complete class names. Because these strings
appear literally in `lib/content/*` (and `lib/palette.ts`), the CSS is generated.

> **Never build class names dynamically** — `` `from-[${color}]` `` produces no CSS
> and fails silently at runtime. Store the full literal, or add it to the
> safelist.

`lib/palette.ts` exposes `gradient(i)` — a rotating brand palette for colourful
icon tiles (Services, IndividualServices, WhyChooseUs, Contact, TrustBar).

## Honest-content rules

These are product decisions, not oversights. **Preserve them:**

- **No invented testimonials or client logos.** There is deliberately no
  testimonials section at all — an earlier one showed a "founding partner" offer
  and empty placeholders rather than fake quotes, and was later removed outright.
  Don't add fabricated social proof.
- **Portfolio projects are labelled "Demo Project"** — they're concept work.
- **No fabricated metrics** ("3× more leads"). Nothing claims a result that
  didn't happen.

If real clients arrive, add real, permitted material — don't loosen the rule.

## Types

Each module exports its own types (`Service`, `Package`, `Industry`, …) beside
the data. There's no `types/` folder: a type used by exactly one data module
belongs with it. `IconName` comes from `components/ui/Icon.tsx` and is the source
of truth for icon keys — `serviceDetails.benefits[].icon` is typed against it, so
a bad icon name is a compile error.

## Extending

**Change contact details** → `brand` in `lib/content/brand.ts`. Everything
follows, including JSON-LD.

**Add a service** → append to `services` *and* `serviceDetails` (same `id`), pick
an `accent`, verify `faqPicks` and `relatedPackageId`. The route builds itself.

**Add a nav item** → `nav` in `brand.ts`, root-relative (`/#anchor`), and give the
section that `id`. See [navigation.md](./navigation.md).

**Add a content module** → new file in `lib/content/`, re-export from `index.ts`.

**Prices** → always render with `formatINR()` from `lib/utils.ts`.
