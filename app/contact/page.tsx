import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ContactForm } from "@/components/contact/ContactForm";

// Formerly the homepage's Contact section (id="contact"), relocated here so
// every "Get Free Consultation" CTA site-wide has a real page to land on
// instead of a same-page anchor. See docs/navigation.md for the links that
// point here and knowledge/decisions/ for the communication-layer migration
// this was part of.
const siteUrl = "https://localrise.in";
const title = "Contact";
const description =
  "Get a free consultation for your business — no obligation. WhatsApp, call, email, or send your details and we'll get back with a clear plan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/contact/` },
  openGraph: { title: `${title} · LocalRise`, description, url: `${siteUrl}/contact/`, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
};

export default function ContactPage() {
  return (
    <main>
      <section className="section-pad pt-32 sm:pt-36">
        <div className="container-x">
          <ContactHero />
          <div className="mt-14 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-bg-subtle shadow-lg">
            <div className="grid lg:grid-cols-2">
              <ContactMethods />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
