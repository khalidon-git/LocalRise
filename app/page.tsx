import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { FeaturedConcepts } from "@/components/sections/FeaturedConcepts";

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Packages />
      <IndividualServices />
      <FeaturedConcepts />
    </main>
  );
}
