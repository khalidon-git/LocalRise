# ADR-001 — Right-sized structure over enterprise scaffolding

**Date**: 2026-07-17 · **Status**: Accepted

## Context

A refactor brief asked for `features/`, `services/`, `contexts/`, `providers/`,
`constants/`, `types/`, `assets/` — a standard enterprise layout.

LocalRise is a **2-route** (`/`, `/services/[slug]`; now `/concepts` too),
~50-file, statically exported marketing site. No backend, no API, no auth, no
domain model.

## Decision

Adopt a right-sized structure:

```
components/{ui,layout,sections,cart,audio,onboarding,concepts,illustrations}
providers/   hooks/   lib/content/
```

Rejected `features/`, `services/`, `constants/`, `assets/`, `types/`.

## Why

Each rejected folder would hold **one file or none**. `services/` is empty by
definition — a static export has no backend to call. `types/` is unnecessary
because a type used by exactly one data module belongs beside it.

> Structure should track **real** complexity. Folders that exist "for later" add
> import depth and decision fatigue now, and pay back only if "later" arrives.

The split that *does* earn its place is **engine vs presentation**:
`AudioProvider` owns logic, `AudioToggle` renders. Same for `useCarousel`
(scroll maths) vs `IndividualServices` (markup). That's the separation the brief
actually wanted — applied where it pays.

## Alternatives

| Option | Why not |
| --- | --- |
| Full enterprise scaffold | Ceremony; ~10 near-empty folders |
| Leave flat | Real problems existed: `CartProvider` in `components/`, `CartDrawer` in `ui/`, a 512-line `data.ts` |

## Trade-offs

- **Cost**: a future backend or second product area needs restructuring.
- **Benefit**: every folder currently has a real job and a clear name.

## Implications

Revisit if LocalRise gains a backend, auth, or several distinct product areas.
Until then, adding a folder needs a reason beyond "we might need it".

The same reasoning was later applied to the documentation layout
([ADR-006](./006-docs-structure.md)).
