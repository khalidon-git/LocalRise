import type { Metadata } from "next";
import { concepts } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { Icon } from "@/components/ui/Icon";
import { ConceptCard } from "@/components/concepts/ConceptCard";
import { SITE_URL, absoluteUrl, createPageMetadata, serializeJsonLd } from "@/lib/seo";

const title = "Website Design Concepts for Local Businesses | LocalRise";
const description =
  "Explore website design concepts created by LocalRise for restaurants, clinics, contractors, shops and other local business categories.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/concepts/" });

// A CollectionPage rather than a portfolio of client work — these are concepts,
// and the schema shouldn't imply otherwise.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/concepts/#page`,
      name: title,
      description,
      url: absoluteUrl("/concepts/"),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: concepts.map((c) => ({
        "@type": "CreativeWork",
        name: c.name,
        genre: c.industry,
        abstract: `${c.summary} A fictional design concept by LocalRise — not a client project.`,
        url: absoluteUrl(`/concepts/${c.slug}/`),
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/concepts/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Concepts", item: absoluteUrl("/concepts/") },
      ],
    },
  ],
};

export default function ConceptsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <section className="section-pad pt-28 sm:pt-32">
        <div className="container-x">
          <div className="mx-auto flex flex-col items-center gap-2 text-center sm:gap-3">
            <Reveal delay={0.05}>
              <h1 className="font-display text-heading-section text-ink">
                Website concepts for local businesses
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-prose text-body-sm text-ink-2 sm:text-body-lg">
                We&apos;re a young studio, so rather than borrow other people&apos;s logos we design honest
                concepts. Each is a different industry with its own colours, type and layout — the
                same care we&apos;d bring to your business.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto mt-6 flex max-w-xl justify-center">
            <p className="inline-flex items-start gap-2 rounded-2xl border border-line bg-bg-subtle px-4 py-3 text-center text-body-sm text-ink-2">
              <Icon name="spark" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                These are <span className="font-medium text-ink">design concepts</span>, not client
                projects. The businesses are fictional — the craft is real.
              </span>
            </p>
          </Reveal>

          <Stagger amount={0.03} className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6">
            {concepts.map((c) => (
              <StaggerItem key={c.slug}>
                <ConceptCard concept={c} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-12 rounded-2xl border border-line bg-bg-subtle p-6 text-center sm:mt-14 sm:rounded-3xl sm:p-10">
            <h2 className="font-display text-heading-2 font-semibold text-ink">
              Want something like this for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-body-lg text-ink-2">
              Tell us what you do and we&apos;ll design a look that fits it — with a clear price and
              timeline before we start.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/contact/" size="lg" arrow>
                Get a free consultation
              </Button>
              <ConversationButton
                start={{ channel: "whatsapp", type: "consultation", meta: { section: "concepts-listing", button: "chat-on-whatsapp" } }}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
              >
                Chat on WhatsApp
              </ConversationButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
