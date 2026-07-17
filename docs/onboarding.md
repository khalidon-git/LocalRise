# Onboarding (first-visit welcome modal)

## Purpose

On a visitor's first arrival, offer a choice: start the guided audio experience,
or browse silently. The choice persists, and the modal never appears again.

It also solves a technical problem. Browsers refuse to play audio until the user
interacts, so **the "Start Guided Experience" click is simultaneously consent and
the user gesture autoplay policy requires**. Consent and capability in one tap —
which is why this is the right pattern rather than a workaround.

## Key files

| File | Role |
| --- | --- |
| `components/onboarding/WelcomeModal.tsx` | The modal UI + choice handling |
| `lib/onboarding.ts` | localStorage read/write/clear |
| `providers/AudioProvider.tsx` | Reads the choice to gate auto-start |

## Data flow

```
first load
   │
   ▼
WelcomeModal (effect) ── readOnboardingChoice() ── null? ──► show modal
                                                    │
                                        "guided"/"silent" ──► never show
   │
   ├── "Start Guided Experience" ─► save("guided") ─► useAudio().startNarration()
   ├── "Browse on My Own" ────────► save("silent")  ─► close, stay silent
   └── Escape ────────────────────► save("silent")  ─► close, stay silent

next visit
   │
   ▼
AudioProvider (mount) ── readOnboardingChoice() === "guided" ──► auto-play
```

## Storage

- **Key**: `localrise:onboarding` in **localStorage** (not sessionStorage — the
  choice must outlive the tab).
- **Values**: `"guided"` | `"silent"`.
- **Reset** (to see the modal again): `localStorage.removeItem("localrise:onboarding")`
  in DevTools, or call `clearOnboardingChoice()`.

Reads are `try/catch`-wrapped. In private mode the read returns `null`, so the
modal shows again — deliberately chosen over silently autoplaying.

## Two decisions worth knowing

**Why it renders `null` on the server.** The modal starts `open: false` and only
opens from a `useEffect`. localStorage doesn't exist during the static prerender,
so deciding at render time would either cause a hydration mismatch or bake the
modal into `out/index.html` and flash it at returning visitors. Verified: the
string "Welcome to LocalRise" must **not** appear in the built HTML.

**Why Escape means "silent" and is persisted.** Dismissing is a real choice.
Trapping the visitor until they pick would be hostile; re-asking on every page
load would be worse. Silent is the conservative default — it never plays audio
someone didn't ask for.

## Design

Matches the design system: `accent-gradient` top bar, `Logo`, `font-display`
heading, `Button` primary + secondary, blurred accent blob for depth,
`shadow-float`, `rounded-3xl`. Framer Motion fades the backdrop and springs the
panel (`ease-premium` curve, per [animations.md](./animations.md)).

Accessibility: `role="dialog"`, `aria-modal`, `aria-labelledby`/`describedby`,
`autoFocus` on the primary action, Escape to dismiss, and body scroll locked via
[`useScrollLock`](./hooks.md) — which is reference-counted, so it cannot fight the
cart drawer or mobile menu.

`z-[60]` sits above Nav and the cart drawer (both `z-50`).

## Extending

**Change the copy** → edit `WelcomeModal.tsx` directly. It's one-off UI, not
reusable content; it doesn't belong in `lib/content`.

**Add a third option** → extend the `OnboardingChoice` union in
`lib/onboarding.ts`. TypeScript will surface every place needing an update — note
`AudioProvider` checks `=== "guided"`, so any new option defaults to silent,
which is the safe direction.

**Add a guided tour** (highlighting sections as narration plays) — the modal is
already the right trigger point. Drive it from `useAudio()`'s `currentTime`
rather than a parallel timer, or the tour will drift out of sync with the audio.

**Don't** move the choice into a new provider. It's read in exactly two places
and a plain module keeps it dependency-free — importantly, `AudioProvider` can
read it without depending on a React tree.
