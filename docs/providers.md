# Providers (context layer)

## Purpose

Global state and engines that must outlive route changes. Both live in
`providers/` and are mounted once in `app/layout.tsx`.

| Provider | Owns | Doc |
| --- | --- | --- |
| `AudioProvider` | The single `<audio>` element + playback state | [audio.md](./audio.md) |
| `CartProvider` | Cart items + drawer open state | [cart.md](./cart.md) |

## Mount order (and why)

```tsx
<AudioProvider>          {/* outermost: owns the <audio> element */}
  <CartProvider>
    <Nav />
    {children}           {/* route content — swaps on navigation */}
    <Footer />
    <WhatsAppButton />
    <AudioToggle />      {/* consumes useAudio() */}
    <CartDrawer />       {/* consumes useCart() */}
  </CartProvider>
</AudioProvider>
```

**Why the root layout.** App Router keeps the root layout mounted across every
client-side navigation. Only `{children}` is replaced. So anything here is
created exactly once per page load — that's what makes a single audio instance
guaranteed *by construction* rather than by a manual singleton.

**Why `AudioProvider` is outermost.** It's the longest-lived concern and depends
on nothing else. `AudioToggle` must be inside it to call `startNarration()`.
`CartProvider` doesn't depend on audio, so the order between them is not load-
bearing — but don't reorder without reason.

**What this cannot survive:** a full page load. See [navigation.md](./navigation.md).

## The `use client` boundary

`app/layout.tsx` is a **server component** (it exports `metadata`). Providers are
client components (`"use client"`). This works because a server component may
render a client component and pass `children` through — the children are still
server-rendered. Don't add `"use client"` to the layout; it would drop
`metadata` and pull the whole tree client-side.

## Conventions

Each provider file exports three things:

```tsx
const Ctx = createContext<Value | undefined>(undefined);   // private
export function XProvider({ children }) { … }              // the engine
export function useX() {                                    // the consumer hook
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useX must be used within an XProvider");
  return ctx;
}
```

The throw is deliberate: a missing provider is a wiring bug that should fail
loudly at the call site, not silently return undefined.

**Hooks stay colocated with their provider** — `useCart` lives in
`CartProvider.tsx`, `useAudio` in `AudioProvider.tsx`. They are not in `hooks/`.
A hook whose only job is consuming its own context is part of that module's API;
splitting them adds indirection without adding a seam. `hooks/` is for
*reusable, context-free* behaviour ([hooks.md](./hooks.md)).

## Performance note

Context value objects are rebuilt each render, re-rendering consumers. Today
that's fine — the consumers are two small buttons and a drawer, and state changes
are rare (mute, cart open).

If a provider ever feeds many components, memoise the value (`useMemo`) and keep
callbacks in `useCallback` (already done). Don't pre-optimise: measure first.

## Extending

**Add a provider** when state must be shared across routes or by distant
components. Otherwise prefer local `useState`, or props.

1. Create `providers/XProvider.tsx` with the three-export shape above.
2. Mount it in `app/layout.tsx`, inside `AudioProvider`.
3. Keep the engine (effects, timers, DOM) in the provider; keep components
   presentational.

**Don't** create a provider for values read in only one or two places, or for
things that aren't React state. `lib/onboarding.ts` is a plain module precisely
so `AudioProvider` can read the preference without a React tree.
