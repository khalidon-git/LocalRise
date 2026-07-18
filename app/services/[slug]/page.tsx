import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceDetails, packages, faqs, brand } from "@/lib/content";
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

const siteUrl = "https://localrise.in";

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
  const url = `${siteUrl}/services/${service.id}`;
  return {
    title: service.title, // root layout applies the "%s · LocalRise" template
    description: detail.sub,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} · LocalRise`, description: detail.sub, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${service.title} · LocalRise`, description: detail.sub },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = getService(params.slug);
  if (!data) notFound();
  const { service, detail } = data;
  const pkg = packages.find((p) => p.id === detail.relatedPackageId);
  const serviceFaqs = detail.faqPicks.map((i) => faqs[i]).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: detail.sub,
        serviceType: service.title,
        areaServed: "IN",
        provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: brand.name },
        url: `${siteUrl}/services/${service.id}`,
        ...(detail.priceFrom
          ? { offers: { "@type": "Offer", price: detail.priceFrom, priceCurrency: "INR", availability: "https://schema.org/InStock" } }
          : {}),
      },
      {
        // Mirrors the visible breadcrumb below: Home → Services (/#services) →
        // this service. "Services" points at the homepage anchor because there
        // is no /services/ index route.
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
          { "@type": "ListItem", position: 3, name: service.title },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full dotgrid opacity-[0.5] [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]" />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-40">
          <div className="flex flex-col items-start">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm text-ink-3">
              <Link href="/" className="transition-colors hover:text-ink">Home</Link>
              <Icon name="arrow-right" size={14} />
              <Link href="/#services" className="transition-colors hover:text-ink">Services</Link>
              <Icon name="arrow-right" size={14} />
              <span className="text-ink-2">{service.title}</span>
            </nav>

            <span className="chip mt-5">
              <Icon name={service.icon as IconName} size={14} className="text-accent" />
              {service.title}
            </span>

            <h1 className="mt-5 text-display-lg font-display text-ink">{detail.headline}</h1>
            <p className="mt-5 max-w-xl text-body-lg text-ink-2">{detail.sub}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button href="/contact" size="lg" arrow>Get Free Consultation</Button>
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
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detail.benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="card card-hover h-full p-6 lg:p-7">
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
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
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
            <div className="mx-auto mt-14 max-w-md">
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

      {/* FAQ */}
      {serviceFaqs.length > 0 && (
        <section className="section-pad bg-bg-subtle">
          <div className="container-x max-w-3xl">
            <SectionHeading title="Good questions" />
            <div className="mt-12">
              <ServiceFAQ items={serviceFaqs} />
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-bg-inverse p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:radial-gradient(50%_100%_at_50%_0%,rgba(47,91,255,0.25),transparent_70%)]" />
            <h2 className="relative mx-auto max-w-xl font-display text-heading-2 font-semibold text-white">
              Ready to get started with {service.title}?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-body-lg text-ink-inverse-2">
              Book a free consultation — a clear price and timeline, no pressure.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact" size="lg" arrow>Get Free Consultation</Button>
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
