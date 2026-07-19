// ---------------------------------------------------------------------------
// First-visit onboarding preference.
//
// Persisted in localStorage (not sessionStorage) so the choice survives across
// visits, allowing the non-blocking audio control and provider to share intent.
//
// Shared by two consumers, which is why it lives here rather than in either:
// * AudioToggle   — records an explicit opt-in before starting narration
// * AudioProvider — decides whether it may auto-start narration on a return
//                   visit. Without this gate, audio would start on ANY first
//                   click, including the "Browse on My Own" button itself.
// ---------------------------------------------------------------------------

export type OnboardingChoice = "guided" | "silent";

const STORAGE_KEY = "localrise:onboarding";

/** The stored choice, or null when the visitor hasn't chosen yet (first visit). */
export function readOnboardingChoice(): OnboardingChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "guided" || value === "silent" ? value : null;
  } catch {
    // Private mode / storage disabled: treat as "not chosen" rather than
    // silently autoplaying.
    return null;
  }
}

export function saveOnboardingChoice(choice: OnboardingChoice) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* non-fatal — the session still respects the choice in memory */
  }
}

/** Clearing this returns the visitor to the unchosen audio state. */
export function clearOnboardingChoice() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
