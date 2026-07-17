import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

// Nav, Footer and WhatsAppButton live in app/layout.tsx so every page —
// including the /services/[slug] pages — shares the same chrome.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <Packages />
      <IndividualServices />
      <Industries />
      <Process />
      <WhyChooseUs />
      <FAQ />
      <Contact />
    </main>
  );
}
