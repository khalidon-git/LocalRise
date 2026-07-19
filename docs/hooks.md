# Hooks

`hooks/` holds **reusable, context-free** behaviour. Hooks that only consume
their own context (`useCart`, `useAudio`) live beside their provider — see
[providers.md](./providers.md).

| Hook | Purpose |
| --- | --- |
| `useScrollLock(locked)` | Lock body scroll while an overlay is open |
| `useCarousel()` | Drive a horizontal snap-scrolling carousel |

---

## `useScrollLock(locked: boolean)`

**File**: `hooks/useScrollLock.ts`
**Used by**: `Nav` (mobile menu), `CartProvider` (drawer), `WelcomeModal`

```tsx
useScrollLock(open);   // that's the whole API
```

### Why it's reference counted

Multiple overlays can be open at once. Previously `Nav` and `CartProvider` each
did:

```tsx
document.body.style.overflow = open ? "hidden" : "";
return () => { document.body.style.overflow = ""; };   // ← the bug
```

Whichever closed first reset `overflow` to `""` while the other was still
open — the page scrolled behind an open overlay.

Module-level `lockCount` fixes it: the body only unlocks when the **last** holder
releases, and the previous `overflow` value is restored rather than assumed to be
`""`.

> Never write `document.body.style.overflow` directly. Use this hook.

### Extending

Add scrollbar-width compensation here (padding the body to avoid layout shift)
if it's ever needed — one place, every overlay benefits.

---

## `useCarousel<T>()`

**File**: `hooks/useCarousel.ts`
**Used by**: `components/sections/IndividualServices.tsx`, `components/sections/FeaturedConcepts.tsx`

```tsx
const {
  containerRef,      // attach to the scrolling element
  activeIndex,       // card snapped to the left edge — for dot indicators
  canScrollLeft,     // for disabling arrows
  canScrollRight,
  scrollByCard,      // (direction: "left" | "right")
  scrollToIndex,     // (index: number)
  isAutoplayPaused,  // true while autoplay is suspended, for any reason
  pause,             // manually suspend autoplay
  resume,            // release a manual pause()
} = useCarousel<HTMLDivElement>({ autoplay: true, intervalMs: 5000 });
```

Expects a horizontally scrolling container whose **direct children are the
cards** (`overflow-x-auto snap-x snap-mandatory`).

### Why the step is measured, not calculated

The step is `children[1].offsetLeft - children[0].offsetLeft` — the real card
pitch, read from the DOM.

> The previous inline version hard-coded `window.innerWidth < 768 ? 12 : 24` to
> match the `gap-3 md:gap-6` classes. It silently drifted the moment spacing
> changed. Measuring keeps the hook correct regardless of card width, gap, or
> breakpoint.

`canScrollRight` uses an 8px buffer for fractional pixel widths; `activeIndex` is
whichever child's left edge is nearest the container's. Scroll and resize
listeners are `passive`.

### Autoplay (`autoplay: true`)

Opt-in per carousel via the options object; off by default. One `setInterval`,
cleared and re-created whenever any pause condition changes — never more than
one timer alive per carousel, and it's gone on unmount.

Every pause trigger the hook wires up **on `containerRef` itself**, so a
consumer only passes `autoplay: true` and renders the container — no extra
`onMouseEnter`/`onFocus` props needed anywhere:

- Pointer hover (mouse/pen only — a touch tap isn't treated as "hover
  forever").
- Keyboard focus anywhere inside the container (`focusin`/`focusout`, so
  tabbing between two cards' buttons doesn't flicker the pause on and off).
- Active interaction — `pointerdown`/`touchstart`/`wheel` pause immediately;
  release is debounced ~1.2s after the last one, so a scroll that just ended
  isn't immediately overridden by the next tick.
- A hidden browser tab (`visibilitychange`).
- `prefers-reduced-motion: reduce` — autoplay never starts at all, not just
  paused.
- A manual `pause()`/`resume()` call, independent of the automatic triggers.

Each tick reads `scrollLeft`/`scrollWidth`/`clientWidth` **fresh from the
DOM** rather than trusting `activeIndex`/`canScrollRight` state — those can be
a tick stale inside a `setInterval` closure. At the last card it loops to
`scrollToIndex(0)`; otherwise `scrollByCard("right")`.

The container's own `scroll` event is deliberately **not** one of the
interaction triggers — it fires for the hook's own `scrollBy`/`scrollTo`
calls too, and using it would make autoplay pause itself on every automatic
advance.

### Extending

- **Keyboard/drag support** → add here; every carousel benefits.
- **A second carousel** → just call the hook; it's already generic. Don't copy
  the scroll maths into a component.

---

## Writing a new hook

Put it here if it is **reusable and context-free**. Keep it beside its provider
if it just reads that context. Inline it in the component if it's used once and
isn't logic worth naming.

Rules of thumb:

- Own the DOM/timer/listener details; return a small, declarative API.
- Clean up every listener in the effect's return.
- Use `passive: true` for scroll/touch listeners.
- Guard `window`/`document` — they don't exist during the static prerender.
