/**
 * Links that point at an app route (leading "/") must go through next/link so
 * navigation is client-side. That keeps the root layout mounted — including the
 * audio engine in AudioProvider — so playback is never torn down and restarted.
 *
 * A plain <a href="/..."> triggers a full document load, which destroys the JS
 * runtime and every provider with it. No amount of context or singleton design
 * survives that, which is why this distinction matters.
 *
 * Bare "#hash" links scroll within the current page (no navigation), and
 * protocol links (tel:, mailto:, https://, wa.me) must stay plain anchors.
 */
export function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}
