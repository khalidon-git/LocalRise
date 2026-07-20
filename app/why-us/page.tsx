import type { Metadata } from "next";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { createBreadcrumbJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

// Formerly three homepage sections (Process, WhyChooseUs, FAQ), relocated
// here as one page so the homepage stays focused on conversion. Content and
// interactions are untouched — only the surrounding page changed. See
// docs/architecture.md and docs/navigation.md for the nav/footer links that
// point here.
const title = "Why Choose LocalRise India for Your Business Website";
const description =
  "Learn how LocalRise helps Indian small businesses build a professional online presence with clear pricing, practical support and growth-focused digital services.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/why-us/" });

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Why Us", path: "/why-us/" },
]);

export default function WhyUsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <section className="section-pad !pb-12 !pt-28 sm:!pb-16 sm:!pt-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h1 className="font-display text-heading-1 font-semibold text-ink">Why local businesses choose LocalRise</h1>
          <p className="mt-4 text-body-lg text-ink-2">Clear communication, honest pricing and helpful support — without unnecessary jargon or complexity.</p>
        </div>
      </section>
      <WhyChooseUs />
    </main>
  );
}
