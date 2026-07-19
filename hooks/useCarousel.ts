"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CarouselOptions = {
  /** Advance one card automatically on an interval. Off by default — opt in per carousel. */
  autoplay?: boolean;
  /** Autoplay interval in ms. Ignored when `autoplay` is false. */
  intervalMs?: number;
};

type Carousel<T extends HTMLElement> = {
  containerRef: React.RefObject<T>;
  /** Index of the card currently snapped to the left edge. */
  activeIndex: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  /** Scroll exactly one card in either direction. */
  scrollByCard: (direction: "left" | "right") => void;
  scrollToIndex: (index: number) => void;
  /** True while autoplay is suspended, for any reason (see the hook doc). */
  isAutoplayPaused: boolean;
  /** Manually suspend autoplay — independent of the automatic pause triggers. */
  pause: () => void;
  /** Release a manual `pause()`. Autoplay still won't run while an automatic
   * trigger (hover, focus, active interaction, hidden tab, reduced motion)
   * is in effect. */
  resume: () => void;
};

/**
 * Drives a horizontal snap-scrolling carousel: tracks which card is active and
 * whether either edge is reached, scrolls by exactly one card, and — opt-in via
 * `autoplay` — advances on a timer.
 *
 * The step is measured from the DOM (the distance between two consecutive
 * children), so it stays correct regardless of card width or gap — the previous
 * inline version hard-coded the gap per breakpoint and silently drifted if the
 * spacing classes changed.
 *
 * Autoplay pauses automatically on pointer hover, keyboard focus inside the
 * container, active touch/wheel/drag interaction, and a hidden browser tab —
 * all wired to `containerRef` internally, so a consumer only has to pass
 * `autoplay: true` and render the returned `containerRef`. It never starts at
 * all under `prefers-reduced-motion: reduce`.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(
  options: CarouselOptions = {},
): Carousel<T> {
  const { autoplay = false, intervalMs = 5000 } = options;

  const containerRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sync = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    if (children.length) {
      const left = el.getBoundingClientRect().left;
      let closest = 0;
      let min = Infinity;
      children.forEach((child, i) => {
        const diff = Math.abs(child.getBoundingClientRect().left - left);
        if (diff < min) {
          min = diff;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }

    setCanScrollLeft(el.scrollLeft > 5);
    // Small buffer for fractional/rounded pixel widths.
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  /** Distance from one card to the next (width + gap), measured live. */
  const step = () => {
    const el = containerRef.current;
    if (!el) return 0;
    const children = el.children as HTMLCollectionOf<HTMLElement>;
    if (children.length > 1) return children[1].offsetLeft - children[0].offsetLeft;
    return children[0]?.clientWidth ?? 0;
  };

  const scrollByCard = useCallback((direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = step();
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = containerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  // ---------------------------------------------------------------------
  // Autoplay — every trigger below folds into one isAutoplayPaused flag.
  // Each is a separate boolean (not one shared counter) so any single
  // source releasing its own hold can't accidentally clear another's.
  // ---------------------------------------------------------------------
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const pause = useCallback(() => setManuallyPaused(true), []);
  const resume = useCallback(() => setManuallyPaused(false), []);

  // prefers-reduced-motion — autoplay must never start for these visitors.
  useEffect(() => {
    if (!autoplay) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [autoplay]);

  // Hidden tab — autoplay wastes cycles animating something nobody sees.
  useEffect(() => {
    if (!autoplay) return;
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [autoplay]);

  // Hover, focus-within, and active interaction — all scoped to the
  // container itself so the consuming component doesn't wire any of this.
  useEffect(() => {
    const el = containerRef.current;
    if (!autoplay || !el) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleIdleResume = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setInteracting(false), 1200);
    };

    // Mouse/pen hover only — touch devices don't have real hover, and
    // treating a tap as "hover forever" would stall autoplay for them.
    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setHoverPaused(true);
    };
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setHoverPaused(false);
    };

    const onFocusIn = () => setFocusPaused(true);
    const onFocusOut = (e: FocusEvent) => {
      // Only clear once focus has actually left the container (not moved
      // from one card's button to the next one inside it).
      if (!e.relatedTarget || !el.contains(e.relatedTarget as Node)) {
        setFocusPaused(false);
      }
    };

    // Drag/touch-swipe start and trackpad/wheel scrolling both count as
    // "the visitor is interacting" — resume only after a short idle beat,
    // not the instant they let go, so autoplay doesn't fight a scroll that
    // just ended. `wheel`/`pointerdown`/`touchstart` are real user-input
    // events; the container's own `scroll` event (which also fires for our
    // own smooth-scrollBy calls) is deliberately not used here, or
    // autoplay would pause itself on every automatic advance.
    //
    // onInteractionStart also arms the idle-resume timer itself, not just
    // onInteractionSettling: a mouse pointerdown that starts on the
    // container but releases outside it never fires this container's
    // pointerup/pointercancel, and without this fallback `interacting`
    // would stay stuck true — permanently pausing autoplay. Continuous
    // interaction still keeps it paused, since every further start/settle
    // event just clears and reschedules the same timer.
    const onInteractionStart = () => {
      setInteracting(true);
      scheduleIdleResume();
    };
    const onInteractionSettling = () => scheduleIdleResume();

    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("pointerdown", onInteractionStart, { passive: true });
    el.addEventListener("touchstart", onInteractionStart, { passive: true });
    el.addEventListener("wheel", onInteractionStart, { passive: true });
    el.addEventListener("pointerup", onInteractionSettling, { passive: true });
    el.addEventListener("pointercancel", onInteractionSettling, { passive: true });
    el.addEventListener("touchend", onInteractionSettling, { passive: true });
    el.addEventListener("touchcancel", onInteractionSettling, { passive: true });
    el.addEventListener("wheel", onInteractionSettling, { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("pointerdown", onInteractionStart);
      el.removeEventListener("touchstart", onInteractionStart);
      el.removeEventListener("wheel", onInteractionStart);
      el.removeEventListener("pointerup", onInteractionSettling);
      el.removeEventListener("pointercancel", onInteractionSettling);
      el.removeEventListener("touchend", onInteractionSettling);
      el.removeEventListener("touchcancel", onInteractionSettling);
      el.removeEventListener("wheel", onInteractionSettling);
    };
  }, [autoplay]);

  const isAutoplayPaused =
    manuallyPaused || hoverPaused || focusPaused || interacting || tabHidden || reducedMotion;

  // The one timer: cleared and re-created whenever any pause condition
  // flips, so there's never more than one interval alive per carousel.
  useEffect(() => {
    if (!autoplay || isAutoplayPaused) return;
    const id = setInterval(() => {
      const el = containerRef.current;
      if (!el || !el.children.length) return;
      // Read the DOM fresh rather than trusting activeIndex/canScrollRight
      // state, which can be one tick stale inside a setInterval closure.
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) {
        scrollToIndex(0);
      } else {
        scrollByCard("right");
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, isAutoplayPaused, intervalMs, scrollByCard, scrollToIndex]);

  return {
    containerRef,
    activeIndex,
    canScrollLeft,
    canScrollRight,
    scrollByCard,
    scrollToIndex,
    isAutoplayPaused,
    pause,
    resume,
  };
}
