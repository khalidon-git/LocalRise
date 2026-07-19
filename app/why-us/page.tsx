import type { Metadata } from "next";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

// Formerly three homepage sections (Process, WhyChooseUs, FAQ), relocated
// here as one page so the homepage stays focused on conversion. Content and
// interactions are untouched — only the surrounding page changed. See
// docs/architecture.md and docs/navigation.md for the nav/footer links that
// point here.
const siteUrl = "https://localrise.in";
const title = "Why LocalRise";
const description =
  "A straightforward digital partner for local businesses: clear communication, transparent pricing, fast delivery and friendly support.";

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
      <section className="section-pad !pb-0 !pt-28 sm:!pt-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h1 className="font-display text-heading-1 font-semibold text-ink">A practical partner for local business growth</h1>
          <p className="mt-4 text-body-lg text-ink-2">Clear communication, honest pricing and helpful support — without unnecessary jargon or complexity.</p>
        </div>
      </section>
      <WhyChooseUs />
    </main>
  );
}
