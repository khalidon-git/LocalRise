export const SITE_URL = "https://localrise.in";
export const SITE_NAME = "LocalRise India";
export const BRAND_NAME = "LocalRise";
export const DEFAULT_TITLE = "LocalRise India | Websites, Google & WhatsApp Growth";
export const DEFAULT_DESCRIPTION =
  "LocalRise helps local businesses across India get more customers through professional websites, Google Business Profile setup, WhatsApp integration, branding and automation.";
export const SOCIAL_IMAGE_PATH = "/opengraph-image.png";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
