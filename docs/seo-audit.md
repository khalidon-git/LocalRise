# SEO Remediation Plan

**Audited**: 2026-07-17 · **Method**: direct inspection of source + the built
`out/` bundle + the live site. **Not** based on the attached reports — see below.

---

## Executive summary

Two caveats that shape everything here:

1. **The audit reports never arrived.** No files were attached and none exist in
   the project. So this plan cannot "group reported duplicates" or "flag their
   false positives" — I audited the actual site instead, which is arguably better
   evidence than a crawler's warning list, but it means findings are mine, not
   theirs. **Send the reports and I'll reconcile them against this.**
2. **This is Next.js 14.2.15 / React 18**, not 15/19. Nothing below depends on
   Next 15 APIs.

**The site is in good SEO shape.** Canonicals are correct and trailing-slash
normalised, `robots.txt` and `sitemap.xml` are valid, every page has exactly one
`<h1>`, `lang="en"` is set, metadata and OG/Twitter tags are present and
per-page, and Core Web Vitals should be strong (static HTML, self-hosted fonts,
zero raster images, audio `preload="none"`).

There is **no large backlog**. There are **four fixes worth doing**, one of which
is a genuine Google guideline violation.

| # | Fix | Impact | Effort |
| --- | --- | --- | --- |
| 1 | Add an OG/Twitter share image | **High** | Medium |
| 2 | Scope `FAQPage` schema to the homepage | Medium | Easy |
| 3 | ~~Trailing slashes in `sitemap.xml`~~ — **fixed** | Medium | Easy |
| 4 | Replace the placeholder Calendly link | Medium | Easy |

Everything else is Low or not worth doing. **I am not padding this to 20 items** —
you asked me not to recommend changes unlikely to move rankings or UX, and there
aren't 20 that qualify. Inventing them would waste your time and hide the four
that matter.

> ⚠️ **The live site is stale.** It's missing the audio, restructure, welcome
> modal and eyebrow-removal commits. Click **Redeploy** in hPanel before
> re-running any audit, or you'll be measuring an old build.

---

## Critical / High

### 1. No OG or Twitter share image

- **Problem**: `og:image` and `twitter:image` are absent, yet
  `twitter:card = "summary_large_image"` is declared — promising a large image
  that doesn't exist. Every share renders as a bare text link.
- **Root cause**: no `opengraph-image` file; `app/layout.tsx` sets `openGraph`
  without `images`.
- **Why it matters**: LocalRise's pitch is *WhatsApp and local discovery*. Links
  get pasted into WhatsApp, Instagram bios and LinkedIn — the share preview **is**
  the first impression, and often the only one. This isn't a ranking factor; it's
  a click-through and credibility factor, which is why it's the highest-ROI item
  here. A declared `summary_large_image` with no image is worse than not
  declaring one.
- **Files**: `app/opengraph-image.tsx` (new), `app/layout.tsx`
- **Fix**: Add `app/opengraph-image.tsx` using `ImageResponse`. It renders at
  **build time** (fine for `output: "export"`) so no binary asset or design tool
  is needed, and Next auto-emits `og:image` + `twitter:image` with correct
  dimensions. Reuse the brand: accent `#2F5BFF`, Space Grotesk, the tagline.
  A per-service variant (`app/services/[slug]/opengraph-image.tsx`) is a cheap
  follow-on.
- **Benefit**: Materially higher CTR on every shared link.
- **Priority**: **High** · **Impact**: High · **Effort**: Medium

### 2. `FAQPage` schema is duplicated site-wide and contradicts the page

- **Problem**: The root layout emits `FAQPage` with **all 8 questions on all 9
  pages**. A service page *displays only 3* (`faqPicks: [0, 1, 4]`) but its schema
  claims 8.
- **Root cause**: `jsonLd` lives in `app/layout.tsx`, so it's global. The FAQ
  graph belongs to the homepage only.
- **Why it matters**: Google requires FAQ markup to match FAQ content **visible on
  that page**. Claiming 8 questions while showing 3 is a guideline violation and
  risks a structured-data manual action. The same `FAQPage` on 8 URLs is also a
  duplication signal.
- **Honest scope**: **Do not expect a ranking gain.** Google restricted FAQ rich
  results to government and health sites in August 2023 — a marketing site gets
  no FAQ rich result today regardless. This is a **compliance and hygiene** fix,
  not a traffic play. Anyone selling you FAQ schema as a ranking win is quoting
  2022.
- **Files**: `app/layout.tsx`, `app/page.tsx`
- **Fix**: Split the graph. Keep `ProfessionalService` + `WebSite` global in the
  layout; move `FAQPage` into `app/page.tsx` (homepage only). Optionally emit a
  correctly-scoped `FAQPage` per service page built from its own `faqPicks` — but
  given zero rich-result upside, simply removing it from sub-pages is the better
  effort trade.
- **Benefit**: Removes a guideline violation; cleaner entity graph.
- **Priority**: **High** · **Impact**: Low–Medium · **Effort**: Easy

### 3. Sitemap URLs 301-redirect

- **Problem**: `sitemap.xml` lists `https://localrise.in/services/websites`, but
  `trailingSlash: true` makes the canonical `…/websites/`. Every sitemap URL is a
  redirect hop. Same for the homepage (`…/in` vs `…/in/`).
- **Root cause**: `app/sitemap.ts` builds URLs by string concatenation and doesn't
  account for `trailingSlash`. Next normalises canonicals but **not** sitemap
  entries.
- **Why it matters**: A sitemap should list final canonical URLs. Redirect hops
  waste crawl budget and trigger "sitemap contains redirects" in every audit
  tool — quite possibly one of the warnings in your reports.
- **Files**: `app/sitemap.ts`
- **Fix**: Append a trailing slash: `${siteUrl}/services/${s.id}/` and `${siteUrl}/`.
- **Benefit**: Clean crawl, one less audit warning.
- **Priority**: **High** · **Impact**: Medium · **Effort**: Easy

### 4. Placeholder Calendly link

- **Problem**: `components/contact/ContactMethods.tsx` links to
  `https://calendly.com/localrise` — almost certainly a 404.
- **Why it matters**: A broken outbound link on the primary conversion section.
  This is a lost booking and a trust hit, not an algorithm problem.
- **Files**: `components/contact/ContactMethods.tsx`
- **Fix**: Real Calendly URL, or remove the tile and let WhatsApp/phone carry it.
  **Needs your input** — I can't invent the URL.
- **Priority**: **High** · **Impact**: Medium (conversion) · **Effort**: Easy

---

## Medium

### 5. No `BreadcrumbList` on service pages

- **Problem**: No breadcrumb markup or visible breadcrumb UI.
- **Why it matters**: Google can show breadcrumbs instead of a raw URL in results.
  Modest CTR/clarity gain. With only 2 levels (`Home → Service`) the upside is
  small but real.
- **Files**: `app/services/[slug]/page.tsx`
- **Fix**: Add a `BreadcrumbList` JSON-LD node per service page. Ideally pair it
  with a small visible breadcrumb above the H1 — markup should reflect real
  on-page navigation.
- **Priority**: Medium · **Impact**: Low–Medium · **Effort**: Easy

### 6. `siteUrl` duplicated across four files

- **Problem**: `https://localrise.in` is hard-coded in `app/layout.tsx`,
  `app/sitemap.ts`, `app/robots.ts` and `app/services/[slug]/page.tsx`.
- **Why it matters**: Not an SEO issue today — a correctness risk. A domain change
  updates three of four and silently ships wrong canonicals.
- **Fix**: One `siteUrl` export in `lib/content/brand.ts`; import everywhere.
- **Priority**: Medium · **Impact**: Low · **Effort**: Easy

### 7. Missing `apple-touch-icon` and `favicon.ico`

- **Problem**: Only `app/icon.svg` exists.
- **Why it matters**: iOS home-screen bookmarks and some crawlers/older browsers
  want a PNG/ICO. Polish, not ranking.
- **Fix**: `app/apple-icon.png` (180×180) — Next wires it by convention. Can be
  generated with `ImageResponse` alongside the OG image.
- **Priority**: Medium · **Impact**: Low · **Effort**: Easy

---

## Low / not recommended

### 8. `manifest.json` — Low value

No ranking impact. Only worth it if you want installability. Add
`app/manifest.ts` if desired; don't expect SEO movement.
**Priority**: Low · **Impact**: Low.

### 9. `llms.txt` — speculative, do it only because it's cheap

An **unratified proposal**. No major LLM provider has committed to reading it,
and it has **zero effect on rankings today**. A static `public/llms.txt` costs
five minutes. Treat it as a lottery ticket, not an optimisation — and be
sceptical of anyone presenting it as an SEO requirement.
**Priority**: Low · **Impact**: Low (speculative).

### 10. `LocalBusiness` address/geo — **do not add**

`ProfessionalService` (already a `LocalBusiness` subtype) has no `address` or
`geo`. An audit tool will flag this. **Ignore it here.**

LocalRise serves businesses across India remotely and — as far as the content
shows — has no public storefront. **Inventing an address to satisfy a validator
would be fabricating a business fact**, violates Google's guidelines, and risks
the very local visibility it's meant to gain. `areaServed: "IN"` without an
address is the honest representation of a service-area business.

The real lever for local visibility is a **verified Google Business Profile**,
not schema. That's an operations task, not a code change.

### 11. Hreflang — not applicable

Single language, single market (`en_IN`). Hreflang would add markup with nothing
to point at. If a tool flags it, it's a false positive.

---

## Likely false positives in any crawler report

Check these before acting on the reports when they arrive:

| Typical warning | Reality here |
| --- | --- |
| "Images missing alt text" | **There are zero `<img>` tags.** All artwork is inline SVG with `role="img"` + `aria-label`, or `aria-hidden` for decoration. |
| "Missing hreflang" | Single-locale site. N/A. |
| "LocalBusiness missing address" | Deliberate — no storefront. See #10. |
| "Low word count" / "thin content" | Sub-pages are intentionally scannable. Content is genuine, not padded. |
| "Missing manifest / PWA" | No ranking impact. See #8. |
| "Render-blocking resources" | Fonts are self-hosted and static; already near-optimal. |
| "Multiple H1s" | Verified: exactly one `<h1>` on the homepage and on each service page. |

---

## Verified as already correct

Checked directly against the built output — **no action needed**:

- **Titles** — templated (`%s · LocalRise`), unique per service page.
- **Meta descriptions** — present globally and per page (`detail.sub`).
- **Canonicals** — correct and trailing-slash normalised on every page.
- **Robots** — `User-Agent: * / Allow: / + Sitemap:`. Indexable.
- **Sitemap** — valid, auto-enumerates services from `lib/content` (only the
  trailing slash is wrong, #3).
- **Internal linking** — all internal links route via `SmartLink` → `next/link`;
  nav/footer anchors are root-relative so they resolve from sub-pages.
- **Open Graph / Twitter** — all tags present **except the image** (#1).
- **Structured data** — valid `ProfessionalService` + `WebSite`; `sameAs`,
  `telephone` (both numbers), `email`, `priceRange`, `areaServed` all sourced
  from `lib/content` so they can't drift from the visible page.
- **Duplicate content** — none; canonicals correct.
- **Crawlability / indexability** — static HTML, no JS-gated content, no noindex.
- **Redirects** — Apache handles `/path` → `/path/` (only the sitemap should stop
  relying on it).
- **Core Web Vitals** — static HTML, self-hosted fonts (no external requests),
  zero raster images, `preload="none"` audio, immutable caching on
  `/_next/static/`. Framer Motion is the main JS cost and is acceptable.
- **Accessibility** — `lang="en"`, one H1/page, labelled SVGs, `aria-label` on
  icon buttons, `role="dialog"` + focus + Escape on the modal, reduced-motion
  honoured, reference-counted scroll lock.
- **Favicon** — `app/icon.svg` present (PNG/ICO fallback is #7).

---

## Roadmap

### Phase 1 — Immediate (~1 hour)

1. **Redeploy** so the live site matches `main` (else you're auditing an old build).
2. ~~Trailing slashes in `app/sitemap.ts`~~ — **done**, shipped with Concept Websites.
3. Scope `FAQPage` to the homepage (#2).
4. Fix or remove the Calendly link (#4) — *needs your URL*.

### Phase 2 — This week (~half day)

5. `app/opengraph-image.tsx` via `ImageResponse` (#1) — the big one.
6. `BreadcrumbList` on service pages, with a visible breadcrumb (#5).
7. Centralise `siteUrl` in `lib/content/brand.ts` (#6).
8. `app/apple-icon.png` (#7).

### Phase 3 — Future

9. Per-service OG images (`app/services/[slug]/opengraph-image.tsx`).
10. `public/llms.txt` (#9) and `app/manifest.ts` (#8) if you want them.
11. **Verified Google Business Profile** — the only real local-SEO lever (#10).
12. Real case studies once clients exist — genuine content beats any markup here.

---

## Developer checklist

| File | Change |
| --- | --- |
| `app/sitemap.ts` | Trailing slashes on all URLs |
| `app/layout.tsx` | Remove `FAQPage` from the global graph; keep `ProfessionalService` + `WebSite` |
| `app/page.tsx` | Emit `FAQPage` here (homepage only) |
| `app/opengraph-image.tsx` *(new)* | `ImageResponse`, 1200×630, brand colours |
| `app/apple-icon.png` *(new)* | 180×180 |
| `app/services/[slug]/page.tsx` | `BreadcrumbList` JSON-LD + visible breadcrumb; import `siteUrl` |
| `lib/content/brand.ts` | Export `siteUrl` |
| `components/contact/ContactMethods.tsx` | Real Calendly URL or remove the tile |
| `app/robots.ts` | Import `siteUrl` |

## Verification checklist (after deploy)

```bash
# canonicals and sitemap must agree — every loc should end in "/"
curl -s https://localrise.in/sitemap.xml | grep -o "<loc>[^<]*</loc>"
curl -s https://localrise.in/services/websites/ | grep -o '<link rel="canonical"[^>]*>'

# og:image must exist and return 200 image/png
curl -s https://localrise.in/ | grep -o '<meta property="og:image"[^>]*>'
curl -sI https://localrise.in/opengraph-image | head -3

# FAQPage must appear on the homepage ONLY
curl -s https://localrise.in/ | grep -c '"@type":"FAQPage"'              # 1
curl -s https://localrise.in/services/websites/ | grep -c '"@type":"FAQPage"'  # 0
```

- [ ] Google **Rich Results Test** on `/` and `/services/websites/` — no errors.
- [ ] **Schema validator** (validator.schema.org) — clean.
- [ ] Paste a link into **WhatsApp** — image preview renders (the real test).
- [ ] **PageSpeed Insights** on mobile — confirm LCP/CLS.
- [ ] **Search Console** → submit `sitemap.xml`, confirm no redirect warnings.
- [ ] No sitemap URL returns a 301.
