import {
  GOOGLE_ADS_WHATSAPP_CONVERSION_DESTINATION,
  adsEnabled,
} from "@/lib/analytics/config";
import { isConsentGranted } from "@/lib/analytics/consent";

let conversionQueuedThisTask = false;

export function trackWhatsAppConversion(): void {
  if (typeof window === "undefined" || !adsEnabled || !isConsentGranted()) return;

  const gtag = window.gtag;
  if (typeof gtag !== "function" || conversionQueuedThisTask) return;

  // A physical click is dispatched in one browser task. Resetting in a
  // microtask lets later clicks count independently while collapsing any
  // accidental nested/bubbling calls from the same click to one conversion.
  conversionQueuedThisTask = true;
  try {
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_DESTINATION,
    });
  } catch {
    // Measurement must never prevent the genuine WhatsApp action.
  } finally {
    queueMicrotask(() => {
      conversionQueuedThisTask = false;
    });
  }
}
