import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { concepts, getConcept } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ConceptMock } from "@/components/concepts/ConceptMock";
import { ConceptPhone } from "@/components/concepts/ConceptPhone";
import { ConceptCard } from "@/components/concepts/ConceptCard";
import { cx } from "@/lib/utils";

const siteUrl = "https://localrise.in";

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const concept = getConcept(params.slug);
  if (!concept) return {};

  const title = `${concept.name} — ${concept.industry} Website Concept`;
  const description = concept.summary;
  const url = `${siteUrl}/concepts/${concept.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} · LocalRise`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
  };
}

export default function ConceptPage({ params }: { params: { slug: string } }) {
  const concept = getConcept(params.slug);
  if (!concept) notFound();

  const others = concepts.filter((c) => c.slug !== concept.slug).slice(0, 2);

  // CreativeWork, not a portfolio item — and abstract states plainly that the
  // business is fictional, so the schema can't imply a real client.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${siteUrl}/concepts/${concept.slug}/#concept`,
        name: concept.name,
        genre: concept.industry,
        abstract: `${concept.summary} A fictional design concept by LocalRise — not a client project.`,
        creator: { "@id": `${siteUrl}/#organization` },
        url: `${siteUrl}/concepts/${concept.slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Concepts", item: `${siteUrl}/concepts/` },
          { "@type": "ListItem", position: 3, name: concept.name },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-pad pt-32 sm:pt-36">
        <div className="container-x">
          {/* Visible breadcrumb — matches the BreadcrumbList above */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm text-ink-3">
              <SmartLink href="/" className="transition-colors hover:text-ink">
                Home
              </SmartLink>
              <Icon name="arrow-right" size={13} strokeWidth={2} />
              <SmartLink href="/concepts" className="transition-colors hover:text-ink">
                Concepts
              </SmartLink>
              <Icon name="arrow-right" size={13} strokeWidth={2} />
              <span className="text-ink-2">{concept.name}</span>
            </nav>
          </Reveal>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* Intro */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                  Design Concept
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5 text-eyebrow uppercase text-accent">{concept.industry}</p>
                <h1 className="mt-2 font-display text-display-lg text-ink">{concept.name}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-body-lg text-ink-2">{concept.description}</p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={`/concepts/${concept.slug}/live`} size="lg" variant="dark" icon="browser" arrow>
                    Live Preview
                  </Button>
                  <Button href="/#contact" size="lg" variant="secondary">
                    Build something similar
                  </Button>
                </div>
                <p className="mt-3 text-[13px] text-ink-3">
                  Live Preview opens {concept.name}&apos;s full concept site — independent, no LocalRise branding.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-5 text-body-sm text-ink-3">
                  {concept.name} is a fictional business created to explore this design direction.
                  It isn&apos;t a real client, and nothing here claims a real result.
                </p>
              </Reveal>
            </div>

            {/* Live preview: desktop + mobile together */}
            <Reveal delay={0.1}>
              <div className="relative">
                <ConceptMock concept={concept} />
                <div className="mt-4 flex items-end gap-4 sm:absolute sm:-bottom-8 sm:-right-4 sm:mt-0 sm:w-[150px]">
                  <ConceptPhone concept={concept} className="w-[120px] shrink-0 sm:w-full" />
                  <p className="pb-2 text-[12px] text-ink-3 sm:hidden">Mobile view</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Design style */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-heading-2 font-semibold text-ink">The design thinking</h2>
              <p className="mt-3 text-body-lg text-ink-2">{concept.tagline}.</p>

              {/* Palette — shows the identity is deliberate, not decoration */}
              <div className="mt-7">
                <p className="text-label font-semibold uppercase tracking-wider text-ink-3">Palette &amp; type</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={cx("h-9 w-9 rounded-lg border border-line", concept.identity.brand)} />
                  <span className={cx("h-9 w-9 rounded-lg border border-line", concept.identity.muted)} />
                  <span className={cx("h-9 w-9 rounded-lg border border-line", concept.identity.canvas)} />
                  <span className={cx("ml-2 text-body-sm text-ink-2", concept.identity.font)}>
                    {concept.designStyle}
                  </span>
                </div>
              </div>
            </div>

            <Stagger className="grid gap-3">
              {concept.designNotes.map((note) => (
                <StaggerItem key={note}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                      <Icon name="check" size={13} strokeWidth={2.6} />
                    </span>
                    <p className="text-body text-ink-2">{note}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="font-display text-heading-2 font-semibold text-ink">What we&apos;d build</h2>
          <p className="mt-3 max-w-xl text-body-lg text-ink-2">
            Everything a {concept.industry.toLowerCase()} actually needs — nothing it doesn&apos;t.
          </p>
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {concept.features.map((f) => (
              <StaggerItem key={f}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                  <Icon name="check" size={16} strokeWidth={2.4} className="shrink-0 text-accent" />
                  <span className="text-body-sm font-medium text-ink">{f}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* More concepts + CTA */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-heading-2 font-semibold text-ink">More concepts</h2>
            <SmartLink href="/concepts" className="inline-flex items-center gap-1.5 text-body-sm font-medium text-accent">
              View all
              <Icon name="arrow-right" size={15} strokeWidth={2} />
            </SmartLink>
          </div>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((c) => (
              <StaggerItem key={c.slug}>
                <ConceptCard concept={c} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-14 rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
            <h2 className="font-display text-heading-2 font-semibold text-ink">Build something similar</h2>
            <p className="mx-auto mt-3 max-w-lg text-body-lg text-ink-2">
              Every business gets its own look — not a template with the colours swapped. Tell us
              what you do and we&apos;ll show you what it could become.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/#contact" size="lg" arrow>
                Get a free consultation
              </Button>
              <Button href="/#packages" variant="secondary" size="lg">
                See packages
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
