# Guided audio opt-in

## Purpose

The guided narration stays available without blocking a visitor's first view of
the business offer. A persistent **Listen** control starts the narration from an
explicit click, satisfying browser autoplay policy and recording the opt-in for
future visits.

## Key files

| File | Role |
| --- | --- |
| `components/audio/AudioToggle.tsx` | Non-blocking Listen and mute control |
| `lib/onboarding.ts` | Persists the guided-audio choice in localStorage |
| `providers/AudioProvider.tsx` | Owns the audio element and gates return-visit playback |

## Behaviour

1. A first-time visitor sees the page immediately and audio stays silent.
2. Clicking **Listen** stores `"guided"` and calls `startNarration()` from the
   click gesture.
3. While narration is running, the same control mutes or unmutes it without
   pausing the timeline.
4. A returning guided visitor may auto-resume; if browser policy blocks it, the
   provider retries on the next valid pointer, keyboard or touch gesture.

The localStorage key remains `localrise:onboarding`. Storage access is guarded
so private browsing cannot break the page. Do not restore an automatic modal:
the offer and primary CTA must remain available on the first rendered frame.
