import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { Industries } from "@/components/sections/Industries";

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Packages />
      <IndividualServices />
      <Industries />
    </main>
  );
}
