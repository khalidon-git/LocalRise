// ---------------------------------------------------------------------------
// Analytics & conversion tracking configuration.
//
// The Google Ads account tag and WhatsApp-click conversion are configured.
// GA4 remains a placeholder, so no GA4 configuration or event is emitted.
// Loading Google's gtag.js is a deliberate, consent-gated exception to the
// zero-external-request rule; see ADR-008.
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
export const GOOGLE_ADS_CONVERSION_ID: string = "AW-18332132948";
export const GOOGLE_ADS_CONVERSION_LABEL: string = "19YtCNmr49McENTMuKVE";
export const GOOGLE_ADS_WHATSAPP_CONVERSION_DESTINATION =
  `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

// The account-level Ads tag can be configured before a conversion action
// exists. Conversion events stay independently gated on the supplied label so
// a base tag can never send an incomplete WhatsApp conversion.
export const ga4Enabled = GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX";
export const googleAdsEnabled = GOOGLE_ADS_CONVERSION_ID !== "AW-XXXXXXXXXX";
export const adsEnabled =
  googleAdsEnabled &&
  GOOGLE_ADS_CONVERSION_LABEL !== "XXXXXXXXXXXXXXXXXXXX";

// True once either base product tag is genuinely configured. While false,
// GoogleTag renders nothing and no request to googletagmanager.com is made.
export const analyticsEnabled = ga4Enabled || googleAdsEnabled;
