"use client";

import { useEffect, useRef } from "react";

type MarqueeOptions = {
  /** Continuous drift speed, in px/second. Slow = premium. */
  speed?: number;
  /**
   * Number of items in ONE copy of the set. The consuming track must render
   * the set exactly twice (back to back); the loop wraps by the distance
   * between item[itemCount] and item[0], which is one full period — so the
   * reset lands on pixel-identical content and is invisible.
   */
  itemCount: number;
};

/**
 * Drives a *continuously* scrolling (marquee-style) horizontal strip, as
 * opposed to useCarousel's discrete one-card-at-a-time snapping. It advances a
 * real scroll container by a few pixels each frame and wraps seamlessly, so it
 * inherits native touch-swipe and trackpad scrolling for free; mouse click-drag
 * is added on top (native overflow scrollers don't drag with a mouse).
 *
 * Autoplay halts — but manual scrolling/dragging stays available — while any of:
 * mouse hover, keyboard focus inside the strip, an active drag/swipe/wheel (plus
 * a brief settle after), a hidden tab, or `prefers-reduced-motion: reduce`.
 *
 * Only the container's own `scrollLeft` is ever touched — never the page — so it
 * cannot scroll the document on mount the way `scrollIntoView` did.
 */
export function useMarquee<T extends HTMLElement = HTMLDivElement>({
  speed = 32,
  itemCount,
}: MarqueeOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || itemCount <= 0) return;

    // --- pause conditions (plain locals; the rAF reads them each frame) ---
    let hover = false;
    let focus = false;
    let hidden = document.hidden;
    let interacting = false; // active drag/swipe/wheel + brief settle after
    let dragging = false; // mouse click-drag in progress
    let reduced = false;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced = rm.matches;
    const onRM = (e: MediaQueryListEvent) => {
      reduced = e.matches;
    };
    rm.addEventListener("change", onRM);

    // --- seamless wrap distance: first item of copy #2 vs first of copy #1 ---
    let wrapWidth = 0;
    const measure = () => {
      const kids = el.children as HTMLCollectionOf<HTMLElement>;
      if (kids.length > itemCount) wrapWidth = kids[itemCount].offsetLeft - kids[0].offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const wrap = () => {
      if (wrapWidth <= 0) return;
      if (el.scrollLeft >= wrapWidth) el.scrollLeft -= wrapWidth;
      else if (el.scrollLeft < 0) el.scrollLeft += wrapWidth;
    };

    // --- continuous drift ---
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000; // clamp long gaps (tab switch)
      last = now;
      if (!hover && !focus && !hidden && !interacting && !dragging && !reduced) {
        el.scrollLeft += speed * dt;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Keep it seamless during native (touch/trackpad) scrolling too.
    const onScroll = () => {
      if (!dragging) wrap();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // --- pause: mouse hover, focus-within, hidden tab ---
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hover = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hover = false;
    };
    const onFocusIn = () => {
      focus = true;
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!e.relatedTarget || !el.contains(e.relatedTarget as Node)) focus = false;
    };
    const onVis = () => {
      hidden = document.hidden;
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVis);

    // --- interaction settle: touch-swipe / wheel pause drift for a beat ---
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const settle = (ms: number) => {
      interacting = true;
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        interacting = false;
      }, ms);
    };
    const onTouchOrWheel = () => settle(700);
    el.addEventListener("touchstart", onTouchOrWheel, { passive: true });
    el.addEventListener("touchmove", onTouchOrWheel, { passive: true });
    el.addEventListener("wheel", onTouchOrWheel, { passive: true });

    // --- mouse click-drag to scroll (touch uses native scrolling) ---
    let prevX = 0;
    let moved = 0;
    let suppressClick = false;
    const onPointerDown = (e: PointerEvent) => {
      suppressClick = false; // every fresh press starts click-able
      if (e.pointerType === "touch") return;
      dragging = true;
      moved = 0;
      prevX = e.clientX;
      el.setPointerCapture(e.pointerId);
      // Inline style (not a Tailwind class): hooks/ isn't in the Tailwind
      // content globs, so a `cursor-grabbing` class here would never be emitted.
      // Clearing it on release falls back to the element's `cursor-grab` class.
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - prevX;
      prevX = e.clientX;
      moved += Math.abs(dx);
      el.scrollLeft -= dx;
      wrap();
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      settle(500); // don't snap back to drift the instant the mouse lifts
      if (moved > 6) suppressClick = true; // a real drag must not open a link
    };
    // Capture phase so it beats the link/button before navigation happens.
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    };
    // Stop native image/link ghost-dragging from hijacking a mouse drag.
    const onDragStart = (e: Event) => e.preventDefault();
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(raf);
      rm.removeEventListener("change", onRM);
      ro.disconnect();
      if (settleTimer) clearTimeout(settleTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("touchstart", onTouchOrWheel);
      el.removeEventListener("touchmove", onTouchOrWheel);
      el.removeEventListener("wheel", onTouchOrWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [speed, itemCount]);

  return { containerRef };
}

export default useMarquee;
