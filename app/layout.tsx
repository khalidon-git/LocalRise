import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { brand } from "@/lib/content";
import { AudioProvider } from "@/providers/AudioProvider";
import { CartProvider } from "@/providers/CartProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { GoogleTag } from "@/components/analytics/GoogleTag";

const siteUrl = "https://localrise.in";
const description =
  "LocalRise builds professional websites, gets you found on Google, and connects customers over WhatsApp — helping local businesses across India attract more customers. Transparent pricing, fast delivery, no hidden charges.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LocalRise — Helping Local Businesses Grow Online",
    template: "%s · LocalRise",
  },
  description,
  keywords: [
    "digital agency India",
    "local business website",
    "Google Business Profile setup",
    "WhatsApp business",
    "affordable website design",
    "small business online",
  ],
  authors: [{ name: "LocalRise" }],
  creator: "LocalRise",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "LocalRise",
    title: "LocalRise — Helping Local Businesses Grow Online",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalRise — Helping Local Businesses Grow Online",
    description,
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: brand.name,
      description,
      url: siteUrl,
      email: brand.email,
      telephone: [brand.phoneDisplay, brand.phoneAltDisplay],
      areaServed: "IN",
      slogan: brand.tagline,
      priceRange: "₹₹",
      sameAs: [brand.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brand.name,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    // FAQPage schema is NOT global — it renders as a page-level script on
    // /faq/ (see app/faq/page.tsx), the only page showing the full FAQ. Keeping
    // it out of this graph avoids emitting FAQ schema on the homepage and every
    // other page, where no FAQ is visible.
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google tag (gtag.js) — GA4 + Google Ads conversion tracking. Renders
            nothing until real IDs are set in lib/analytics/config.ts, so the
            site keeps making zero external requests until the owner opts in.
            It's a server component (next/script works fine from one), so this
            layout stays a server component — see knowledge/decisions/008. */}
        <GoogleTag />
        {/* AudioProvider sits at the root so its <audio> element is mounted once
            and survives every client-side navigation — never recreated, never
            restarted. */}
        <AudioProvider>
          <CartProvider>
            {/* SiteChrome renders Nav/Footer/floating chrome around the page —
                except on concept "live" routes, which render chrome-free so each
                fictional brand stands alone. Providers stay mounted either way,
                so the audio engine and its explicit Listen control still work
                everywhere they should. */}
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
