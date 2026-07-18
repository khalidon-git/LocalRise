import type { Metadata } from "next";
import { concepts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { Icon } from "@/components/ui/Icon";
import { ConceptCard } from "@/components/concepts/ConceptCard";

const siteUrl = "https://localrise.in";
const title = "Concept Websites";
const description =
  "Design concepts for local businesses — clinics, restaurants, hotels, stores, gyms and salons. Each one a different look and feel, built to show what your website could be.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/concepts/` },
  openGraph: { title: `${title} · LocalRise`, description, url: `${siteUrl}/concepts/`, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
};

// A CollectionPage rather than a portfolio of client work — these are concepts,
// and the schema shouldn't imply otherwise.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/concepts/#page`,
  name: `${title} · LocalRise`,
  description,
  url: `${siteUrl}/concepts/`,
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: concepts.map((c) => ({
    "@type": "CreativeWork",
    name: c.name,
    genre: c.industry,
    abstract: c.summary,
    url: `${siteUrl}/concepts/${c.slug}/`,
  })),
};

export default function ConceptsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-pad pt-32 sm:pt-36">
        <div className="container-x">
          <SectionHeading
            title="Concept websites for local businesses"
            description="We're a young studio, so rather than borrow other people's logos we design honest concepts. Each is a different industry with its own colours, type and layout — the same care we'd bring to your business."
          />

          <Reveal delay={0.1} className="mx-auto mt-6 flex max-w-xl justify-center">
            <p className="inline-flex items-start gap-2 rounded-2xl border border-line bg-bg-subtle px-4 py-3 text-center text-body-sm text-ink-2">
              <Icon name="spark" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>
                These are <span className="font-medium text-ink">design concepts</span>, not client
                projects. The businesses are fictional — the craft is real.
              </span>
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {concepts.map((c) => (
              <StaggerItem key={c.slug}>
                <ConceptCard concept={c} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-16 rounded-3xl border border-line bg-bg-subtle p-8 text-center sm:p-12">
            <h2 className="font-display text-heading-2 font-semibold text-ink">
              Want something like this for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-body-lg text-ink-2">
              Tell us what you do and we&apos;ll design a look that fits it — with a clear price and
              timeline before we start.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg" arrow>
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
