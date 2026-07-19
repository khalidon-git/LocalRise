import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { FAQ } from "@/components/sections/FAQ";

const siteUrl = "https://localrise.in";
const title = "Frequently Asked Questions";
const description =
  "Straight answers about LocalRise websites, timelines, pricing, Google visibility, WhatsApp and ongoing support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/faq/` },
  openGraph: { title: `${title} · LocalRise`, description, url: `${siteUrl}/faq/`, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/faq/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
