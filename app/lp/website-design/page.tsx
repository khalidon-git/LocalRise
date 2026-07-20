import type { Metadata } from "next";
import { services, serviceDetails, packages, faqs, brand } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceHeroVisual } from "@/components/sections/ServiceHeroVisual";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { formatINR } from "@/lib/utils";
import type { Package } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

// ---------------------------------------------------------------------------
// /lp/website-design/ — dedicated Google Ads landing page for the "Websites"
// ad group (see marketing/ads-strategy.md §4–5, keyword-strategy.md §2).
//
// Deliberately DIFFERENT from /services/websites/: no nav, no footer, no cart,
// no internal links out, one repeated conversion action, message-matched to the
// ad. Site chrome is suppressed by SiteChrome's /lp/ rule; this page is NOT in
// app/sitemap.ts and is noindexed below — it would be thin/duplicate content
// against the SEO service page if indexed. All copy/pricing is sourced from
// lib/content (ADR-004 honest-content: no invented claims or social proof).
// ---------------------------------------------------------------------------

export const metadata: Metadata = createPageMetadata({
  // Absolute title (bypasses the "%s · LocalRise" template) so the tab matches
  // the ad's message. Noindexed, so this never competes with the SEO page.
  title: "Business Website Design for Small Business | LocalRise",
  description:
    "A fast, professional website for your small business — from ₹7,999. Mobile-first design, WhatsApp & call buttons, and transparent pricing with no hidden charges.",
  // Ads-only page: index:false avoids duplicate/thin-content risk against
  // /services/websites/; follow:true still lets any (rare) outbound crawl pass
  // link equity. Same pattern as app/concepts/[slug]/live/page.tsx.
  path: "/lp/website-design/",
  canonicalPath: "/services/websites/",
  index: false,
});

// A read-only price tier for the transparent-pricing anchor. No CTA and no link
// of its own — the page keeps exactly one conversion action (the WhatsApp CTA),
// so this only shows the real published prices from lib/content/packages.ts.
function PriceTier({ pkg, highlight }: { pkg: Package; highlight?: boolean }) {
  return (
    <div
      className={
        highlight
          ? "relative flex h-full flex-col rounded-2xl border border-accent/30 bg-white p-5 shadow-xl ring-1 ring-accent/20 sm:p-6"
          : "card flex h-full flex-col p-5 sm:p-6"
      }
    >
      {highlight && (
        <>
          <div className="absolute inset-x-0 -top-px h-1 rounded-t-2xl accent-gradient" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-label font-semibold uppercase tracking-wider text-white shadow-md">
            Most Popular
          </span>
        </>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-semibold text-ink">{pkg.name}</h3>
        <span className="chip !py-1 text-label">
          <Icon name="clock" size={13} className="text-accent" />
          {pkg.delivery.replace("Ready in ", "")}
        </span>
      </div>
      <p className="mt-1.5 text-body-sm text-ink-2">{pkg.tagline}</p>
      <div className="mt-5 flex items-end gap-1.5">
        <span
          className={
            "font-display text-3xl font-semibold tracking-tight sm:text-4xl " +
            (highlight ? "text-accent" : "text-ink")
          }
        >
          {formatINR(pkg.price)}
        </span>
        <span className="mb-1 text-body-sm text-ink-3">{pkg.priceNote}</span>
      </div>
      <div className="my-6 h-px bg-line" />
      <ul className="flex flex-1 flex-col gap-2.5">
        {pkg.features.map((f) => (
          <li key={f.text} className="flex items-start gap-3 text-body-sm text-ink">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            {f.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WebsiteDesignLandingPage() {
  // Hardcoded to the "websites" service — this is a single-purpose page, not a
  // dynamic route. serviceDetails is keyed, so `detail` is non-optional; the
  // service/package lookups are asserted because the content coupling
  // (services ⇄ serviceDetails ⇄ packages) guarantees they exist — if that
  // breaks, the build should fail loudly here rather than ship a broken LP.
  const detail = serviceDetails.websites;
  const service = services.find((s) => s.id === "websites")!;
  const starter = packages.find((p) => p.id === "starter")!;
  const growth = packages.find((p) => p.id === "growth")!;

  const serviceFaqs = detail.faqPicks.map((i) => faqs[i]).filter(Boolean);

  // The one conversion action, repeated at hero and closing. Distinct
  // meta.section per instance so Ads reporting can tell which converts.
  const heroCta = {
    channel: "whatsapp",
    type: "service",
    serviceName: service.title, // "Business Websites"
    price: detail.priceFrom, // 7999
    meta: { section: "lp-website-design-hero", button: "website-design-lp" },
  } as const;
  const closingCta = {
    ...heroCta,
    meta: { section: "lp-website-design-closing", button: "website-design-lp" },
  } as const;

  // Trust signals available honestly (ADR-004): transparent pricing, a real
  // delivery commitment, and the service area — no testimonials or client
  // counts, none of which exist yet.
  const trustPoints: { icon: IconName; text: string }[] = [
    { icon: "clock", text: starter.delivery }, // "Ready in 3 days"
    { icon: "shield", text: "Transparent pricing, no hidden charges" },
    { icon: "pin", text: brand.location }, // "Serving local businesses across India"
  ];

  return (
    <main>
      {/* Hero — bare top bar (brand mark only, no nav links to leak the funnel) */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full dotgrid opacity-[0.5] [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]" />

        <div className="container-x relative flex items-center justify-between pt-7">
          {/* Non-linked wordmark: identity without a route out of the page. */}
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Local<span className="text-accent">Rise</span>
          </span>
          <span className="hidden text-body-sm text-ink-3 sm:block">
            Website design for local businesses
          </span>
        </div>

        <div className="container-x relative grid items-center gap-10 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-16">
          <div className="flex flex-col items-start">
            <span className="chip">
              <Icon name={service.icon as IconName} size={14} className="text-accent" />
              {service.title} · from {formatINR(detail.priceFrom!)}
            </span>

            <h1 className="mt-5 text-display-lg font-display text-ink">
              Professional website design for your small business
            </h1>
            <p className="mt-5 max-w-xl text-body-lg text-ink-2">{detail.sub}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
              {trustPoints.map((t) => (
                <li key={t.text} className="inline-flex items-center gap-2 text-body-sm text-ink-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon name={t.icon} size={13} strokeWidth={2} />
                  </span>
                  {t.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 w-full sm:w-auto">
              <Magnetic className="inline-flex">
                <ConversationButton start={heroCta} variant="whatsapp" size="lg" icon="whatsapp" arrow>
                  Get your website on WhatsApp
                </ConversationButton>
              </Magnetic>
            </div>
            <p className="mt-4 text-body-sm text-ink-3">
              Free consultation — a clear price and timeline before you commit.
            </p>
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
          <SectionHeading title="Why a LocalRise website works harder" description={detail.who} />
          <Stagger className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Transparent pricing — the honest trust signal (ADR-004). Read-only:
          no CTA/link on the tiers, so the WhatsApp action stays the only one. */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            title="Simple, published pricing"
            description="No quotes to chase and no hidden charges — start with a website, or take the popular all-in package."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:mt-12 sm:grid-cols-2">
            <Reveal>
              <PriceTier pkg={starter} />
            </Reveal>
            <Reveal delay={0.08}>
              <PriceTier pkg={growth} highlight />
            </Reveal>
          </div>
        </div>
      </section>

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

      {/* Closing CTA — same single objective, repeated */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl bg-bg-inverse p-6 text-center sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:radial-gradient(50%_100%_at_50%_0%,rgba(47,91,255,0.25),transparent_70%)]" />
            <h2 className="relative mx-auto max-w-xl font-display text-heading-2 font-semibold text-white">
              Ready for a website that brings you customers?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-body-lg text-ink-inverse-2">
              Message us on WhatsApp for a free consultation — a clear price and timeline, no pressure.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Magnetic className="inline-flex">
                <ConversationButton start={closingCta} variant="whatsapp" size="lg" icon="whatsapp" arrow>
                  Get your website on WhatsApp
                </ConversationButton>
              </Magnetic>
            </div>
            <p className="relative mt-4 text-body-sm text-ink-inverse-2">
              From {formatINR(detail.priceFrom!)} · transparent pricing, no hidden charges
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
