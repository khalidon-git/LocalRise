import type { Metadata } from "next";
import { individualServices } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Services for Small Businesses | LocalRise",
  description:
    "Explore LocalRise website design, Google Business Profile, WhatsApp setup and other digital services for small businesses across India.",
  path: "/services/",
});

// Two instances of the one conversion action; distinct meta.section so Ads
// reporting can tell hero vs closing apart. Same consent-gated flow as the rest
// of the site (startConversation via ConversationButton).
const heroWhatsApp = {
  channel: "whatsapp",
  type: "consultation",
  meta: { section: "services-hero", button: "whatsapp-us" },
} as const;
const finalWhatsApp = {
  channel: "whatsapp",
  type: "consultation",
  meta: { section: "services-final", button: "whatsapp-us" },
} as const;

export default function ServicesPage() {
  return (
    <main>
      {/* Hero — concise, with nav clearance. */}
      <section className="section-hero bg-bg-subtle">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">
              LocalRise Services
            </p>
            <h1 className="mt-4 font-display text-display-lg text-ink">
              Everything Your Business Needs Online
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-2">
              Explore practical digital services designed to help your business get online,
              get found and make it easier for customers to contact you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact/" size="lg" icon="calendar" className="w-full sm:w-auto">
                Get Free Consultation
              </Button>
              <ConversationButton
                start={heroWhatsApp}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
                className="w-full sm:w-auto"
              >
                WhatsApp Us
              </ConversationButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid — every catalogue service, 3 / 2 / 1 per row. */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="sr-only">All LocalRise services</h2>
          <div className="grid grid-cols-1 gap-[var(--card-gap)] sm:grid-cols-2 lg:grid-cols-3">
            {individualServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — help visitors who don't know where to start. */}
      <section className="section-pad bg-bg-subtle">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-2 font-semibold text-ink">
              Not Sure Which Service You Need?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-body-lg text-ink-2">
              Tell us about your business and we&rsquo;ll help you choose the right starting point.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact/" size="lg" icon="calendar" className="w-full sm:w-auto">
                Get Free Consultation
              </Button>
              <ConversationButton
                start={finalWhatsApp}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
                className="w-full sm:w-auto"
              >
                WhatsApp Us
              </ConversationButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
