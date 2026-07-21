import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { ScreenshotMock } from "@/components/concepts/ScreenshotMock";
import { ScreenshotPhone } from "@/components/concepts/ScreenshotPhone";
import { Icon } from "@/components/ui/Icon";
import { getConcept } from "@/lib/content";

// Approved homepage hero: headline + dual CTA on the left, a website + mobile
// mockup composition on the right. The visual reuses real, self-hosted captures
// of LocalRise's own design concepts (public/concepts-shots) — no stock photo,
// no external request, honest per ADR-004 (labelled a design concept). This is
// a server component on purpose: the hero is the LCP, so it ships zero client
// JS and no autoplay video (the old video hero is retired here — see git).
const heroConsultation = {
  channel: "whatsapp",
  type: "consultation",
  meta: { section: "home-hero", button: "hero-whatsapp" },
} as const;

export function Hero() {
  const desktop = getConcept("atelier-norlind"); // Interior Design concept
  const phone = getConcept("maison-rile"); // Fashion concept

  return (
    <section id="top" className="relative isolate overflow-hidden bg-bg-subtle">
      {/* Decorative brand glow behind the visual — aria-hidden, no layout cost. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent-soft blur-3xl"
      />

      <div className="container-x section-hero relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: message + CTAs */}
        <div className="max-w-xl">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">
            Website design for small businesses
          </p>

          <h1 className="mt-4 text-display-lg font-display text-ink">
            Build a Website That Gets You{" "}
            <span className="whitespace-nowrap border-b-4 border-accent/30 text-accent">
              More Customers
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-body-lg text-ink-2">
            Modern, mobile-friendly business websites designed to bring more calls,
            WhatsApp messages and enquiries.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/contact/" size="lg" icon="calendar" className="w-full sm:w-auto">
              Get Free Consultation
            </Button>
            <ConversationButton
              start={heroConsultation}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              className="w-full sm:w-auto"
            >
              WhatsApp Us
            </ConversationButton>
          </div>

          {/* Trust row — honest facts only (published starting price + delivery). */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line-2 bg-white/70 px-4 py-3 backdrop-blur">
            <span className="inline-flex items-center gap-2 text-body-sm font-medium text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-tint text-sm font-semibold text-accent">
                ₹
              </span>
              From <strong className="font-semibold">₹7,999</strong>
            </span>
            <span aria-hidden className="h-4 w-px bg-line-2" />
            <span className="inline-flex items-center gap-2 text-body-sm font-medium text-ink">
              <Icon name="clock" size={16} strokeWidth={1.8} className="text-ink-3" />
              Ready in <strong className="font-semibold">3–7 days</strong>
            </span>
          </div>
        </div>

        {/* Right: website + mobile mockup composition */}
        <div className="relative mx-auto w-full max-w-media lg:mx-0">
          {desktop && (
            <ScreenshotMock concept={desktop} priority className="w-full" />
          )}

          {phone && (
            <ScreenshotPhone
              concept={phone}
              className="absolute -bottom-6 left-2 w-24 sm:w-32 lg:-left-6 lg:w-36"
            />
          )}

          {/* Honest outcome badge — categories, never fabricated numbers. */}
          <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 shadow-lg sm:flex">
            <Icon name="chart" size={18} strokeWidth={1.8} className="text-accent" />
            <span className="text-xs font-semibold leading-tight text-ink">
              More Calls
              <br />
              More Leads
              <br />
              <span className="text-accent">More Sales</span>
            </span>
          </div>

          {/* Design-concept disclosure (ADR-004) for the shown mockups. */}
          <span className="absolute bottom-1 right-1 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            Design concept
          </span>
        </div>
      </div>

      {/* Smooth transition into the next section. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

export default Hero;
