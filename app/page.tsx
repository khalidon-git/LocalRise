import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { IndividualServices } from "@/components/sections/IndividualServices";
import { Industries } from "@/components/sections/Industries";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Packages />
        <IndividualServices />
        <Industries />
        <Portfolio />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
