# BUG-002 — The autoplay gesture fallback disabled itself

**Severity**: High · **Status**: Fixed (`3a9c5f3`) · **Class**: async/lifecycle

## Symptoms

Intermittent: on some loads the narration never started, no matter how much the
visitor clicked. Nothing in the console.

## Root cause

```tsx
const startOnGesture = () => {
  audio.play().catch(() => {});   // async — returns a promise
  removeGestureListeners();       // ← runs immediately, regardless of outcome
};
```

`play()` is **asynchronous**. The listeners were torn down on the *call*, not on
confirmed playback. If that first attempt rejected for any reason, the fallback
was permanently dead — the site stayed silent for the rest of the page's life.

## Why it happened

`play()` *looks* synchronous. The bug only appears when the attempt fails, which
is exactly the case the fallback exists for — so the happy path hides it.

## Files involved

`providers/AudioProvider.tsx` (was `components/SitePlayer.tsx`)

## Fix

Tear down only on the **confirmed `playing` event**:

```tsx
const onPlaying = () => { setIsPlaying(true); removeGestureListeners(); };
audio.addEventListener("playing", onPlaying);
```

Failed attempts now leave the listeners armed, so the next gesture retries.

## Prevention

> **Rule**: never dismantle a retry mechanism on the *attempt*. Dismantle it on
> the *confirmation event*.

Applies beyond audio — any promise-returning browser API guarded by a fallback
(clipboard, fullscreen, geolocation, share).

## Related

[BUG-001](./001-raw-anchor-destroys-audio.md) ·
[BUG-004](./004-gesture-fallback-hijacked-browse-silently.md)
