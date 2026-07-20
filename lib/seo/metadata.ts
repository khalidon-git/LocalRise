import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SOCIAL_IMAGE_PATH,
  absoluteUrl,
} from "@/lib/seo/config";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  canonicalPath?: string;
  index?: boolean;
};

export function createPageMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  canonicalPath = path,
  index = true,
}: PageMetadataOptions = {}): Metadata {
  const canonical = absoluteUrl(canonicalPath);
  const pageUrl = absoluteUrl(canonicalPath);
  const image = {
    url: absoluteUrl(SOCIAL_IMAGE_PATH),
    width: 1200,
    height: 630,
    alt: "LocalRise India — websites and digital growth for local businesses",
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: index
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, follow",
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: pageUrl,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
