"use client";

import { useAudio } from "@/providers/AudioProvider";

// Pure presentation: reads audio state from context and calls toggleMute().
// Holds no audio logic of its own — the engine lives in AudioProvider.
export function AudioToggle() {
  const { isPlaying, isMuted, toggleMute } = useAudio();
  const audible = isPlaying && !isMuted;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute intro audio" : "Mute intro audio"}
      aria-pressed={!isMuted}
      className="fixed bottom-6 left-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-lg backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      {audible ? (
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom rounded-full bg-accent animate-eq"
              style={{ height: 16, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 9v6h4l5 4V5L9 9H5Z" />
          <path d="m17 9 4 6M21 9l-4 6" />
        </svg>
      )}
    </button>
  );
}

export default AudioToggle;
