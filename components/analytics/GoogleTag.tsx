import Script from "next/script";
import {
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_CONVERSION_ID,
  ga4Enabled,
  adsEnabled,
  analyticsEnabled,
} from "@/lib/analytics/config";

// Loads Google's gtag.js once and configures whichever of GA4 / Google Ads
// actually has real IDs — each is gated independently (see
// lib/analytics/config.ts) so a still-placeholder product never rides along
// into a live request just because the other one went real. Conversion
// events are fired later from lib/communication/index.ts.
//
// This is a *server component* — next/script renders fine from one, so
// app/layout.tsx can mount it without becoming a client component. Adding
// "use client" to the layout would silently drop all exported `metadata`
// (see docs/seo.md), which is exactly what we must avoid.
//
// Returns null until at least one product has real IDs, so the site makes
// zero external requests until the owner opts in. Loading gtag.js at all is a
// documented exception to the zero-external-request rule — see
// knowledge/decisions/008-analytics-conversion-tracking.md.
export function GoogleTag() {
  if (!analyticsEnabled) return null;

  // gtag.js needs one id in its src query to bootstrap; which product owns
  // that id doesn't matter since we call `config` explicitly for each
  // enabled product below.
  const srcId = ga4Enabled ? GA4_MEASUREMENT_ID : GOOGLE_ADS_CONVERSION_ID;
  const configCalls = [
    ga4Enabled && `gtag('config', '${GA4_MEASUREMENT_ID}');`,
    adsEnabled && `gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');`,
  ]
    .filter(Boolean)
    .join("\n          ");

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${srcId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configCalls}
        `}
      </Script>
    </>
  );
}

export default GoogleTag;
