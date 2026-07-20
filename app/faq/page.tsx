import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";
import { SITE_URL, createPageMetadata, serializeJsonLd } from "@/lib/seo";

const title = "LocalRise India FAQs | Websites, Google and WhatsApp";
const description =
  "Straight answers about LocalRise websites, timelines, pricing, Google visibility, WhatsApp and ongoing support.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/faq/" });

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <section className="section-pad !pb-0 !pt-28 sm:!pt-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h1 className="font-display text-heading-1 font-semibold text-ink">Frequently asked questions</h1>
          <p className="mt-4 text-body-lg text-ink-2">Everything you need to know before starting a project with LocalRise.</p>
        </div>
      </section>
      <FAQ showIntro={false} />
    </main>
  );
}
