import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { notFoundPage } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | LocalRise India" },
  description: notFoundPage.description,
  alternates: { canonical: absoluteUrl("/404.html") },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LocalRise India",
    url: absoluteUrl("/404.html"),
    title: "Page Not Found | LocalRise India",
    description: notFoundPage.description,
    images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | LocalRise India",
    description: notFoundPage.description,
    images: [absoluteUrl("/opengraph-image.png")],
  },
};

export default function NotFound() {
  return (
    <main>
      <section className="section-pad flex min-h-[70svh] items-center pt-28 sm:pt-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <p className="text-label font-semibold uppercase tracking-wider text-accent">{notFoundPage.eyebrow}</p>
          <h1 className="mt-3 font-display text-heading-1 font-semibold text-ink">{notFoundPage.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-ink-2">{notFoundPage.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg" arrow>Return home</Button>
            <Button href="/services/" size="lg" variant="secondary">Explore services</Button>
          </div>
          <p className="mt-7 text-body-sm text-ink-2">
            Looking for a specific service? Try{" "}
            <SmartLink href="/services/websites/" className="font-medium text-accent">website design</SmartLink>,{" "}
            <SmartLink href="/services/google/" className="font-medium text-accent">Google Business Profile setup</SmartLink>, or{" "}
            <SmartLink href="/services/whatsapp/" className="font-medium text-accent">WhatsApp Business setup</SmartLink>.
          </p>
        </div>
      </section>
    </main>
  );
}
