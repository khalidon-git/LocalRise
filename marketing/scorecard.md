# LocalRise — Scorecard

Dated 2026-07-18, post-Week-0 fixes (see `90-day-roadmap.md`). Scores are
reasoned, not benchmarked against a tool — each includes why, and what moves
it. Re-score in 30 days once real Search Console / Ads data exists; several of
these are informed guesses until then, explicitly flagged as such.

## Overall SEO — 4.5 / 10

**Why it's not higher**: the site had **zero indexed pages** at the start of
this session. Technical health (below) is now strong, but indexing has to
actually happen before any of it matters — that takes real time even after a
fix, especially recovering from a historical 403. Content depth is also thin
for a competitive space: 7 service pages and no dedicated industry or blog
content yet (`keyword-strategy.md` §3 flags 9 unclaimed industry keyword
clusters).

**Why it's not lower**: the technical foundation is now genuinely solid (see
below), and the honest, transparent-pricing positioning is a real
differentiator once it's found.

**What moves this**: indexing actually happening (Days 1–14), then industry
pages / content depth (Days 31–90).

## Technical SEO — 8 / 10

**Why it's high**: robots.txt/sitemap/canonicals/HTTPS were already correct;
this session fixed the remaining real gaps — www/non-www duplicate host, OG
image, `FAQPage` schema restored, `BreadcrumbList` added. Structured data now
covers `ProfessionalService`, `WebSite`, `FAQPage`, `Service`,
`BreadcrumbList`, `CollectionPage`, `CreativeWork`.

**What's left**: no `manifest.json`/apple-touch-icon (low value, `docs/
tech-debt.md` already has this ranked low), Calendly link still a placeholder
(blocked on the owner), industry pages don't exist yet so their keyword
clusters have nothing to rank.

## Conversion (CRO) — 6 / 10

**Why it's mid**: real strengths exist already — transparent published
pricing (genuinely rare in this market and a strong trust signal), a
low-friction WhatsApp conversion channel, clear single CTAs on service pages.
**But this session did not run a CRO audit or homepage redesign** (the
brief's Phase 5 — reduce homepage text, increase visual hierarchy — wasn't
attempted; it's a real, separate, opinionated design decision that deserves
its own pass with the `content-architect`/`ui-builder`/`design-reviewer`
agents rather than being folded into an indexing/tracking fix session).
Conversion also can't be *measured* yet — GA4/Ads IDs aren't live, so every
claim above is qualitative, not data-backed.

**What moves this**: real conversion data once tracking is live (this is the
single biggest unlock — right now nobody knows the actual conversion rate of
any page), then a dedicated CRO pass on the homepage informed by that data
rather than guessing at what to change first.

## Google Ads readiness — 6 / 10

**Why it's mid, up from 0**: conversion tracking is fully built and wired
(disabled-safe until real IDs land), a full campaign strategy exists
(`ads-strategy.md`) with real ad groups mapped to real keywords, and one
flagship landing page is built. That's the hard, one-time infrastructure
work done.

**What's missing**: no live Ads account, no real IDs pasted in yet, only 1 of
~4-9 recommended landing pages built, no cookie-consent banner (needed before
scaling traffic with tracking active), zero real Search Terms data yet to
validate the negative-keyword list.

**What moves this**: the owner-blocked items in `90-day-roadmap.md`'s Days
1–14, then landing pages 2–4 in Days 15–60.

## AI Search (AEO/GEO) readiness — 5 / 10

**Why it's mid**: `FAQPage` schema is correctly implemented and the existing
FAQ copy already reads in a fairly direct, quotable style (a good sign — AI
Overviews and LLM answers favor concise, literal Q&A phrasing over marketing
copy). `Service` schema gives entity clarity per offering.

**What's missing**: no comparison tables (a format AI Overviews favor for
"X vs Y" and "what's included" queries — none of this content exists yet), no
`llms.txt` (low-cost, worth adding — `docs/tech-debt.md` already lists it as
low-priority-but-easy), FAQ content hasn't been deliberately rewritten
*for* AEO (keyword-strategy.md §4 lists the target questions; the existing
copy wasn't audited against them this session), and thin overall content
depth limits how much any AI system has to draw from when answering questions
about LocalRise specifically.

**What moves this**: an `seo-copywriter` pass rewriting FAQ answers as direct
2–3 sentence answers to the exact questions in `keyword-strategy.md` §4, plus
`llms.txt`.

---

## Prioritized checklist (roll-up of `90-day-roadmap.md`)

**This week — do these regardless of anything else**:
1. Deploy this session's fixes (nothing is live until you push + redeploy)
2. Verify/submit Search Console, request indexing
3. Paste real GA4 + Google Ads IDs into `lib/analytics/config.ts`, redeploy, click-test a WhatsApp CTA, confirm the conversion shows up in Google Ads
4. Add a cookie-consent banner before analytics traffic scales

**Next 2–4 weeks**:
5. Launch a small first Ads campaign (Websites ad group only), watch Search Terms daily
6. Build the 2nd and 3rd landing pages (`/lp/online-store/`, `/lp/automation/`)

**30–90 days, data-informed**:
7. Decide (with real query data in hand) whether to build dedicated industry pages
8. `seo-copywriter` pass on FAQ content for AEO
9. Real case study — only once real client work exists, never before
