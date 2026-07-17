"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/intro.mp3";

// Plays the intro audio when the site opens. Browsers block audio-with-sound
// until the visitor interacts, so we try to autoplay immediately and, if that
// is blocked, start on the first click / tap / key press anywhere. A small
// floating button lets visitors pause or resume it at any time.
export function SitePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    const gestureEvents = ["pointerdown", "keydown", "touchstart"] as const;
    const startOnGesture = () => {
      audio.play().catch(() => {});
      removeGestureListeners();
    };
    const removeGestureListeners = () => {
      gestureEvents.forEach((e) => window.removeEventListener(e, startOnGesture));
    };

    // Try immediately; if the browser blocks autoplay, wait for a gesture.
    audio.play().catch(() => {
      gestureEvents.forEach((e) => window.addEventListener(e, startOnGesture, { passive: true }));
    });

    return () => {
      removeGestureListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause intro audio" : "Play intro audio"}
        aria-pressed={playing}
        className="fixed bottom-6 left-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-lg backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {playing ? (
          // playing → animated equaliser bars
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-accent"
                style={{ height: 16, transformOrigin: "bottom", animation: `sp-eq 0.9s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </span>
        ) : (
          // paused / muted → speaker-off icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 9v6h4l5 4V5L9 9H5Z" />
            <path d="m17 9 4 6M21 9l-4 6" />
          </svg>
        )}
      </button>

      {/* keyframes for the equaliser bars (scoped, tiny) */}
      <style>{`@keyframes sp-eq{0%,100%{transform:scaleY(0.35)}50%{transform:scaleY(1)}}`}</style>
    </>
  );
}

export default SitePlayer;
