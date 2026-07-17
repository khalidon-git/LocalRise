# BUG-004 — "Browse on My Own" would have started the audio

**Severity**: High · **Status**: Fixed before shipping (`444d4f1`) · **Class**: feature interaction

## Symptoms

Caught during implementation, never shipped. The welcome modal offers "Start
Guided Experience" or "Browse on My Own". Clicking **Browse on My Own** would
have started the narration — the exact opposite of the request.

## Root cause

`AudioProvider` armed a fallback listening on `window` for **any** first gesture:

```tsx
audio.play().catch(() => addGestureListeners());  // pointerdown on window
```

The click on "Browse on My Own" *is* a pointerdown. The fallback couldn't
distinguish "consent to audio" from "any interaction at all" — it was built when
any interaction was a fine proxy for consent.

## Why it happened

A **feature interaction**, not a coding error. The fallback was correct when it
shipped; the modal changed its meaning. Nothing in `AudioProvider` referenced the
modal, and nothing in the modal referenced the fallback.

> The class: *a new feature silently invalidates an old assumption in an
> unrelated file.* Grep-by-symbol never finds these — only reasoning about
> behaviour does.

## Files involved

`providers/AudioProvider.tsx`, `components/onboarding/WelcomeModal.tsx`,
`lib/onboarding.ts`

## Fix

Consent-gate the engine. Only auto-start for visitors who *previously* chose
`"guided"`; expose `startNarration()` for the modal to call explicitly:

```tsx
if (readOnboardingChoice() === "guided") {
  audio.play().catch(() => addGestureListeners());
}
```

New options default to silent — the safe direction.

## Verification

Fresh profile → "Browse on My Own" → must stay silent, and stay silent across
navigation. Then the toggle must start it **with sound on one click**
([BUG-008](./008-toggle-started-audio-muted.md)).

## Prevention

- **Never** arm a global `window` gesture listener that triggers a
  user-perceivable side effect without an explicit consent gate.
- When adding a feature that expresses user *intent*, grep for existing
  behaviours keyed on *any* interaction — they now conflict.

## Related

[BUG-002](./002-gesture-fallback-self-disabling.md) ·
[onboarding.md](../../docs/onboarding.md)
