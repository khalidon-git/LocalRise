# ADR-002 — Declarative `<audio>` in the root layout, not a singleton service

**Date**: 2026-07-17 · **Status**: Accepted

## Context

Narration must survive route changes without restarting. The brief suggested an
`AudioProvider`, Context, "Global Audio Manager" or "Singleton Audio Service".

## Decision

A single `<audio>` element rendered **declaratively** inside `AudioProvider`,
mounted in the **root layout**, with `<source>` children for Opus + MP3.
Consumers use `useAudio()`.

## Why

**Root layout ⇒ one instance, by construction.** App Router keeps the root layout
mounted across every client-side navigation; only `{children}` swaps. No manual
singleton, no module-level global, no de-dupe guard — the framework guarantees it.

**Declarative beats `new Audio()`.** `<source>` children let the *browser* pick
the codec (Opus where supported, MP3 for Safari/iOS). An imperative `Audio()`
would need hand-rolled `canPlayType` detection — more code, more branches, worse.

**Context separates engine from UI.** `AudioProvider` owns logic; `AudioToggle`
only renders. Any component can read/control audio without prop drilling or a
second element.

## The thing that actually mattered

> **None of this is what fixed the bug.** The audio was *already* in the root
> layout. It restarted because internal links were raw `<a>` tags forcing full
> page loads ([BUG-001](../bugs/001-raw-anchor-destroys-audio.md)).
>
> **No context, singleton or manager survives a full page load.** Architecture
> was never the constraint — navigation was.

Recorded prominently because the next person to "improve" the audio architecture
will be tempted to reach for a singleton again. It won't help.

## Alternatives

| Option | Why not |
| --- | --- |
| Module singleton `new Audio()` | Survives remounts we don't have; loses native codec fallback; imperative |
| Audio in `page.tsx` | Remounts on every navigation — the actual bug |
| Web Audio API | Vast overkill for one voice clip |

## Trade-offs

- Can't survive a **hard reload** — mitigated by mirroring `{muted, time}` to
  sessionStorage.
- Assumes **one track**. A second needs generalising to a track list, not a
  second `<audio>`.

## Implications

Anything that adds audio control uses `useAudio()`. Adding a second `<audio>`
anywhere reintroduces the class of bug this design eliminates.
