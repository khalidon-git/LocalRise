# Technical debt backlog

Known-but-unfixed issues, worst first. Each says **why it's deferred** — debt is
a decision, not an accident. Something with no reason to be deferred should be
fixed, not listed.

Last reviewed: **2026-07-17**

---

## 1. No tests at all — *highest*

**Zero test files.** Every verification in this project has been manual: run the
build, grep the output, curl the live site. That has already caught real bugs,
but it doesn't scale and it doesn't run on push.

**Why it matters**: several shipped bugs were *invariant* violations that a
5-line test would catch forever:

```ts
// the entire test for BUG-001, the worst bug in this codebase
expect(grep('<a href="/', 'components/**/*.tsx')).toHaveLength(0);
```

**Deferred because**: the app has almost no logic to unit-test — it's content +
markup. The valuable tests are *invariant* and *e2e* (does audio survive
navigation?), which need Playwright and a real browser.

**Suggested first three**, in ROI order:
1. **Lint rule / CI grep**: no raw `<a href="/`. Guards [BUG-001](./bugs/001-raw-anchor-destroys-audio.md).
2. **Build assertion**: every `<loc>` in `sitemap.xml` ends in `/` and matches the
   page's canonical. Guards [BUG-007](./bugs/007-sitemap-trailing-slash.md).
3. **Playwright**: land → click → navigate → assert `audio.currentTime` did *not*
   reset. Guards [BUG-001](./bugs/001-raw-anchor-destroys-audio.md) end-to-end.

**Effort**: Medium · **Impact**: High

---

## 2. `FAQPage` schema duplicated site-wide and contradicts the page

The root layout emits `FAQPage` with **all 8 questions on all 9 pages**, but a
service page displays only 3 (`faqPicks`). Google requires FAQ markup to match
content **visible on that page** — this is a guideline violation.

**Deferred because**: Google restricted FAQ rich results to government/health
sites in Aug 2023, so there's **no ranking upside** — it's compliance hygiene,
not traffic. Fix is easy (move `FAQPage` into `app/page.tsx`).

**Effort**: Easy · **Impact**: Low–Medium · See [seo-audit.md](../docs/seo-audit.md) #2

---

## 3. No OG / Twitter share image

`twitter:card = summary_large_image` is declared with **no image** — promising a
large image that doesn't exist. Every share renders as a bare text link.

**Deferred because**: needs `app/opengraph-image.tsx` via `ImageResponse` (build-
time, works with static export). Not hard, just not yet done.

**Why it's high value**: this site's audience pastes links into WhatsApp. The
preview *is* the first impression.

**Effort**: Medium · **Impact**: High · See [seo-audit.md](../docs/seo-audit.md) #1

---

## 4. Placeholder Calendly link

`components/sections/Contact.tsx` links to `https://calendly.com/localrise` —
almost certainly a 404, on the primary conversion section.

**Deferred because**: **blocked on the owner** — needs the real URL, or a
decision to drop the tile. Can't be invented.

**Effort**: Easy · **Impact**: Medium (conversion)

---

## 5. `siteUrl` hard-coded in 5 files

`app/layout.tsx`, `app/sitemap.ts`, `app/services/[slug]/page.tsx`,
`app/concepts/page.tsx`, `app/concepts/[slug]/page.tsx`.

Growing: the Concept Websites work added two more. A domain change updates four
of five and silently ships wrong canonicals.

**Deferred because**: not user-visible today. **Trending the wrong way** — each
new route adds a copy. Fix before the next route: export `siteUrl` from
`lib/content/brand.ts`.

**Effort**: Easy · **Impact**: Low (correctness risk)

---

## 6. `faqPicks` are array indices

`serviceDetails.faqPicks: [0, 1, 4]` indexes into `faqs`. **Reordering or
removing an FAQ silently repoints every service page at the wrong questions** —
no type error, no test, no crash. Just wrong content.

**Deferred because**: works today and FAQs rarely change. Genuinely fragile.

**Fix**: give each FAQ an `id` and pick by id.

**Effort**: Easy · **Impact**: Low (until it bites, then confusing)

---

## 7. Cart items keyed by `title`

`CartProvider` matches items by title string. Fine while `individualServices`
titles are unique, but any duplicate or editable title breaks quantity merging.

**Deferred because**: titles are unique and the cart is a lead-capture device,
not commerce. Add a real `id` before the catalogue grows.

**Effort**: Easy · **Impact**: Low

---

## 8. Deploy needs a manual click

Push → the Action builds `deploy` → **a human clicks Redeploy in hPanel**.

**Deferred because**: hPanel's git integration isn't exposed by the Hostinger MCP
tools. If hPanel offers a deploy webhook, wiring it into the workflow removes the
last manual step.

**Effort**: Easy (if a webhook exists) · **Impact**: Medium (release friction)

---

## 9. No `apple-touch-icon` / `manifest`

Only `app/icon.svg`. iOS home-screen bookmarks want a PNG.

**Deferred because**: near-zero SEO impact; pure polish. See
[seo-audit.md](../docs/seo-audit.md) #7–8.

**Effort**: Easy · **Impact**: Low

---

## Not debt — deliberate

Don't "fix" these; they're [ADR](./decisions/)s:

- **No `LocalBusiness.address`** — no storefront exists. Inventing one to satisfy
  a validator would fabricate a business fact ([ADR-004](./decisions/004-honest-content-policy.md)).
- **No testimonials / client logos / metrics** — nothing real to show yet ([ADR-004](./decisions/004-honest-content-policy.md)).
- **No "Live Demo" button** — nothing live behind it ([ADR-005](./decisions/005-no-live-demo-button.md)).
- **No `features/` / `services/` folders** — a static 2-route site has no backend ([ADR-001](./decisions/001-right-sized-architecture.md)).
- **Code-rendered previews, no raster images** — deliberate ([concepts.md](../docs/concepts.md)).
