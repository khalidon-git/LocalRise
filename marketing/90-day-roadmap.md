# 90-Day Roadmap — LocalRise

Ties together [keyword-strategy.md](./keyword-strategy.md) and
[ads-strategy.md](./ads-strategy.md). Every task is scored on four axes —
**Priority**, **SEO impact**, **Ads impact**, **Lead-gen impact** (High/Med/Low)
— plus **Effort** (S/M/L). "Done" items are dated and reference the actual
commit/file, not aspirational.

## Already shipped (Week 0, 2026-07-18)

| Task | SEO | Ads | Lead-gen | Effort |
| --- | --- | --- | --- | --- |
| ✅ www→non-www redirect (`public/.htaccess`) | High | — | — | S |
| ✅ OG/Twitter share image (`app/opengraph-image.png`) | Med | Med (link previews on paid social) | Med | S |
| ✅ Restored `FAQPage` schema (`/why-us/`) | Med | — | — | S |
| ✅ `BreadcrumbList` on service pages | Low–Med | — | — | S |
| ✅ GA4 + Google Ads conversion tracking, disabled by default (`lib/analytics/`, ADR-008) | — | **Critical — nothing else in Phase 4/8 works without this** | High | M |
| ✅ Keyword strategy (`marketing/keyword-strategy.md`) | High (informs all copy) | High (informs all ad groups) | — | M |
| ✅ Google Ads strategy (`marketing/ads-strategy.md`) | — | High | High | M |
| ✅ Flagship Ads landing page, `/lp/website-design/` | — | High | High | M |
| ✅ Homepage → `/concepts/` portfolio link (was missing entirely) | Low | — | Low–Med | S |

**Blocked on the owner, not code** (tracked, can't be done for you):
- Real GA4 Measurement ID + Google Ads Conversion ID/Label → `lib/analytics/config.ts`
- Search Console verification + manual "Request Indexing" on the homepage
- Real Calendly account (link is still `calendly.com/localrise`, a placeholder)
- Cookie-consent banner before analytics goes live in production (not yet built — flagged in `docs/seo.md`)
- A live Google Ads account funded and running

---

## Days 1–14 — Turn the fixes on, validate measurement

**Goal**: everything shipped above is live and confirmed working before spending on Ads. This is the highest-leverage window in the whole plan — an unmeasured Ads campaign is money that teaches you nothing.

| Task | Priority | SEO | Ads | Lead-gen | Effort |
| --- | --- | --- | --- | --- | --- |
| Deploy Week 0's fixes (push → GH Action → hPanel redeploy) | Critical | High | — | — | S |
| Verify Search Console property, submit sitemap, request indexing on `/` | Critical | High | — | — | S (owner) |
| Set real GA4 + Ads IDs in `lib/analytics/config.ts`, redeploy | Critical | — | Critical | — | S (owner + redeploy) |
| Click-test a WhatsApp CTA in production, confirm conversion appears in Google Ads within 48h | Critical | — | Critical | — | S |
| Add cookie-consent banner before analytics traffic scales | High | — | Med (compliance) | — | M |
| Fix Calendly link once a real account exists | Med | — | — | Med | S (owner) |
| Tighten `/services/*` title/description tags to match keyword-strategy.md clusters exactly | Med | Med | Low | — | M (`seo-copywriter`) |

## Days 15–30 — First Ads spend, second landing page

**Goal**: validate cost-per-conversion on the flagship offer before scaling anything.

| Task | Priority | SEO | Ads | Lead-gen | Effort |
| --- | --- | --- | --- | --- | --- |
| Launch "Core Services" campaign (Websites ad group only), small budget | Critical | — | High | High | S (owner, Ads UI) |
| Monitor Search Terms report daily, expand negative list (ads-strategy.md §3 is a starting point, not final) | High | — | High | — | S, ongoing |
| Build `/lp/online-store/` landing page (2nd priority per ads-strategy.md §4) | High | — | High | High | M |
| Add remaining Core Services ad groups (Google Business Profile, WhatsApp, Reviews) once tracking is confirmed stable | High | — | High | Med | S |
| Rich Results Test on `/why-us/` (FAQPage) and one service page (Service+Breadcrumb) — confirm no schema errors post-deploy | Med | Med | — | — | S |

## Days 31–60 — Scale what's working, fill the biggest content gap

**Goal**: by now Search Terms + conversion data tell you which ad group actually produces leads — double down on that, not on this document's guesses.

| Task | Priority | SEO | Ads | Lead-gen | Effort |
| --- | --- | --- | --- | --- | --- |
| Add "High-Value Services" campaign (Online Store, Automation) if Core Services is profitable | High | — | High | High | S (owner) |
| Build `/lp/automation/` landing page | Med | — | Med | Med | M |
| **Decision point**: build dedicated `/industries/<slug>/` pages? (keyword-strategy.md §3 flags this as a real gap — 9 industries with zero dedicated URLs) | High | High | Med | Med | L — needs `content-architect` scoping first, see below |
| If yes: build first 4 Tier-1 industry pages (Clinics, Restaurants, Coaching, Salons) | High | High | Med | Med | L |
| FAQ content pass written as direct, quotable answers for AI Overview/AEO targeting (keyword-strategy.md §4) | Med | Med (AEO) | — | Low | M (`seo-copywriter`) |

**Why the industry-page decision isn't made here**: it's a real information-architecture trade-off (new URLs to maintain vs. expanding the existing homepage section's copy), not a foregone conclusion — flagged in `marketing/keyword-strategy.md`'s Next Steps for `content-architect` to actually decide, with real Search Console query data in hand by this point to inform it.

## Days 61–90 — Compounding content, first real proof (if it exists by now)

**Goal**: move from "campaigns that convert" to "a site that keeps ranking and converting without ongoing ad spend."

| Task | Priority | SEO | Ads | Lead-gen | Effort |
| --- | --- | --- | --- | --- | --- |
| Remaining industry pages (if the Day 31–60 decision was yes) | Med | High | Low | Med | L |
| Remaining ad groups' landing pages if data justifies dedicated pages over the existing `/services/*` pages | Low–Med | — | Med | Med | M |
| **If real client work exists by now**: add one honest case study (real result, real business, real permission) — the one thing that would most improve trust signals, and the one thing this document cannot manufacture (ADR-004) | High if available | Med | High | High | M |
| Blog infrastructure decision — none exists today (confirmed: no `/blog`, no MDX tooling in `package.json`). If pursuing content marketing, scope as a net-new system (`content-architect` + `nextjs-expert`), likely MDX-in-`app/blog/[slug]` per the pattern already used for services/concepts | Low–Med | Med (long-tail, compounds over time) | — | Low near-term | L — separate scoping conversation, not started |
| Re-run this document's qualitative keyword difficulty against 90 days of real Search Console + Keyword Planner data | Med | High (recalibrates everything) | High | — | M |

---

## What this roadmap deliberately does not do

- **Does not fabricate a case study, testimonial, or client count to fill Days 61–90's biggest gap.** ADR-004 is non-negotiable. The honest path is slower — real proof shows up only once real client work exists — and that's the correct trade, not an oversight.
- **Does not commit to building all 9 industry pages or a blog** without the decision points above actually happening first. Both are real, multi-week builds; sequencing them before validating the smaller Ads/landing-page bets first is how budget and effort get wasted on a guess instead of a measurement.
