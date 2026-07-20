"use client";

import { cookieConsent } from "@/lib/content";
import { OPEN_CONSENT_PREFERENCES_EVENT } from "@/lib/analytics/consent";

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT))}
      className={className}
    >
      {cookieConsent.preferencesLabel}
    </button>
  );
}

export default CookiePreferencesButton;
