# BUG-003 — Two components fought over `body.style.overflow`

**Severity**: Medium · **Status**: Fixed (`3a9c5f3`) · **Class**: shared global state

## Symptoms

With the mobile menu and cart drawer both open, closing one let the page scroll
behind the other, which was still open.

## Root cause

`Nav` and `CartProvider` each owned the same global independently:

```tsx
document.body.style.overflow = open ? "hidden" : "";
return () => { document.body.style.overflow = ""; };   // ← the bug
```

Two writers, one global, and each cleanup **assumed it was the only holder** —
resetting to `""` rather than to the previous value.

## Why it happened

Each component was correct in isolation. The bug only exists in the interaction,
which neither file shows. Nothing in `Nav` hints that `CartProvider` exists.

> This is the signature of shared-global bugs: **every participant looks right;
> the composition is wrong.**

## Files involved

`components/layout/Nav.tsx`, `providers/CartProvider.tsx`,
`hooks/useScrollLock.ts` (new)

## Fix

A **reference-counted** `useScrollLock(locked)`. Module-level `lockCount`; the
body unlocks only when the last holder releases, and restores the *previous*
`overflow` rather than assuming `""`.

Now used by three consumers (`Nav`, `CartProvider`, `WelcomeModal`) — the third
was free precisely because the hook exists.

## Prevention

> **Rule**: any global singleton resource (body scroll, focus trap, `<html>`
> classes, event capture) touched by more than one component must be
> **reference-counted behind one hook**. Never write `document.body.style.*`
> directly.

## Related

[hooks.md](../../docs/hooks.md) · [ADR-003](../decisions/003-colocate-context-hooks.md)
