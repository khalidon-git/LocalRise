import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { FeaturedConcepts } from "@/components/sections/FeaturedConcepts";
import { concepts } from "@/lib/content";

// Which concepts the homepage teaser carousel shows. Kept here (a server
// module), not in FeaturedConcepts, because that's a "use client" file and
// data exported from it would reach the server only as an unusable
// client-reference proxy.
//
// Three, not two: FeaturedConcepts shows one concept prominently with a peek
// of the next (see docs/concepts.md). With only two slides, that pattern has
// no clean "next" to peek at past the second card — the track's max scroll
// falls short of a full card-step, so the last slide gets stuck showing the
// previous card lingering on the left instead of a forward peek. A third
// slide gives every position an intentional peek in both directions.
const featuredConceptSlugs = ["noir-and-vine", "meridian-dental", "casa-alma"] as const;

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  // Resolve the teaser concepts here, in the server component, and hand
  // FeaturedConcepts (a client component) only what it renders. This keeps the
  // full `concepts` catalogue out of the homepage's client JS bundle.
  const featured = featuredConceptSlugs
    .map((slug) => concepts.find((c) => c.slug === slug))
    .filter((c): c is (typeof concepts)[number] => Boolean(c));

  return (
    <main>
      <Hero />
      <TrustBar />
      <Packages />
      <IndividualServices />
      <FeaturedConcepts featured={featured} />
    </main>
  );
}
