// ---------------------------------------------------------------------------
// Analytics & conversion tracking configuration.
//
// These are PLACEHOLDERS. The site owner must paste real IDs here before any
// tracking happens — until then the tag renders nothing and the site makes
// ZERO external requests (see `analyticsEnabled` below and components/analytics
// /GoogleTag.tsx). Loading Google's gtag.js is a deliberate, scoped exception
// to the site's zero-external-request rule; see
// knowledge/decisions/008-analytics-conversion-tracking.md.
//
// Where to get the real values:
//
//   GA4_MEASUREMENT_ID
//     Google Analytics → Admin → Data Streams → (your web stream) →
//     "Measurement ID". Format: "G-XXXXXXXXXX".
//
//   GOOGLE_ADS_CONVERSION_ID
//     Google Ads → Tools → Conversions → (your conversion action) →
//     "Tag setup" / "Use Google tag". The "AW-XXXXXXXXXX" value.
//
//   GOOGLE_ADS_CONVERSION_LABEL
//     Same conversion action. The full send_to looks like
//     "AW-XXXXXXXXXX/AbC-D_efGh1234". Paste ONLY the part AFTER the slash here.
//
// This is a plain TypeScript constants file on purpose — it matches the repo's
// convention (e.g. lib/content/brand.ts). The project has no .env / runtime env
// pattern (static export = no runtime env), so don't introduce one.
// ---------------------------------------------------------------------------

export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
export const GOOGLE_ADS_CONVERSION_ID = "AW-XXXXXXXXXX";
export const GOOGLE_ADS_CONVERSION_LABEL = "XXXXXXXXXXXXXXXXXXXX";

// Each product is gated independently — GA4 and Ads are typically set up at
// different times, and an OR'd single flag would let a still-placeholder ID
// ride along into a live gtag request the moment the OTHER one goes real.
// The Ads flag also requires the label: a real AW- id with a forgotten label
// sends a conversion hit that matches no conversion action in the account —
// it fails silently, which is worse than not sending it at all.
export const ga4Enabled = GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX";
export const adsEnabled =
  GOOGLE_ADS_CONVERSION_ID !== "AW-XXXXXXXXXX" &&
  GOOGLE_ADS_CONVERSION_LABEL !== "XXXXXXXXXXXXXXXXXXXX";

// True once either product is genuinely configured. While false, GoogleTag
// renders nothing and no request to googletagmanager.com is made — so the
// zero-external-request invariant holds until real IDs are deliberately
// pasted in.
export const analyticsEnabled = ga4Enabled || adsEnabled;
