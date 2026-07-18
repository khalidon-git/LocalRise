# Keyword Strategy — LocalRise

**Purpose**: ground SEO copy, Ads campaigns, and landing-page targeting in a real
keyword architecture instead of guesswork. Feeds [ads-strategy.md](./ads-strategy.md)
(ad groups map 1:1 to the clusters below) and the ninety-day roadmap.

## Who is searching

LocalRise sells *to* small local business owners (doctors, restaurateurs, shop
owners, contractors) who want an online presence — it does not sell to their
end customers. Every keyword here is written from that searcher's point of
view: "I run a business and need X," not "I'm a consumer looking for a
restaurant." Don't confuse the two — a keyword like "restaurant near me" is
irrelevant; "website for restaurant business" is exactly on-target.

LocalRise serves "local businesses across India" with no single physical
storefront (`lib/content/brand.ts`) — so there's no city-specific "near me"
intent to capture for LocalRise itself. Geographic targeting here means
**India-wide by default**, with optional city-level Google Ads targeting
layered on top of national SEO (see `ads-strategy.md`) for cities with dense
SMB populations, not "near me" keyword variants.

## No fabricated volumes

This document does not invent search-volume numbers — Google's real figures
require Keyword Planner access via a live Google Ads account, which
`knowledge/decisions/008-analytics-conversion-tracking.md` set up the tracking
plumbing for but which still needs the owner to actually open/fund an Ads
account. **Difficulty and priority below are qualitative**, reasoned from
competitive structure (national generic terms compete against big directory
sites and agencies; long-tail service+industry combinations compete against
almost no one). Once the Ads account exists, pull real volumes for every
cluster below and slot them into the priority matrix — the *structure* won't
change, only the ordering within each tier.

---

## 1. Core / brand-adjacent keywords

Site-wide intent — homepage, `/why-us/`, `/contact/` should rank here.

| Keyword | Intent | Difficulty | Priority |
| --- | --- | --- | --- |
| website design company for small business India | Commercial | High (crowded, national agencies) | Tier 2 |
| affordable website designer for local business | Commercial | Medium | Tier 1 |
| digital marketing agency for small business India | Commercial | High | Tier 2 |
| how to get my business online India | Informational | Low–Medium | Tier 1 (top-of-funnel, low competition) |
| digital agency for local shops | Commercial | Low–Medium | Tier 1 |

## 2. Service-level clusters

One cluster per `lib/content/services.ts` entry — each already has a live page
at `/services/<id>/`. Primary = head term for that page's title tag; secondary
= supporting H2s/body copy; long-tail = FAQ content and Ads long-tail match;
commercial = pages/Ads that should show price.

### Websites (`/services/websites/`, from ₹7,999)

| Tier | Keywords |
| --- | --- |
| Primary | business website design, website for small business, professional website for shop |
| Secondary | mobile-friendly website design India, website design for local business |
| Long-tail | website for [industry] business India (combine with §3), website design 3 to 5 days delivery |
| Commercial | website design cost India, website design price small business, cheap website design India |

**Difficulty**: "website design" alone is very high (huge national/global
competition). The service-page win is long-tail + commercial-intent variants
with a price qualifier — LocalRise's transparent ₹7,999 starting price is a
genuine differentiator worth leading with in Ads copy and title tags.
**Priority: Tier 1** (highest business value — this is the flagship service
and the ₹14,999 Growth package anchor).

### Google Business Profile (`/services/google/`, from ₹2,999)

| Tier | Keywords |
| --- | --- |
| Primary | Google Business Profile setup, Google My Business setup service |
| Secondary | get my business on Google Maps, local SEO for small business India |
| Long-tail | Google Business Profile setup and verification service India, Google Maps listing for shop |
| Commercial | Google Business Profile setup cost, GMB optimization service price |

**Difficulty**: Low–Medium — "GMB/Google Business Profile setup service" is a
specific enough transactional query that few agencies bother targeting it
directly (most bundle it into broader "local SEO" packages).
**Priority: Tier 1** — cheap to rank/advertise for, low price point makes it a
strong entry offer, and it's the clearest AEO/AI-Overview candidate (see
`docs/seo.md` / Phase 6 notes below — "how do I get my business on Google
Maps" is exactly the kind of question AI Overviews answer directly).

### WhatsApp Business (`/services/whatsapp/`, from ₹1,999)

| Tier | Keywords |
| --- | --- |
| Primary | WhatsApp Business setup for shop, WhatsApp Business API setup India |
| Secondary | WhatsApp catalogue setup service, WhatsApp auto reply setup |
| Long-tail | how to set up WhatsApp Business catalogue for small shop |
| Commercial | WhatsApp Business setup cost India |

**Difficulty**: Low. Genuinely underserved query space — most agencies don't
productize this as a standalone service. **Priority: Tier 1** — cheapest
entry price (₹1,999) makes it the lowest-friction first purchase; a natural
"foot in the door" Ads offer.

### Online Store (`/services/store/`, from ₹19,999)

| Tier | Keywords |
| --- | --- |
| Primary | online store setup for small business, ecommerce website for local shop |
| Secondary | WhatsApp checkout setup, online ordering system for shop India |
| Long-tail | how to sell products online small business India, booking system for salon/clinic website |
| Commercial | ecommerce website cost India small business |

**Difficulty**: Medium-High for generic "ecommerce website" (competes with
Shopify/website-builder SEO); Low for the WhatsApp-checkout angle, which is
close to unclaimed. **Priority: Tier 2** — highest price point (₹19,999+)
makes it high value per conversion, worth a dedicated Ads landing page (see
`ads-strategy.md`) even though organic difficulty is higher.

### Logo & Branding (`/services/logo/`, from ₹3,499)

| Tier | Keywords |
| --- | --- |
| Primary | logo design for small business India, business logo design service |
| Secondary | branding kit for small business, logo and business card design |
| Long-tail | affordable logo design for shop owners India |
| Commercial | logo design cost India, business branding package price |

**Difficulty**: High — "logo design" alone is saturated with freelance
marketplaces (Fiverr/99designs SEO dominance). **Priority: Tier 3** — real
demand but genuinely hard to win organically at low spend; better suited as
an upsell on service/package pages than a standalone acquisition channel.

### Reviews & Reputation (`/services/reviews/`, from ₹2,499)

| Tier | Keywords |
| --- | --- |
| Primary | get more Google reviews for business, review management service small business |
| Secondary | how to collect customer reviews India, Google review QR code setup |
| Long-tail | review request template for small business, increase 5 star reviews shop |
| Commercial | review management service cost India |

**Difficulty**: Low. **Priority: Tier 1** — low competition, and reputation is
a felt pain point for exactly the audience LocalRise targets (a business with
happy customers who "just aren't leaving reviews yet," per the service's own
copy).

### Business Automation (`/services/automation/`, from ₹29,999)

| Tier | Keywords |
| --- | --- |
| Primary | WhatsApp automation for small business, business automation service India |
| Secondary | auto reply system for business WhatsApp, lead capture automation small business |
| Long-tail | how to automate customer replies small business India |
| Commercial | business automation service cost India |

**Difficulty**: Low–Medium — an emerging query space, few dedicated local
competitors. **Priority: Tier 2** — highest price point in the whole catalogue
(₹29,999+), so worth investing in even at lower search volume; best suited to
Ads (high intent, low organic volume) rather than a primary SEO bet.

## 3. Industry-level clusters

`lib/content/industries.ts` lists 9 industries. Each is currently a homepage
section, not a dedicated page — **that's a real content-architecture gap**:
these keyword patterns want a landing page of their own (`/industries/<slug>/`
or similar — a `content-architect` decision, flagged for Phase 2 planning, not
built here).

Pattern per industry: **"website for [industry] business"** /
**"[industry] website design India"** / **"online presence for [industry]"**.

| Industry (from `industries.ts`) | Example primary keyword | Difficulty | Priority |
| --- | --- | --- | --- |
| Doctors & Clinics | website for clinic India, doctor appointment booking website | Medium | Tier 1 |
| Restaurants & Cafés | restaurant website design India, digital menu website for cafe | Medium | Tier 1 |
| Hotels & Stays | hotel website design India, direct booking website for hotel | Medium | Tier 2 |
| Schools & Coaching | website for coaching institute India, admission enquiry website design | Low–Medium | Tier 1 |
| Builders & Contractors | website for construction business India, contractor portfolio website | Low | Tier 2 |
| Furniture Stores | website for furniture showroom India | Low | Tier 3 |
| Tiles & Sanitaryware | website for tiles dealer India | Low | Tier 3 |
| Real Estate | real estate agent website India, property listing website design | High (competes with portals) | Tier 2 |
| Salons & Spas | salon website with online booking India, spa booking website design | Medium | Tier 1 |

**Priority reasoning**: Tier 1 industries (clinics, restaurants, coaching,
salons) combine real search volume with manageable competition and a package
price point (₹7,999–14,999) that matches typical budget for these business
types. Real estate has volume but competes against listing portals, not just
agencies — harder win. Furniture/tiles are genuine niches with low volume but
also near-zero competition — cheap to rank for, just don't expect much
traffic.

## 4. Long-tail / question keywords (AEO/AI-Overview targets — Phase 6)

These map directly to FAQ content (`lib/content/faqs.ts`) and are exactly the
phrasing Google AI Overviews, ChatGPT, and Perplexity surface verbatim answers
for. Write FAQ answers as direct, quotable 2–3 sentence answers — see
`docs/content.md`'s honest-content rules; answers must stay accurate to what
LocalRise actually does, not aspirational.

- "how much does a website cost for a small business in India"
- "how long does it take to build a business website"
- "do I need a website if I have a Google Business Profile"
- "how do I get my shop on Google Maps"
- "what is included in a small business website package"
- "how do I set up WhatsApp Business for my shop"

## 5. Commercial / transactional keywords (Ads-first, not organic-first)

High intent, but too competitive or too low-volume individually to be a
primary SEO target — this is exactly the list `ads-strategy.md` turns into ad
groups with tight, dedicated landing pages instead of one page trying to rank
for everything.

- website design packages India / pricing
- small business website package price
- hire website designer for shop India
- digital marketing package for small business India
- website + Google Business Profile combo package

---

## Priority matrix (roll-up)

| Tier | Meaning | Clusters |
| --- | --- | --- |
| **Tier 1** | Build/target first — good value, manageable difficulty | Websites, Google Business Profile, WhatsApp Business, Reviews & Reputation; industries: Clinics, Restaurants, Coaching, Salons |
| **Tier 2** | High value, harder or higher-spend — worth dedicated Ads pages | Online Store, Business Automation; industries: Hotels, Builders, Real Estate; core brand terms |
| **Tier 3** | Real but low-volume/high-difficulty — upsell, not acquisition | Logo & Branding; industries: Furniture, Tiles & Sanitaryware |

## Page mapping (what targets what today)

| Cluster | Current page | Status |
| --- | --- | --- |
| 7 service clusters | `/services/<id>/` | Live — `generateMetadata` already targets primary keyword via `service.title`/`detail.sub`; **titles/descriptions could be tightened toward these exact clusters** — a `seo-copywriter` task, not done in this pass |
| Core/brand | `/`, `/why-us/` | Live |
| Industry clusters | Homepage section only (`Industries` component) | **Gap** — no dedicated URL per industry, so none of the industry keyword clusters have a page that can actually rank for them. Candidate for Phase 2 IA work |
| Commercial/Ads clusters | None yet | **Gap** — this is exactly what the dedicated Ads landing pages (Phase 4, next) exist to fill |

## Next steps

1. Once Search Console shows real impression/query data (needs the indexing
   fix from the previous session to take effect, plus time), replace the
   qualitative difficulty column with real numbers and re-rank within tiers.
2. Once a Google Ads account exists, pull Keyword Planner volumes for every
   Tier 1/2 keyword before finalizing ad group structure in `ads-strategy.md`.
3. `content-architect` should evaluate whether the 9 industries warrant
   dedicated `/industries/<slug>/` pages (real ranking opportunity, per §3) or
   whether that's better solved by expanding the homepage section's on-page
   text — a real IA trade-off, not a foregone conclusion.
