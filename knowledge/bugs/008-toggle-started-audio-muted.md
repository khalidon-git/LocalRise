# BUG-008 — The sound button started the audio muted

**Severity**: Medium · **Status**: Fixed before shipping (`444d4f1`) · **Class**: state-machine gap

## Symptoms

Caught during implementation. A visitor who chose "Browse on My Own" clicks the
sound button expecting audio. Instead: nothing audible. A **second** click was
needed to actually hear it.

## Root cause

`toggleMute` assumed audio was always *playing*, so mute was the only meaningful
axis:

```tsx
const next = !audio.muted;   // false → true
audio.muted = next;          // now muted
if (audio.paused) audio.play();   // starts… muted
```

For a visitor who never started playback, `muted` was `false` (default) — so
"toggle" muted it, then played it silently.

## Why it happened

Two independent bits of state — `paused` and `muted` — but the handler only
modelled one. The "not started yet" state was introduced later by the welcome
modal ([BUG-004](./004-gesture-fallback-hijacked-browse-silently.md)); before it,
audio was always playing and the assumption held.

> Same family as BUG-004: **a new feature created a state the existing handler
> never had to consider.**

## Files involved

`providers/AudioProvider.tsx`

## Fix

Model the missing state explicitly — if nothing is playing, the click means
*play with sound*:

```tsx
if (audio.paused) {
  audio.muted = false;
  setIsMuted(false);
  audio.play().catch(() => {});
  return;
}
// otherwise: genuinely toggle mute
```

## Verification

"Browse on My Own" → click the sound button → audible **on the first click**.
Also: after narration ends, the button replays it.

## Prevention

> When a control maps to multiple underlying booleans (`paused` × `muted`),
> enumerate the combinations. A "toggle" that ignores one is a bug waiting for
> the state that makes it reachable.

## Related

[audio.md](../../docs/audio.md) · [BUG-004](./004-gesture-fallback-hijacked-browse-silently.md)
