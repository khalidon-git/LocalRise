"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { useAudio } from "@/providers/AudioProvider";
import { useScrollLock } from "@/hooks/useScrollLock";
import { readOnboardingChoice, saveOnboardingChoice, type OnboardingChoice } from "@/lib/onboarding";

const ease = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// First-visit welcome. Shown once per browser; the choice is persisted in
// localStorage and never asked again until that key is cleared.
//
// This modal is also what makes the narration reliable: browsers refuse to play
// audio until the visitor interacts, so "Start Guided Experience" doubles as the
// user gesture that autoplay policy requires. Consent and capability in one tap.
// ---------------------------------------------------------------------------
export function WelcomeModal() {
  // Starts closed and only opens from an effect. localStorage doesn't exist
  // during the static prerender, so deciding at render time would either cause a
  // hydration mismatch or bake the modal into the HTML for returning visitors.
  const [open, setOpen] = useState(false);
  const { startNarration } = useAudio();

  useEffect(() => {
    if (readOnboardingChoice() === null) setOpen(true);
  }, []);

  useScrollLock(open);

  const choose = useCallback(
    (choice: OnboardingChoice) => {
      saveOnboardingChoice(choice);
      setOpen(false);
      if (choice === "guided") startNarration();
    },
    [startNarration],
  );

  // Escape resolves to "browse silently" rather than trapping the visitor. It's
  // a real choice, so it's persisted like any other — dismissing shouldn't mean
  // being asked again on the next page load.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") choose("silent");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, choose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] grid place-items-center p-5"
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            aria-describedby="welcome-desc"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.55, ease }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-float sm:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-1 accent-gradient" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">
              <Logo />

              <h2
                id="welcome-title"
                className="mt-6 font-display text-heading-3 font-semibold tracking-tight text-ink"
              >
                Welcome to LocalRise
              </h2>

              <p id="welcome-desc" className="mt-3 text-body text-ink-2">
                This website includes a short guided experience that explains how LocalRise can help
                grow your business as you browse.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  type="button"
                  autoFocus
                  onClick={() => choose("guided")}
                  size="lg"
                  icon="spark"
                  arrow
                  className="w-full"
                >
                  Start Guided Experience
                </Button>
                <Button
                  type="button"
                  onClick={() => choose("silent")}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Browse on My Own
                </Button>
              </div>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-ink-3">
                <Icon name="check" size={13} strokeWidth={2.2} className="text-accent" />
                Plays audio · mute anytime with the sound button
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WelcomeModal;
