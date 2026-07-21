import type { MetadataRoute } from "next";
import { services, concepts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

// Trailing slashes are deliberate: next.config sets trailingSlash: true, so
// "/services/websites" 301s to "/services/websites/". Next normalises canonicals
// but NOT sitemap entries, so without the slash every URL here would be a
// redirect hop that wastes crawl budget.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/contact/") },
    { url: absoluteUrl("/process/") },
    { url: absoluteUrl("/faq/") },
    { url: absoluteUrl("/why-us/") },
    { url: absoluteUrl("/services/") },
    { url: absoluteUrl("/website-guide/") },
    { url: absoluteUrl("/concepts/") },
    { url: absoluteUrl("/privacy-policy/") },
    { url: absoluteUrl("/terms/") },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.id}/`),
    })),
    ...concepts.map((c) => ({
      url: absoluteUrl(`/concepts/${c.slug}/`),
    })),
  ];
}
