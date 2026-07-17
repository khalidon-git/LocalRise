# Audio (narration engine)

**The most subtle system in this codebase. Read all of it before changing any of it.**

## Purpose

Play a short narrated intro that begins when the visitor opts in, and continues
**seamlessly across route changes** — never restarting, never resetting, never
seeking back to 0. Think Spotify: the player is independent of the page.

## Key files

| File | Role |
| --- | --- |
| `providers/AudioProvider.tsx` | The engine. Owns the single `<audio>` element and all logic. |
| `components/audio/AudioToggle.tsx` | Pure UI. Renders the floating button, calls `toggleMute()`. |
| `lib/onboarding.ts` | The consent gate — decides whether audio may auto-start. |
| `public/intro.ogg` / `public/intro.mp3` | Opus 32k (417 KB) and MP3 48k (601 KB). |

## The three rules that make this work

### 1. Browsers block audio until the visitor interacts

Not a bug, not bypassable. `audio.play()` on page load rejects with
`NotAllowedError` unless the user has interacted with the origin. **Scroll does
not count** as a user activation in Chrome — only click/tap/keypress.

This is *why* the welcome modal exists: the "Start Guided Experience" click is
both consent and the gesture autoplay requires. See [onboarding.md](./onboarding.md).

### 2. A full page load destroys the audio — no architecture can prevent it

A React context, singleton, or provider only lives as long as the JS runtime. A
plain `<a href="/services/x">` triggers a document load, which tears down
everything and restarts audio from 0.

**This was the original bug.** The audio component was already in the root
layout; the problem was that internal links were raw anchors. Persistence is
achieved by [navigation.md](./navigation.md) (`SmartLink` → `next/link`), not by
the provider.

> **Never add a raw `<a href="/...">`.** It silently breaks this system.

### 3. Mute ≠ pause

The toggle **mutes**; it never pauses. The timeline keeps running while muted, so
unmuting reveals the narration at its *current* position. Pausing would freeze
the timeline — a different product decision. Don't "simplify" this into a
pause/play toggle.

## Architecture, and why

`AudioProvider` is mounted in `app/layout.tsx`, **above** `{children}`. App Router
keeps the root layout mounted across every client-side navigation, so the
`<audio>` element is created exactly once. Single instance by construction — no
manual singleton needed.

**Why declarative `<audio>` rather than `new Audio(src)`:** `<source>` children
let the browser pick the codec itself (Opus where supported, MP3 for Safari/iOS).
An imperative `Audio()` would require hand-rolled `canPlayType` detection.

**Why a context at all:** it separates engine from UI, and lets any component
read/control audio via `useAudio()` without prop drilling or a second element.
`useAudio` is colocated with the provider on purpose — a hook that exists only to
consume its own context belongs beside it.

## Data flow

```
                    lib/onboarding.ts (localStorage)
                              │  "guided" | "silent" | null
                              ▼
app/layout.tsx ──► AudioProvider ──────────────► <audio> (one, at the root)
                       │  ▲                          │
       useAudio()      │  │ startNarration()         │ timeupdate (throttled 1/s)
                       ▼  │                          ▼
              AudioToggle │                   sessionStorage
              WelcomeModal┘                   { muted, time }
```

## Startup logic (the important part)

On mount, `AudioProvider`:

1. Restores `{ muted, time }` from **sessionStorage** and seeks on `loadedmetadata`.
2. Attaches listeners: `playing`, `pause`, `ended`, `timeupdate`.
3. **Consent gate** — only auto-plays if `readOnboardingChoice() === "guided"`:
   - `null` (first visit) → wait for `WelcomeModal`.
   - `"silent"` → stay silent; the toggle can still start it.
   - `"guided"` → try `play()`; if blocked, arm the gesture fallback.

> ⚠️ **Do not arm the gesture fallback unconditionally.** It listens on `window`,
> so the click on **"Browse on My Own"** would itself start the narration — the
> exact opposite of what the visitor asked for.

### The gesture fallback

When autoplay is blocked, listeners on `pointerdown`/`keydown`/`touchstart`
retry `play()`. They are removed **only on the confirmed `playing` event** —
never on the `play()` call itself.

> This was a real bug: `play()` is async, and tearing the listeners down
> optimistically meant one failed attempt left the site permanently silent.

## Persistence

| Storage | Key | Holds | Why |
| --- | --- | --- | --- |
| sessionStorage | `localrise:audio` | `{ muted, time }` | Survives hard reloads / direct URL entry within a tab session. A brand-new visit should start fresh. |
| localStorage | `localrise:onboarding` | `"guided"` \| `"silent"` | The consent choice, across visits. |

Position writes are throttled to ~1/s (`timeupdate` fires ~4×/s). All storage
access is wrapped in `try/catch` — private mode must not break playback.

## Public API

```ts
const { isPlaying, isMuted, toggleMute, startNarration } = useAudio();
```

- `isPlaying` — the element is playing (timeline advancing).
- `isMuted` — audible state.
- `toggleMute()` — mutes/unmutes. If nothing is playing (e.g. "silent" visitor,
  or narration ended), it instead **plays with sound** — muting something
  inaudible would just cost a second click.
- `startNarration()` — explicit start; used by `WelcomeModal`.

## Extending

**Change the audio file** — replace `public/intro.ogg` + `public/intro.mp3`
(keep both for codec fallback). Re-encode from the *original* master, never from
an existing compressed file; stacking lossy encodes audibly degrades it. See
[deployment.md](./deployment.md) for the ffmpeg recipe and the archive size trap.

**Add a second track** — the provider assumes one element. Generalise it to a
track list rather than mounting a second `<audio>`; two elements = two engines.

**Add a progress bar / seek** — expose `currentTime`/`duration` from the provider.
Don't reach into the DOM from a component; keep logic in the engine.

**Add controls elsewhere** (e.g. in `Nav`) — just call `useAudio()`. That's what
the context is for. Do **not** render another `<audio>`.

## Verification checklist

Requires a real browser — the build cannot prove this:

- [ ] First visit → modal appears → **Start Guided Experience** → audio plays.
- [ ] Navigate home → service page → **audio continues mid-sentence**, no restart.
- [ ] Mute → navigate → still muted; unmute → resumes at the *current* timestamp.
- [ ] "Browse on My Own" → silent; clicking the toggle plays **with sound** on one click.
- [ ] Reload mid-playback → resumes near the same position.
- [ ] Second visit → no modal.
