"use client";

import { useAudio } from "@/providers/AudioProvider";
import { saveOnboardingChoice } from "@/lib/onboarding";

// Pure presentation: reads audio state from context and calls toggleMute().
// Holds no audio logic of its own — the engine lives in AudioProvider.
export function AudioToggle() {
  const { isPlaying, isMuted, toggleMute, startNarration } = useAudio();
  const audible = isPlaying && !isMuted;
  const startOrToggle = () => {
    if (!isPlaying) {
      saveOnboardingChoice("guided");
      startNarration();
      return;
    }
    toggleMute();
  };

  return (
    <button
      type="button"
      onClick={startOrToggle}
      aria-label={!isPlaying ? "Play guided introduction" : isMuted ? "Unmute intro audio" : "Mute intro audio"}
      aria-pressed={isPlaying ? !isMuted : undefined}
      className="safe-floating-bottom fixed left-4 z-40 flex min-h-12 min-w-24 items-center justify-center gap-2 rounded-full border border-line bg-white/95 px-4 text-ink shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:left-6"
    >
      {!isPlaying ? (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 9v6h4l5 4V5L9 9H5Z" />
            <path d="M18 8.5a5 5 0 0 1 0 7" />
          </svg>
          <span className="text-body-sm font-semibold">Listen</span>
        </>
      ) : audible ? (
        <>
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-[3px] origin-bottom rounded-full bg-accent animate-eq" style={{ height: 16, animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
          <span className="text-body-sm font-semibold">Mute</span>
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 9v6h4l5 4V5L9 9H5Z" />
            <path d="m17 9 4 6M21 9l-4 6" />
          </svg>
          <span className="text-body-sm font-semibold">Unmute</span>
        </>
      )}
    </button>
  );
}

export default AudioToggle;
