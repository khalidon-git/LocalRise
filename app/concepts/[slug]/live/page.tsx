import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conceptSites, getConceptSite } from "@/lib/content";
import { LiveSite } from "@/components/live/LiveSite";

// Required for every leaf page under the app/concepts/[slug]/ dynamic segment
// in a static export — Next doesn't infer this from the parent detail page's
// generateStaticParams. See docs/seo.md.
export function generateStaticParams() {
  return conceptSites.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const site = getConceptSite(params.slug);
  if (!site) return {};

  return {
    title: { absolute: `${site.brandName} — a LocalRise Design Concept` },
    description: `${site.hero.sub} A fictional ${site.industryLabel.toLowerCase()} brand, designed by LocalRise to show what your site could become.`,
    // Deliberately not indexed: this is a live-feeling PREVIEW of a fictional
    // business, not a page that should compete in search results (and
    // definitely not be mistaken for a real one). The detail page at
    // /concepts/<slug>/ carries the indexable CreativeWork entry instead.
    robots: { index: false, follow: true },
  };
}

export default function ConceptLivePage({ params }: { params: { slug: string } }) {
  const site = getConceptSite(params.slug);
  if (!site) notFound();

  return <LiveSite site={site} />;
}
