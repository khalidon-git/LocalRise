"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { readOnboardingChoice } from "@/lib/onboarding";

// ---------------------------------------------------------------------------
// Owns the site's single audio engine.
//
// WHY THIS SHAPE:
// * The <audio> element is rendered declaratively here, and this provider is
//   mounted in the root layout. App Router keeps the root layout mounted across
//   every client-side navigation, so the element is created exactly once and is
//   never recreated by a route change — no restart, no reset, no seek to 0.
// * Declarative <source> children (rather than `new Audio(src)`) let the browser
//   pick the codec itself: Opus where supported, MP3 for Safari/iOS. An
//   imperative Audio() would force us to hand-roll canPlayType detection.
// * Splitting the engine (here) from the control UI (AudioToggle) keeps audio
//   logic out of presentation components, and lets any component read or
//   control audio via useAudio() without prop drilling or a second element.
//
// A React context cannot survive a *full page reload*, so playback position and
// mute preference are mirrored into sessionStorage and restored on mount. That
// covers direct entry to a URL and any hard navigation.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "localrise:audio";

// Gestures that can grant autoplay permission. NOTE: scroll does NOT count as a
// user activation in Chrome — it's included only as a harmless extra attempt.
const GESTURES = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

type AudioContextValue = {
  /** The element is playing (the timeline is advancing). */
  isPlaying: boolean;
  /** Audible state. Muting never pauses — the timeline keeps running. */
  isMuted: boolean;
  toggleMute: () => void;
  /**
   * Explicitly begin narration. Called from the welcome modal's
   * "Start Guided Experience" button — that click is a user gesture, which is
   * exactly what autoplay policy requires, so playback reliably starts here.
   */
  startNarration: () => void;
};

const AudioCtx = createContext<AudioContextValue | undefined>(undefined);

type Persisted = { muted?: boolean; time?: number };

function readPersisted(): Persisted {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Persisted;
  } catch {
    return {};
  }
}

function persist(muted: boolean, time: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ muted, time }));
  } catch {
    /* private mode / storage disabled — playback still works, just isn't restored */
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Set inside the mount effect; lets startNarration() re-arm the gesture
  // fallback if its own play() attempt is somehow still blocked.
  const armFallbackRef = useRef<() => void>(() => {});

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // --- restore previous session (mute preference + position) ---------------
    const saved = readPersisted();
    if (typeof saved.muted === "boolean") {
      audio.muted = saved.muted;
      setIsMuted(saved.muted);
    }
    let resumeTime = typeof saved.time === "number" ? saved.time : 0;

    const applyResume = () => {
      if (resumeTime > 0 && Number.isFinite(audio.duration)) {
        try {
          audio.currentTime = Math.min(resumeTime, Math.max(audio.duration - 0.25, 0));
        } catch {
          /* seeking not ready — not worth failing playback over */
        }
      }
      resumeTime = 0;
    };

    const attemptPlay = () => {
      audio.play().catch(() => {
        /* still blocked — the gesture listeners stay attached and try again */
      });
    };
    const addGestureListeners = () => {
      GESTURES.forEach((e) => window.addEventListener(e, attemptPlay, { passive: true }));
    };
    const removeGestureListeners = () => {
      GESTURES.forEach((e) => window.removeEventListener(e, attemptPlay));
    };
    armFallbackRef.current = addGestureListeners;

    // Only tear the fallback down once playback is CONFIRMED. Removing the
    // listeners on the play() call itself (before the promise settles) is what
    // previously left the site permanently silent when an attempt failed.
    const onPlaying = () => {
      setIsPlaying(true);
      removeGestureListeners();
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      persist(audio.muted, 0);
    };

    let lastWrite = 0;
    const onTimeUpdate = () => {
      const now = Date.now();
      if (now - lastWrite < 1000) return; // throttle: this fires ~4x/second
      lastWrite = now;
      persist(audio.muted, audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", applyResume);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    // Only visitors who previously opted into the guided experience get audio
    // without asking again. First-time visitors are handled by WelcomeModal, and
    // anyone who chose "Browse on My Own" stays silent until they use the toggle.
    //
    // This gate matters: arming the gesture fallback unconditionally would make
    // the very click on "Browse on My Own" start the narration.
    if (readOnboardingChoice() === "guided") {
      audio.play().catch(() => addGestureListeners());
    }

    return () => {
      removeGestureListeners();
      audio.removeEventListener("loadedmetadata", applyResume);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  // Begins playback from an explicit user action (the welcome modal). Because
  // the call originates in a click handler it satisfies autoplay policy, so no
  // gesture fallback is normally needed — it's re-armed only as a safety net.
  const startNarration = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    setIsMuted(false);
    audio.play().catch(() => armFallbackRef.current());
  }, []);

  // Mute/unmute ONLY. Never pauses, reloads, or seeks — the timeline keeps
  // running while muted, so unmuting reveals the audio at the current position.
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Nothing is playing yet — e.g. the visitor chose "Browse on My Own", or
    // the narration finished. Treat the click as "play with sound"; muting
    // something inaudible would just cost them a second click to hear anything.
    if (audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
      persist(false, audio.currentTime);
      return;
    }

    const next = !audio.muted;
    audio.muted = next;
    setIsMuted(next);
    persist(next, audio.currentTime);
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, isMuted, toggleMute, startNarration }}>
      {/* preload="none": autoplay is blocked for most first-time visitors, so
          anyone who never interacts downloads nothing. On the first gesture the
          audio streams progressively and starts almost immediately. */}
      <audio ref={audioRef} preload="none" playsInline>
        <source src="/intro.ogg" type="audio/ogg; codecs=opus" />
        <source src="/intro.mp3" type="audio/mpeg" />
      </audio>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}
