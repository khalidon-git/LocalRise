# Google Ads Strategy — LocalRise

Builds directly on [keyword-strategy.md](./keyword-strategy.md) — every ad
group below maps to a cluster there. Goal is **leads (WhatsApp conversations),
not traffic** — every recommendation is judged against that, not clicks or
impressions.

## Prerequisites — do these before spending a rupee

1. **Set real IDs in `lib/analytics/config.ts`.** Conversion tracking is built
   and wired (`knowledge/decisions/008-analytics-conversion-tracking.md`) but
   inert until the owner pastes a real GA4 Measurement ID and Google Ads
   Conversion ID + Label. Running Ads without this means **paying for clicks
   you cannot measure** — the single most common way small businesses waste
   Ads budget. Do not launch a campaign before this is live and firing (test
   by clicking a WhatsApp CTA on the live site and confirming the conversion
   shows in Google Ads → Conversions within 24–48h).
2. **Add a cookie-consent notice** before traffic starts arriving with
   tracking active (flagged in `docs/seo.md`).
3. **At least one dedicated landing page live** (see §4) — sending Ads traffic
   to the general homepage instead of an intent-matched landing page is the
   second most common way to waste budget; Quality Score and conversion rate
   both suffer.

## 1. Campaign structure

Three campaigns, matching the three price tiers in `lib/content/packages.ts` —
keeps budget allocation and ROAS reporting cleanly separable by deal size.

```
Campaign: LocalRise — Core Services (Search)
  Ad Group: Websites
  Ad Group: Google Business Profile
  Ad Group: WhatsApp Business Setup
  Ad Group: Reviews & Reputation

Campaign: LocalRise — High-Value Services (Search)
  Ad Group: Online Store
  Ad Group: Business Automation

Campaign: LocalRise — Industry Pages (Search)
  Ad Group: Clinics
  Ad Group: Restaurants & Cafés
  Ad Group: Coaching & Schools
  Ad Group: Salons & Spas
  (expand to remaining 5 industries once the first 4 prove out — see §7)
```

Why not one campaign with many ad groups: budget and bidding are set at the
campaign level in Google Ads. Splitting this way means the ₹29,999
Automation service isn't starved of budget by the ₹1,999 WhatsApp setup just
because they share a daily cap, and reporting immediately shows which price
tier is actually profitable to advertise.

## 2. Ad groups → keywords → landing pages

Tight ad groups (Google's own best practice: 5–20 closely related keywords per
group) so ad copy and landing-page headline can match the query almost
word-for-word — this is what keeps Quality Score, and therefore cost-per-click,
low.

| Ad Group | Keywords (from keyword-strategy.md) | Landing page |
| --- | --- | --- |
| Websites | business website design, website for small business, professional website for shop, website design cost India | `/lp/website-design/` (build first — see §4) |
| Google Business Profile | Google Business Profile setup, Google My Business setup service, get my business on Google Maps | `/services/google/` (existing page is close enough to ad-ready — see §4 checklist) |
| WhatsApp Business Setup | WhatsApp Business setup for shop, WhatsApp Business API setup India, WhatsApp catalogue setup | `/services/whatsapp/` |
| Reviews & Reputation | get more Google reviews for business, review management service small business | `/services/reviews/` |
| Online Store | online store setup for small business, ecommerce website for local shop, WhatsApp checkout setup | `/lp/online-store/` (dedicated page — high price point justifies it) |
| Business Automation | WhatsApp automation for small business, business automation service India | `/lp/automation/` (dedicated page) |
| Clinics / Restaurants / Coaching / Salons | industry + "website design India" per keyword-strategy.md §3 | `/lp/<industry>/` (net-new — see §4) |

## 3. Negative keywords

Applied at the **campaign** level (shared negative list) unless noted:

**Job-seeker intent** (very common false-positive for "website designer"
queries):
`jobs`, `job`, `salary`, `hiring`, `internship`, `career`, `resume`, `freelance
website designer job`

**DIY / learning intent** (won't buy a done-for-you service):
`free`, `tutorial`, `course`, `how to make website myself`, `template
download`, `wordpress theme free`, `youtube`

**Wrong market** (LocalRise is not an enterprise/global agency):
`enterprise`, `Fortune 500`, `USA`, `UK`, `international` (unless targeting
expands beyond India — see §7)

**Wrong product** (agency, not marketplace or tool):
`shopify`, `wix`, `godaddy`, `squarespace` (people comparing platforms, not
looking to hire an agency — low conversion intent against LocalRise's offer)

**Ad-group-specific**:
- Logo ad group (if ever run — see keyword-strategy.md Tier 3 caution): `fiverr`, `99designs`, `logo maker free`
- Automation ad group: `zapier`, `make.com`, `n8n` (people looking for the DIY tool, not a done-for-you service)

## 4. Landing pages needed

Google Ads' own guidance and standard CRO practice: **one service, one
objective, one CTA per page**, stripped of the site nav/footer/cart/audio that
the main site carries — those are conversion *distractions* on a page whose
only job is "convert this specific click." This is materially different from
an SEO service page, which needs breadth (internal links, related content,
nav) to rank. See the comparison table in §5.

**Priority build order** (from keyword-strategy.md's priority tiers):
1. `/lp/website-design/` — flagship service, Tier 1, highest package anchor (₹14,999 Growth)
2. `/lp/online-store/` — Tier 2 but highest price point (₹19,999+), worth the dedicated build
3. `/lp/automation/` — Tier 2, highest price point overall (₹29,999+)
4. Industry pages (`/lp/clinics/`, `/lp/restaurants/`, etc.) — once the service pages above are proven

The existing `/services/<id>/` pages for Google Business Profile, WhatsApp, and
Reviews are close enough to ad-ready to point traffic at directly to start —
they already have a single clear CTA pattern (`ConversationButton` +
`Button href="/contact"`) — but they still carry full site chrome (nav,
footer). Acceptable for a first test; revisit with dedicated pages once volume
justifies it.

**Not building yet**: this document specifies *what* and *why*; the actual
`/lp/website-design/` page is a `nextjs-expert` + `ui-builder` build task, next
in this session's plan, using the pattern in §5.

## 5. SEO page vs. Ads landing page — what's actually different

| | SEO service page (`/services/<id>/`) | Ads landing page (`/lp/<slug>/`) |
| --- | --- | --- |
| Purpose | Rank + serve organic visitors at any stage of research | Convert one specific paid click, right now |
| Nav / footer / cart | Full site chrome | **None** — `SiteChrome` suppression, same mechanism already used for `/concepts/*/live/` |
| Internal links | Many (related packages, other services, nav) | Minimal to zero — every link is a "leak" out of the funnel |
| Content depth | Full benefits/included/outcomes/FAQ breakdown | Same core content, tightened to what closes a decision — no padding |
| CTA count | Two (hero + closing), same target | One objective, repeated (hero + closing), zero competing CTAs |
| Headline | SEO-friendly, matches organic query | Matches the **ad copy** exactly (message match) |
| Trust signals | Woven through the page | Front-loaded near the CTA — visitor arrived skeptical, paid-traffic bounce is faster |
| Indexing | Indexed, in sitemap | **Noindexed** — duplicate/thin-content risk against the SEO page; same `robots: { index: false }` pattern already used for `/concepts/*/live/`, same exclusion from `app/sitemap.ts` |

Trust signals available honestly (per ADR-004 — no fabrication): transparent
published pricing (real and already a differentiator), delivery-time
commitments (real, e.g. "3–5 days"), what's included (real, itemized), and the
FAQ content already written. **No testimonials, no client counts, no "trusted
by X businesses"** — none of that exists yet. Lean on specificity and
transparency instead of social proof that isn't there.

## 6. Conversion tracking

Already built (`lib/communication/index.ts` → `trackConversationStart()`) —
every WhatsApp conversation start fires a Google Ads conversion, segmented by
`type` (consultation/package/service/industry/concept/cart) and `meta.section`
so campaign performance can be broken down by which page/button actually
converts. **This is the one prerequisite that blocks launch** (see
Prerequisites above) — nothing else here matters if conversions aren't
measured.

One gap worth naming: a WhatsApp click is a *conversation start*, not a
confirmed sale — there's no backend to know if it became paying work (see
`docs/cart.md`'s note that the site has no checkout/payment). Treat the Ads
conversion as a strong proxy, not gospel; periodically sanity-check against
actual deals closed from Ads-attributed conversations to calibrate real ROAS.

## 7. Remarketing

Requires the Google Ads tag (already loading once IDs are set) plus a
remarketing audience created in the Ads account (UI action, not code) —
**building the audience list needs no additional code**, gtag.js populates it
automatically once tracking is live. Recommended audiences once traffic
exists:
- All visitors, 30-day window — general awareness/branding push
- Visitors who reached a service or landing page but did **not** convert,
  14-day window — the highest-value remarketing segment, targeted with a
  "still deciding? Get a free consultation" ad
- Past converters, 180-day window — excluded from acquisition campaigns
  (they've already started a conversation), included in a separate "upsell
  the next package tier" campaign later

## 8. Budget sequencing (qualitative, not a number)

Don't set a real daily budget here — that's the owner's call and depends on
funds available. Sequencing recommendation:
1. **Week 1–2**: Core Services campaign only, small daily budget, only after
   conversion tracking is confirmed firing. Goal: validate cost-per-conversion
   before scaling anything.
2. **Week 3–4**: add High-Value Services campaign once Core Services shows a
   sane cost-per-conversion.
3. **Month 2+**: add Industry Pages campaign, expand negative keyword list
   based on real Search Terms report data (this is where a lot of "money
   saved" comes from in practice — the first month's search-terms report
   always surfaces junk queries no one predicted).

## Alternatives considered

| Option | Why not (for now) |
| --- | --- |
| Performance Max campaigns | Black-box targeting, harder to control for a brand-new, untested funnel with no historical conversion data to feed the algorithm. Revisit once Search campaigns have 30+ real conversions. |
| Display/YouTube | Awareness-oriented, not lead-gen; the brief is explicit about leads over traffic |
| Broad match keywords | Too much budget risk before the negative-keyword list has been battle-tested against a real Search Terms report; start Phrase/Exact, loosen deliberately |
