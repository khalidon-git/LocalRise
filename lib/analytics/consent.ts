export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "localrise_consent_v1";
export const OPEN_CONSENT_PREFERENCES_EVENT = "localrise:open-cookie-preferences";

let memoryConsentChoice: ConsentChoice | null = null;

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : memoryConsentChoice;
  } catch {
    return memoryConsentChoice;
  }
}

export function saveConsentChoice(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;

  memoryConsentChoice = choice;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // The explicit choice still applies safely for this document when browser
    // privacy settings prevent it from persisting across reloads.
  }
}

export function isConsentGranted(): boolean {
  return readConsentChoice() === "granted";
}
