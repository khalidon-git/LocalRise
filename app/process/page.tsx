import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";

const siteUrl = "https://localrise.in";
const title = "Our Process";
const description =
  "See how LocalRise takes your project from the first conversation through planning, design, launch and ongoing support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/process/` },
  openGraph: { title: `${title} · LocalRise`, description, url: `${siteUrl}/process/`, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} · LocalRise`, description },
};

export default function ProcessPage() {
  return (
    <main>
      <section className="section-pad !pb-0 !pt-28 sm:!pt-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h1 className="font-display text-heading-1 font-semibold text-ink">A clear process from idea to launch</h1>
          <p className="mt-4 text-body-lg text-ink-2">You always know what we are doing, what comes next and what we need from you.</p>
        </div>
      </section>
      <Process showHeading={false} />
    </main>
  );
}
