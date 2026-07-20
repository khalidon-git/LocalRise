// Global typings for Google's gtag.js, loaded by components/analytics/GoogleTag.
// Intentionally loose: gtag's real signature is a large variadic union we don't
// need to model precisely — this just lets call sites (lib/communication) use
// window.gtag / window.dataLayer without falling back to `any`. Runtime guards
// still check `typeof window.gtag === "function"` since the tag may not be
// loaded (for example, before the visitor grants optional-cookie consent).

export {};

declare global {
  interface Window {
    // Optional: both are genuinely absent before the consent gate initializes
    // or whenever measurement is disabled. Typing them as required would let a future
    // caller skip the `typeof window.gtag === "function"` guard and typecheck
    // straight into a runtime throw.
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
