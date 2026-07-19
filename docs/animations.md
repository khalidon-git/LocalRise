# Animations & motion

## Purpose

Motion here is for **hierarchy and polish**, not decoration: guide the eye down
the page, confirm interactions, make the site feel considered. Everything is
subtle and fast.

## The two systems

| System | Use for | Where |
| --- | --- | --- |
| **Framer Motion** | Enter/exit, orchestration, gestures | `"use client"` components |
| **Tailwind keyframes** | Ambient loops (float, marquee, equaliser) | `tailwind.config.ts` |

Prefer Tailwind for anything that just loops forever — it costs no JS.

## The signature curve

```ts
const ease = [0.22, 1, 0.36, 1] as const;   // Framer
// ease-premium                              // Tailwind (transitionTimingFunction)
```

A fast-out, slow-in curve used almost everywhere. **Use it for new motion** —
consistency is what makes it read as one system. Available as `ease-premium` in
Tailwind and declared inline in most section components.

## Reusable primitives

| Component | Purpose |
| --- | --- |
| `components/ui/Reveal.tsx` | `Reveal`, `Stagger`, `StaggerItem` — scroll-triggered entrances |
| `components/ui/Magnetic.tsx` | Cursor-following pull on CTAs |

```tsx
<Reveal delay={0.1}>…</Reveal>

<Stagger className="grid gap-5">
  {items.map((i) => <StaggerItem key={i.id}>…</StaggerItem>)}
</Stagger>
```

`Reveal` uses `whileInView` with `once: true` — sections animate on first scroll
past, never again. **Use these instead of hand-rolling `whileInView`**; it keeps
timing consistent.

## Tailwind keyframes

Defined in `tailwind.config.ts` → `theme.extend.keyframes` / `animation`:

| Class | Used by |
| --- | --- |
| `animate-float-soft` / `animate-float-slow` | Illustration elements (`SpotScenes`, `ServiceHeroVisual`) |
| `animate-marquee` | `TrustBar` |
| `animate-pulse-ring` | `WhatsAppButton` |
| `animate-eq` | `AudioToggle` equaliser bars |

Stagger loops by varying `animationDelay` inline (see `AudioToggle`) rather than
declaring near-identical keyframes.

> `animate-eq` scales on Y, so bars need `origin-bottom` or they grow from the
> centre and look wrong.

**Add ambient loops here, not as injected `<style>` tags.** `AudioToggle`
previously shipped its own `<style>` block; it now uses `animate-eq`.

## Reduced motion

`app/globals.css` disables animations under `prefers-reduced-motion`. Framer
respects it for transforms, but **check anything custom** — especially loops and
parallax. Motion is polish; it must never be required to understand the page.

## Performance rules

- **Animate `transform` and `opacity` only.** Never `width`, `height`, `top`, or
  `left` — they trigger layout on every frame.
- Keep micro-interactions **≤300ms**; entrances 400–700ms.
- Framer Motion is client-only. A section that animates needs `"use client"`, so
  keep static sections server components.
- Scroll listeners: `{ passive: true }` (see `Nav`).

## Data flow

```
tailwind.config.ts  ──►  animate-* classes  ──►  illustrations, chrome
ease [0.22,1,0.36,1] ─►  Reveal / Stagger   ──►  sections
                     └─►  AnimatePresence   ──►  modal, drawer, mobile menu
```

`AnimatePresence` powers exit animations for `WelcomeModal`, `CartDrawer` and the
`Nav` mobile menu. Exits need the element to stay mounted until the animation
ends — that's what `AnimatePresence` handles; don't unmount conditionally without
it or exits are skipped.

## Extending

**New section entrance** → wrap in `Reveal` / `Stagger`. Don't invent a variant.

**New ambient loop** → add keyframes + animation to `tailwind.config.ts`.

**New overlay** → `AnimatePresence` + backdrop fade + panel spring, and pair it
with `useScrollLock` ([hooks.md](./hooks.md)). `WelcomeModal` is the reference
implementation.

**New illustration motion** → apply `animate-float-soft`/`-slow` to an SVG `<g>`.
CSS transforms work on SVG groups; `translateY` needs no `transform-box`.
