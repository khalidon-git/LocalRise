import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { brand, faqs } from "@/lib/content";
import { AudioProvider } from "@/providers/AudioProvider";
import { CartProvider } from "@/providers/CartProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

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
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
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
        {/* AudioProvider sits at the root so its <audio> element is mounted once
            and survives every client-side navigation — never recreated, never
            restarted. */}
        <AudioProvider>
          <CartProvider>
            <Nav />
            {children}
            <Footer />
            <WhatsAppButton />
            <AudioToggle />
            <CartDrawer />
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
