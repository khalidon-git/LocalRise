import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceDetails, packages, faqs, serviceScopeNote } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { SmartLink } from "@/components/ui/SmartLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceHeroVisual } from "@/components/sections/ServiceHeroVisual";
import { PackageCard } from "@/components/sections/PackageCard";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { formatINR } from "@/lib/utils";
import { SITE_URL, absoluteUrl, createPageMetadata, serializeJsonLd } from "@/lib/seo";

// Required for `output: export` — pre-render one page per service id.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

function getService(slug: string) {
  const service = services.find((s) => s.id === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return null;
  return { service, detail };
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = getService(params.slug);
  if (!data) return {};
  const { service, detail } = data;
  return createPageMetadata({
    title: detail.seoTitle,
    description: detail.metaDescription,
    path: `/services/${service.id}/`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = getService(params.slug);
  if (!data) notFound();
  const { service, detail } = data;
  const pkg = packages.find((p) => p.id === detail.relatedPackageId);
  const serviceFaqs = detail.faqPicks.map((i) => faqs[i]).filter(Boolean);
  const relatedServices = detail.relatedServiceIds.flatMap((id) => {
    const related = services.find((item) => item.id === id);
    return related ? [related] : [];
  });
  const url = absoluteUrl(`/services/${service.id}/`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: detail.metaDescription,
        serviceType: service.title,
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@id": `${SITE_URL}/#organization` },
        url,
      },
      {
        // Mirrors the visible breadcrumb below: Home → Services (/services/) →
        // this service. "Services" points at the homepage anchor because there
        // is no /services/ index route.
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services/") },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full dotgrid opacity-[0.5] [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]" />
        <div className="container-x relative grid items-center gap-10 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-36">
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm text-ink-3">
              <SmartLink href="/" className="transition-colors hover:text-ink">Home</SmartLink>
              <Icon name="arrow-right" size={14} />
              <SmartLink href="/services/" className="transition-colors hover:text-ink">Services</SmartLink>
              <Icon name="arrow-right" size={14} />
              <span className="text-ink-2">{service.title}</span>
            </nav>

            <span className="chip mt-5">
              <Icon name={service.icon as IconName} size={14} className="text-accent" />
              {service.title}
            </span>

            <h1 className="mt-5 text-heading-1 font-display text-ink">{detail.h1}</h1>
            <p className="mt-4 font-display text-heading-3 font-semibold text-ink-2">{detail.headline}.</p>
            <p className="mt-5 max-w-xl text-body-lg text-ink-2">{detail.sub}</p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Magnetic>
                <Button href="/contact/" size="lg" arrow>Get Free Consultation</Button>
              </Magnetic>
              <ConversationButton
                start={{ channel: "whatsapp", type: "service", serviceName: service.title, price: detail.priceFrom, meta: { section: "service-detail-hero", button: service.id } }}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
              >
                WhatsApp us
              </ConversationButton>
            </div>

            {detail.priceFrom && (
              <p className="mt-6 text-body-sm text-ink-3">
                From <span className="font-semibold text-ink">{formatINR(detail.priceFrom)}</span> · transparent pricing, no hidden charges
              </p>
            )}
          </div>

          <div className="relative">
            <ServiceHeroVisual id={service.id} title={service.title} accent={detail.accent} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Benefits */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            title={`What ${service.title} does for you`}
            description={detail.who}
          />
          <Stagger className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {detail.benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="card card-hover h-full p-5 sm:p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white text-accent shadow-xs">
                    <Icon name={b.icon} size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{b.title}</h3>
                  <p className="mt-2 text-body-sm text-ink-2">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Included + Outcomes */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="font-display text-heading-2 font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {detail.included.map((it) => (
                <li key={it} className="flex items-start gap-3 text-body text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon name="check" size={12} strokeWidth={2.6} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-body-sm text-ink-3">{serviceScopeNote}</p>
            {detail.note && (
              <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-line-2 bg-white p-4 text-body-sm text-ink-2">
                <Icon name="shield" size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-accent" />
                <span>{detail.note}</span>
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-heading-2 font-semibold text-ink">What you&apos;ll get</h2>
            <div className="mt-6 flex flex-col gap-3">
              {detail.outcomes.map((o) => (
                <div key={o} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-xs">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                    <Icon name="spark" size={18} />
                  </span>
                  <span className="font-medium text-ink">{o}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related package */}
      {pkg && (
        <section className="section-pad">
          <div className="container-x">
            <SectionHeading
              title="Often part of a package"
              description="Bundle it and save — here's the package this service fits into."
            />
            <div className="mx-auto mt-10 max-w-md sm:mt-12">
              <PackageCard pkg={pkg} />
            </div>
            <Reveal delay={0.1} className="mt-8 text-center">
              <SmartLink href="/#packages" className="inline-flex items-center gap-2 text-body-sm font-medium text-accent">
                See all packages
                <Icon name="arrow-right" size={16} strokeWidth={2} />
              </SmartLink>
            </Reveal>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="section-pad">
          <div className="container-x max-w-4xl">
            <SectionHeading
              title="Related services"
              description="Combine the right services around one clear customer journey."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {relatedServices.map((related) => (
                <SmartLink
                  key={related.id}
                  href={`/services/${related.id}/`}
                  className="card card-hover flex items-center justify-between gap-4 p-5"
                >
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">{related.title}</span>
                    <span className="mt-1 block text-body-sm text-ink-2">{related.blurb}</span>
                  </span>
                  <Icon name="arrow-right" size={18} className="shrink-0 text-accent" />
                </SmartLink>
              ))}
            </div>
            <p className="mt-6 text-center text-body-sm text-ink-2">
              See <SmartLink href="/process/" className="font-medium text-accent">how projects work</SmartLink>
              {" or "}
              <SmartLink href="/why-us/" className="font-medium text-accent">why local businesses choose LocalRise</SmartLink>.
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      {serviceFaqs.length > 0 && (
        <section className="section-pad bg-bg-subtle">
          <div className="container-x max-w-3xl">
            <SectionHeading title="Good questions" />
            <div className="mt-8 sm:mt-10">
              <ServiceFAQ items={serviceFaqs} />
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl bg-bg-inverse p-6 text-center sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:radial-gradient(50%_100%_at_50%_0%,rgba(47,91,255,0.25),transparent_70%)]" />
            <h2 className="relative mx-auto max-w-xl font-display text-heading-2 font-semibold text-white">
              Ready to get started with {service.title}?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-body-lg text-ink-inverse-2">
              Book a free consultation — a clear price and timeline, no pressure.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact/" size="lg" arrow>Get Free Consultation</Button>
              </Magnetic>
              <ConversationButton
                start={{ channel: "whatsapp", type: "service", serviceName: service.title, price: detail.priceFrom, meta: { section: "service-detail-closing-cta", button: service.id } }}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
              >
                WhatsApp us
              </ConversationButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
