# BUG-001 — A raw `<a href="/...">` destroys the audio engine

**Severity**: Critical · **Status**: Fixed (`3a9c5f3`) · **Class**: architectural invariant

## Symptoms

- Narration restarted from 0 whenever the visitor changed page.
- Audio "only started after navigating somewhere else", never on the homepage.

## Root cause

`Button` ([ui/Button.tsx](../../components/ui/Button.tsx)) rendered a raw
`<a href>` for every `href`, never `next/link`. `Nav`, `Footer` and the service
page did the same.

A plain anchor to an app route triggers a **full document load**. That destroys
the JS runtime, the React tree, and every provider with it — including the
`<audio>` element. Playback resets to 0.

## Why it happened

The brief assumed this was a *component placement* problem — "move the audio high
enough in the tree". It was already in the root layout. The real defect was in
navigation, a system nobody thought to look at while debugging audio.

**The trap**: the fix looks like it belongs in the audio code. It doesn't.

## The insight worth keeping

> **No React context, singleton, provider or "global audio manager" can survive a
> full page load.** If navigation reloads the document, no architecture saves you.
> Persistence is a *navigation* property first, an audio property second.

The apparent "starts only after navigating" behaviour compounded this: autoplay
is blocked on first load, so the first *gesture* starts audio — and the first
gesture is usually a nav click. Chrome's Media Engagement Index then permits
autoplay on the *next* full load, cementing the illusion.

## Files involved

`components/ui/Button.tsx`, `components/layout/Nav.tsx`,
`components/layout/Footer.tsx`, `app/services/[slug]/page.tsx`,
`providers/AudioProvider.tsx`

## Fix

All internal links route through `SmartLink` → `next/link`
(`lib/navigation.ts` → `isInternalHref`). Navigation is client-side, the root
layout is never torn down, audio survives.

## Verification

```bash
# must return nothing
grep -rn '<a ' --include="*.tsx" components app | grep 'href="/'
```
Browser: land on `/`, click anywhere, navigate to a service page — audio must
continue **mid-sentence**.

## Prevention

- **Never** write a raw `<a href="/...">`. Use `SmartLink` / `Button href`.
- Documented in [navigation.md](../../docs/navigation.md) and
  [audio.md](../../docs/audio.md) as a hard rule.
- Add the grep above to CI when tests exist (see tech-debt).

## Related

[BUG-002](./002-gesture-fallback-self-disabling.md) ·
[ADR-002](../decisions/002-audio-engine-architecture.md)
