import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { FeaturedConcepts } from "@/components/sections/FeaturedConcepts";
import { concepts } from "@/lib/content";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL, absoluteUrl, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata();

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: absoluteUrl("/"),
  name: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: { "@id": `${SITE_URL}/#logo` },
  inLanguage: "en-IN",
};

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  // `concepts` is imported here (a server module) and handed to the client
  // FeaturedConcepts marquee as a prop, so the catalogue's prose ships in the
  // RSC payload rather than the homepage's client JS bundle.
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }} />
      <Hero />
      <TrustBar />
      <Packages />
      <IndividualServices />
      <FeaturedConcepts concepts={concepts} />
    </main>
  );
}
