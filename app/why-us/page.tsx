import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";

// Formerly three homepage sections (Process, WhyChooseUs, FAQ), relocated
// here as one page so the homepage stays focused on conversion. Content and
// interactions are untouched — only the surrounding page changed. See
// docs/architecture.md and docs/navigation.md for the nav/footer links that
// point here.
const siteUrl = "https://localrise.in";
const title = "How It Works & FAQ";
const description =
  "How a project with LocalRise runs from first message to launch, why businesses stick with us, and answers to the questions we hear most.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/why-us/` },
  openGraph: { title: `${title} · LocalRise`, description, url: `${siteUrl}/why-us/`, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
};

export default function WhyUsPage() {
  return (
    <main>
      <section className="section-pad !pb-0 !pt-32 sm:!pt-36">
        <div className="container-x">
          <SectionHeading
            title="How we work, and why businesses stick with us"
            description="From your first message to launch day — plus the questions we hear most, answered simply."
          />
        </div>
      </section>
      <Process />
      <WhyChooseUs />
      <FAQ />
    </main>
  );
}
