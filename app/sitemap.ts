import type { MetadataRoute } from "next";
import { services } from "@/lib/data";

const siteUrl = "https://localrise.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
