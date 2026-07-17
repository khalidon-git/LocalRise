import type { MetadataRoute } from "next";
import { services, concepts } from "@/lib/content";

const siteUrl = "https://localrise.in";

// Trailing slashes are deliberate: next.config sets trailingSlash: true, so
// "/services/websites" 301s to "/services/websites/". Next normalises canonicals
// but NOT sitemap entries, so without the slash every URL here would be a
// redirect hop that wastes crawl budget.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/concepts/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.id}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...concepts.map((c) => ({
      url: `${siteUrl}/concepts/${c.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
