import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { createBreadcrumbJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

const title = "Our Website and Digital Service Process | LocalRise India";
const description =
  "See how LocalRise takes your project from the first conversation through planning, design, launch and ongoing support.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/process/" });

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Process", path: "/process/" },
]);

export default function ProcessPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
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
