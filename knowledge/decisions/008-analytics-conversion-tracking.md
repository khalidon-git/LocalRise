# ADR-008 — Consent-gated Google Ads conversion tracking

**Date**: 2026-07-18 · **Status**: Accepted · **Related**: [ADR-007](./007-concept-live-sites.md) (the first zero-external-request exception)

## Context

An indexing audit found LocalRise had zero pages indexed by Google, traced to a
historical 403 (see `knowledge/bugs/005`) that is now fixed. As part of getting
the site properly indexed and driving paid traffic, LocalRise is running
**Google Ads** and needs to measure results: which visits become WhatsApp
conversations, and which ads/keywords produced them.

The active requirement is **Google Ads** (`AW-…` + a conversion label), so the
ad account can attribute conversions and optimise bidding. The architecture
retains dormant GA4 (`G-…`) support for a future owner-supplied measurement ID,
but GA4 is not currently configured or emitted. Both products would use the
same `googletagmanager.com/gtag/js` loader; the site never adds a second loader.

This collides head-on with the site's standing rule (CLAUDE.md #8): **zero
external requests** — self-hosted fonts, inline SVG, no CDNs, no third-party
runtime dependencies. [ADR-007](./007-concept-live-sites.md) already carved one
scoped exception (Unsplash photography, confined to `/concepts/*/live/`). This is
the second, and the rule now explicitly reads "zero external requests, with two
documented exceptions."

## Decision

Load Google's `gtag.js` for Google Ads conversion tracking, with dormant GA4
support, as a **deliberate, narrowly-scoped exception** to the
zero-external-request rule.

- The **only** new external origin permitted is `www.googletagmanager.com`
  (gtag.js), which in turn talks to Google's collection endpoints. Nothing else
  is added: fonts stay self-hosted, imagery stays inline/self-hosted, no other
  third-party script or CDN is introduced.
- After explicit consent, the tag is loaded client-side via `next/script` with
  `strategy="afterInteractive"` from **`components/analytics/GoogleTag.tsx`**,
  mounted in `app/layout.tsx`. `GoogleTag` is a client consent boundary while
  the layout stays a server component, so no exported `metadata` is lost (see
  [docs/seo.md](../../docs/seo.md) / CLAUDE.md #3). This is compatible with
  `output: "export"`: gtag.js runs only in the browser at runtime; nothing about
  it needs a server.
- **IDs live in a plain constants file**, `lib/analytics/config.ts`, matching the
  repo convention (`lib/content/brand.ts`). The project has no `.env` / runtime
  env pattern — a static export has no runtime env — so none was introduced.
- A single WhatsApp conversion helper is wired into the existing communication
  layer: every genuine WhatsApp action reaches `startConversation()`, which
  invokes `trackWhatsAppConversion()` once immediately before opening WhatsApp.
  The helper requires granted consent and an available `gtag`, emits only the
  supplied Google Ads destination, and deduplicates accidental same-task calls.

## Advertiser, not publisher

LocalRise is the **advertiser** here — it *buys* Google Ads and measures its own
outbound conversions. It is **not** a publisher: it runs no ad slots, embeds no
third-party ad units, sells no ad space, and monetises no visitor data. The only
reason a Google script loads is to attribute LocalRise's own ad spend to its own
leads. That's a materially smaller privacy/perf surface than ad monetisation, and
it's the whole justification for making the exception at all.

## Configuration status

The account-level Google Ads tag ID and owner-supplied WhatsApp conversion label
are configured. GA4 remains an **obvious placeholder**; we will not invent a
plausible-looking value:

| Constant | Placeholder | Source |
| --- | --- | --- |
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA → Admin → Data Streams → Measurement ID |
| `GOOGLE_ADS_CONVERSION_ID` | `AW-18332132948` | Configured account-level Google Ads tag |
| `GOOGLE_ADS_CONVERSION_LABEL` | `19YtCNmr49McENTMuKVE` | Website WhatsApp Click conversion action |

`config.ts` separates the base Google Ads tag from event conversion readiness.
Both remain inert until explicit consent; the conversion event uses the exact
destination `AW-18332132948/19YtCNmr49McENTMuKVE`.

## Consent gate

`GoogleTag` initializes a local gtag queue with all four Consent Mode v2 fields
denied. It does not download or configure Google's tag until the visitor accepts
optional cookies. The decision is stored as `localrise_consent_v1`; rejecting
keeps the script absent, and the footer preference control supports withdrawal
or later opt-in. Withdrawal updates consent to denied and removes recognised
first-party Google advertising cookies where browser rules permit. If Google's
runtime already loaded, withdrawal hard-reloads the page so the denied next
document never mounts it. Conversion events also check the same stored consent
before they can fire.

## Alternatives rejected

| Option | Why not |
| --- | --- |
| Self-host / proxy gtag.js | gtag.js phones home to Google regardless; proxying adds a server (we have none) and breaks Ads/GA integrity for no real privacy win |
| Server-side tagging / Measurement Protocol | Requires a server; static export has none |
| A different, "lighter" analytics tool | Doesn't solve the actual need — Google **Ads** conversion attribution specifically requires Google's tag |
| Fabricate/guess IDs to look complete | Violates honest-content policy ([ADR-004](./004-honest-content-policy.md)); wrong IDs would also silently mis-track |
| `.env` / `NEXT_PUBLIC_*` | No env pattern exists in this repo, and static export bakes values at build anyway — a constants file is simpler and matches convention |

## Trade-offs

- **Cost**: visitors who opt in make Google's script and collection requests;
  this adds payload and Google privacy considerations for those visitors.
- **Benefit**: LocalRise can finally measure paid-traffic ROI and optimise Ads
  bidding toward real WhatsApp conversions — the point of running ads at all.

## Future

If a second conversion surface appears (e.g. a phone-call channel), give it a
distinct conversion helper and destination at the same communication boundary.
Every future measurement call must retain the shared stored-consent guard.
