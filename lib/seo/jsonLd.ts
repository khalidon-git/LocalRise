import { absoluteUrl } from "@/lib/seo/config";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export function createBreadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  const last = items.at(-1);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(last ? { "@id": `${absoluteUrl(last.path)}#breadcrumb` } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function compactJsonLd(value: JsonLdValue): JsonLdValue {
  if (Array.isArray(value)) {
    return value.map(compactJsonLd).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, compactJsonLd(item)] as const)
      .filter(([, item]) => {
        if (item === undefined || item === null || item === "") return false;
        if (Array.isArray(item) && item.length === 0) return false;
        if (typeof item === "object" && !Array.isArray(item) && Object.keys(item).length === 0) return false;
        return true;
      });

    return Object.fromEntries(entries) as { [key: string]: JsonLdValue };
  }

  return value;
}

export function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(compactJsonLd(value))
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
