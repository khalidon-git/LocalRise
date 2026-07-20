"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { cookieConsent } from "@/lib/content";
import {
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_PREFERENCES_EVENT,
  type ConsentChoice,
  readConsentChoice,
  saveConsentChoice,
} from "@/lib/analytics/consent";
import {
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_CONVERSION_ID,
  ga4Enabled,
  googleAdsEnabled,
  analyticsEnabled,
} from "@/lib/analytics/config";

const deniedConsent = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

const grantedConsent = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const;

function ensureLocalGtag(): NonNullable<Window["gtag"]> {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
  return window.gtag;
}

function clearFirstPartyGoogleAdsCookies(): void {
  const removablePrefixes = ["_gcl_", "_gac_"];
  const removableNames = new Set(["FPGCLAW", "FPGCLGB", "FPGCLDC"]);
  const host = window.location.hostname;
  const parentDomain = host.split(".").length > 2 ? `.${host.split(".").slice(-2).join(".")}` : `.${host}`;

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || (!removablePrefixes.some((prefix) => name.startsWith(prefix)) && !removableNames.has(name))) return;

    const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/; SameSite=Lax";
    document.cookie = `${name}=; ${expiry}`;
    document.cookie = `${name}=; ${expiry}; domain=${host}`;
    document.cookie = `${name}=; ${expiry}; domain=${parentDomain}`;
  });
}

export function GoogleTag() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const configuredRef = useRef(false);
  const googleRuntimeLoadedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const preferenceOpenerRef = useRef<HTMLElement | null>(null);
  const shouldFocusPreferencesRef = useRef(false);

  useEffect(() => {
    const gtag = ensureLocalGtag();
    gtag("consent", "default", deniedConsent);

    const savedChoice = readConsentChoice();
    if (savedChoice === "granted") {
      gtag("consent", "update", grantedConsent);
      setChoice("granted");
    } else if (savedChoice === "denied") {
      gtag("consent", "update", deniedConsent);
      setChoice("denied");
    } else {
      setPreferencesOpen(true);
    }

    setReady(true);

    const openPreferences = () => {
      preferenceOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      shouldFocusPreferencesRef.current = true;
      setPreferencesOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (preferencesOpen && shouldFocusPreferencesRef.current) headingRef.current?.focus();
  }, [preferencesOpen]);

  const configureGoogle = useCallback(() => {
    if (configuredRef.current || readConsentChoice() !== "granted") return;

    const gtag = ensureLocalGtag();
    gtag("js", new Date());
    if (ga4Enabled) gtag("config", GA4_MEASUREMENT_ID);
    if (googleAdsEnabled) gtag("config", GOOGLE_ADS_CONVERSION_ID);
    configuredRef.current = true;
  }, []);

  const handleGoogleReady = useCallback(() => {
    googleRuntimeLoadedRef.current = true;
    configureGoogle();
  }, [configureGoogle]);

  const applyChoice = (nextChoice: ConsentChoice) => {
    const gtag = ensureLocalGtag();
    saveConsentChoice(nextChoice);
    setChoice(nextChoice);
    setPreferencesOpen(false);

    if (nextChoice === "granted") {
      gtag("consent", "update", grantedConsent);
      window.requestAnimationFrame(() => {
        const focusTarget = preferenceOpenerRef.current ?? document.querySelector<HTMLElement>("header a[href], main a[href], main button");
        focusTarget?.focus();
        shouldFocusPreferencesRef.current = false;
      });
      return;
    }

    gtag("consent", "update", deniedConsent);
    clearFirstPartyGoogleAdsCookies();

    if (googleRuntimeLoadedRef.current) {
      window.location.reload();
      return;
    }

    window.requestAnimationFrame(() => {
      const focusTarget = preferenceOpenerRef.current ?? document.querySelector<HTMLElement>("header a[href], main a[href], main button");
      focusTarget?.focus();
      shouldFocusPreferencesRef.current = false;
    });
  };

  const shouldLoadGoogle = ready && choice === "granted" && analyticsEnabled;

  return (
    <>
      {shouldLoadGoogle && (
        <Script
          id="google-ads-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsEnabled ? GOOGLE_ADS_CONVERSION_ID : GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onLoad={handleGoogleReady}
          onReady={handleGoogleReady}
        />
      )}

      {ready && preferencesOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-description"
          data-consent-storage-key={CONSENT_STORAGE_KEY}
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-line-2 bg-white p-4 shadow-float sm:inset-x-6 sm:bottom-6 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-xl">
              <h2
                ref={headingRef}
                id="cookie-consent-heading"
                tabIndex={-1}
                className="font-display text-heading-3 font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {cookieConsent.heading}
              </h2>
              <p id="cookie-consent-description" className="mt-2 text-body-sm leading-relaxed text-ink-2">
                {cookieConsent.body}
              </p>
              <SmartLink
                href="/privacy-policy/"
                className="mt-2 inline-flex min-h-11 items-center text-body-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {cookieConsent.privacyLabel}
              </SmartLink>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:min-w-64">
              <button
                type="button"
                onClick={() => applyChoice("denied")}
                className="min-h-11 rounded-full border border-accent bg-white px-5 py-2.5 text-body-sm font-semibold text-accent transition-colors hover:bg-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {cookieConsent.rejectLabel}
              </button>
              <button
                type="button"
                onClick={() => applyChoice("granted")}
                className="min-h-11 rounded-full border border-accent bg-white px-5 py-2.5 text-body-sm font-semibold text-accent transition-colors hover:bg-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {cookieConsent.acceptLabel}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default GoogleTag;
