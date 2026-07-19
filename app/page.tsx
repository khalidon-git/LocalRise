import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { FeaturedConcepts } from "@/components/sections/FeaturedConcepts";
import { concepts } from "@/lib/content";

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  // `concepts` is imported here (a server module) and handed to the client
  // FeaturedConcepts marquee as a prop, so the catalogue's prose ships in the
  // RSC payload rather than the homepage's client JS bundle.
  return (
    <main>
      <Hero />
      <TrustBar />
      <Packages />
      <IndividualServices />
      <FeaturedConcepts concepts={concepts} />
    </main>
  );
}
