import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { brand } from "@/lib/content";
import { AudioProvider } from "@/providers/AudioProvider";
import { CartProvider } from "@/providers/CartProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  serializeJsonLd,
} from "@/lib/seo";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | LocalRise India",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "digital agency India",
    "local business website",
    "Google Business Profile setup",
    "WhatsApp business",
    "affordable website design",
    "small business online",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630, alt: "LocalRise India — websites and digital growth for local businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/opengraph-image.png")],
  },
  alternates: { canonical: absoluteUrl("/") },
  verification:
    googleVerification || bingVerification
      ? {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        }
      : undefined,
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: brand.name,
      alternateName: ["LocalRise India", "LocalRise.in"],
      description:
        "LocalRise is an India-focused digital studio helping local businesses get more customers through professional websites, Google visibility, WhatsApp integration, branding and business automation.",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: absoluteUrl("/logo.png"),
        contentUrl: absoluteUrl("/logo.png"),
        caption: SITE_NAME,
      },
      email: `mailto:${brand.email}`,
      telephone: [brand.phoneHref, brand.phoneAltHref],
      contactPoint: [
        { "@type": "ContactPoint", telephone: brand.phoneHref, contactType: "customer service", areaServed: "IN" },
        { "@type": "ContactPoint", telephone: brand.phoneAltHref, contactType: "customer service", areaServed: "IN" },
      ],
      areaServed: { "@type": "Country", name: "India" },
      slogan: brand.tagline,
      sameAs: [brand.instagram],
      knowsAbout: [
        "Small business website design",
        "Google Business Profile setup",
        "WhatsApp Business setup",
        "Ecommerce website development",
        "Logo and branding design",
        "Business automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      alternateName: brand.name,
      description: "Websites and digital growth services for local businesses across India.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    // FAQPage schema is NOT global — it renders as a page-level script on
    // /faq/ (see app/faq/page.tsx), the only page showing the full FAQ. Keeping
    // it out of this graph avoids emitting FAQ schema on the homepage and every
    // other page, where no FAQ is visible.
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        {/* The client consent gate initializes denied local consent state and
            only renders Google's external script after an explicit opt-in.
            Keeping that client boundary here preserves this layout as a server
            component, so its metadata exports remain intact. */}
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
