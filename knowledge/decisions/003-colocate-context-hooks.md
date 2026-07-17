# ADR-003 — Context hooks live with their provider, not in `hooks/`

**Date**: 2026-07-17 · **Status**: Accepted

## Context

A refactor brief asked for a `hooks/` folder holding all custom hooks. The
codebase has two kinds:

1. `useCart`, `useAudio` — exist only to consume their own context.
2. `useScrollLock`, `useCarousel` — reusable, context-free behaviour.

## Decision

- **Type 1 stays with its provider** (`useCart` in `CartProvider.tsx`).
- **Type 2 lives in `hooks/`.**

## Why

A hook whose entire body is `useContext(X)` + a guard **is part of that module's
public API**, not an independent unit. Moving it to `hooks/` would:

- split one API across two files,
- make `hooks/useCart.ts` import the context from `providers/` — indirection
  without a seam,
- imply reusability that doesn't exist (it's meaningless outside its provider).

`hooks/` earns its name by holding things that are genuinely **reusable and
context-free**. `useScrollLock` has three consumers; `useCarousel` has one but
owns real logic worth isolating.

> The test: **could this hook be used by a component that doesn't know the
> provider exists?** Yes → `hooks/`. No → colocate.

## Alternatives

| Option | Why not |
| --- | --- |
| All hooks in `hooks/` | Uniform-looking, but splits provider APIs and adds import hops |
| All hooks colocated | `useScrollLock` has 3 unrelated consumers; it belongs to none of them — that's what caused [BUG-003](../bugs/003-scroll-lock-conflict.md) |

## Trade-offs

Someone scanning `hooks/` won't see `useAudio`. Mitigated by
[providers.md](../../docs/providers.md) documenting the convention explicitly.

## Implications

New hook → apply the test above. A hook that only reads its own context is not a
`hooks/` citizen.
