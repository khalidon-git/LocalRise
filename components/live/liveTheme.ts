import type { ConceptSite } from "@/lib/content";

// Deliberately NOT a "use client" module. LiveSite (a server component) and
// LiveNav (a client component) both call this directly as a plain function —
// if it lived inside a "use client" file, importing it into the server
// component would turn it into an unusable client reference at render time
// (fails with "themeVars is not a function" during static generation).
export function themeVars(site: ConceptSite): React.CSSProperties {
  const t = site.theme;
  return {
    "--lv-bg": t.bg,
    "--lv-bg-alt": t.bgAlt,
    "--lv-surface": t.surface,
    "--lv-ink": t.ink,
    "--lv-ink-muted": t.inkMuted,
    "--lv-line": t.line,
    "--lv-brand": t.brand,
    "--lv-brand-ink": t.brandInk,
    "--lv-brand-soft": t.brandSoft,
  } as React.CSSProperties;
}

const responsiveImageWidths = [480, 720, 960, 1280, 1600] as const;

/**
 * Unsplash is an approved concept-site exception; give the browser real width
 * choices so narrow cards and phones do not download desktop-sized images.
 */
export function responsiveImageProps(src: string, sizes: string) {
  const withWidth = (width: number) => src.replace(/([?&])w=\d+/, `$1w=${width}`);
  return {
    srcSet: responsiveImageWidths.map((width) => `${withWidth(width)} ${width}w`).join(", "),
    sizes,
  };
}
