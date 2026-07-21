import type { Metadata } from "next";
import { websiteGuide } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { SmartLink } from "@/components/ui/SmartLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { createBreadcrumbJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: websiteGuide.seoTitle,
  description: websiteGuide.metaDescription,
  path: "/website-guide/",
});

// Educational guide — WhatsApp consultation, same consent-gated flow as the site.
const consultWhatsApp = {
  channel: "whatsapp",
  type: "consultation",
  meta: { section: "website-guide-cta", button: "whatsapp-us" },
} as const;

export default function WebsiteGuidePage() {
  const g = websiteGuide;
  const jsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website Guide", path: "/website-guide/" },
  ]);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      {/* 1. Emotional hero */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full dotgrid opacity-[0.5] [mask-image:radial-gradient(70%_50%_at_50%_0%,#000,transparent)]" />
        <div className="container-x relative pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-body-sm text-ink-3">
              <SmartLink href="/" className="transition-colors hover:text-ink">Home</SmartLink>
              <Icon name="arrow-right" size={14} />
              <span className="text-ink-2">Website Guide</span>
            </nav>
            <p className="mt-6 text-label font-semibold uppercase tracking-[0.16em] text-accent">
              {g.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-heading-1 text-ink">{g.h1}</h1>
            <p className="mt-4 font-display text-heading-3 font-semibold text-ink-2">
              {g.hero.headline}
            </p>
            <div className="mx-auto mt-6 flex max-w-reading flex-col gap-4">
              {g.hero.paragraphs.map((p, i) => (
                <p key={i} className="text-body-lg text-ink-2">{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* 2. Customer story */}
      <section className="section-pad">
        <div className="container-x max-w-3xl">
          <SectionHeading title={g.story.title} align="left" />
          <div className="mt-6 flex flex-col gap-4">
            {g.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.04}>
                <p className="max-w-reading text-body-lg text-ink-2">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Modern customer journey */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <SectionHeading title={g.journey.title} description={g.journey.description} />
          <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {g.journey.stages.map((s, i) => (
              <Reveal key={s.label} as="li" delay={i * 0.04}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-xs">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                    <Icon name={s.icon} size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-label font-semibold uppercase tracking-[0.12em] text-ink-3">
                      Step {i + 1}
                    </p>
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">{s.label}</h3>
                    <p className="mt-1 text-body-sm text-ink-2">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. What a professional website does */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading title={g.does.title} />
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {g.does.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.04}>
                <div className="card card-hover h-full p-5 sm:p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white text-accent shadow-xs">
                    <Icon name={it.icon} size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{it.title}</h3>
                  <p className="mt-2 text-body-sm text-ink-2">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industry examples */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <SectionHeading title={g.examples.title} description={g.examples.description} />
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {g.examples.items.map((it, i) => (
              <Reveal key={it.business} delay={i * 0.04}>
                <div className="card h-full p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                      <Icon name={it.icon} size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">{it.business}</h3>
                  </div>
                  <p className="mt-4 text-body-sm text-ink-2">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Website vs third-party platforms */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading title={g.platforms.title} description={g.platforms.intro} />
          <Reveal className="mx-auto mt-8 max-w-3xl">
            <blockquote className="rounded-2xl border border-line-2 bg-accent-tint/60 p-6 text-center">
              <p className="font-display text-heading-3 font-semibold text-ink">
                &ldquo;{g.platforms.keyLine}&rdquo;
              </p>
            </blockquote>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {g.platforms.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card h-full p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-bg-muted text-ink-2">
                      <Icon name={p.icon} size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-body-sm text-ink-2">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-8 max-w-3xl">
            <p className="text-center text-body-lg text-ink-2">{g.platforms.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* 7. Common myths */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <SectionHeading title={g.myths.title} />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-12 sm:grid-cols-2">
            {g.myths.items.map((m, i) => (
              <Reveal key={m.myth} delay={i * 0.04}>
                <div className="card h-full p-5 sm:p-6">
                  <p className="flex items-start gap-2.5 text-body font-medium text-ink-3">
                    <Icon name="close" size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-4" />
                    <span className="line-through decoration-ink-4/40">{m.myth}</span>
                  </p>
                  <p className="mt-4 flex items-start gap-2.5 text-body text-ink">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                      <Icon name="check" size={12} strokeWidth={2.6} />
                    </span>
                    <span>{m.reality}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="section-pad">
        <div className="container-x max-w-3xl">
          <SectionHeading title="Common questions" />
          <div className="mt-8 sm:mt-10">
            <ServiceFAQ items={g.faqs} />
          </div>
        </div>
      </section>

      {/* Soft consultation CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl bg-bg-inverse p-6 text-center sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:radial-gradient(50%_100%_at_50%_0%,rgba(47,91,255,0.25),transparent_70%)]" />
            <h2 className="relative mx-auto max-w-xl font-display text-heading-2 font-semibold text-white">
              {g.cta.title}
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-body-lg text-ink-inverse-2">
              {g.cta.text}
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact/" size="lg" arrow>Get Free Consultation</Button>
              </Magnetic>
              <ConversationButton start={consultWhatsApp} variant="whatsapp" size="lg" icon="whatsapp">
                WhatsApp us
              </ConversationButton>
            </div>
            <p className="relative mt-6 text-body-sm text-ink-inverse-2">
              Business Website ki poori jaankari{" "}
              <SmartLink href="/services/websites/" className="font-medium text-white underline underline-offset-4">
                yahan dekhein
              </SmartLink>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
