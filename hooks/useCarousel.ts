"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Carousel<T extends HTMLElement> = {
  containerRef: React.RefObject<T>;
  /** Index of the card currently snapped to the left edge. */
  activeIndex: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  /** Scroll exactly one card in either direction. */
  scrollByCard: (direction: "left" | "right") => void;
  scrollToIndex: (index: number) => void;
};

/**
 * Drives a horizontal snap-scrolling carousel: tracks which card is active and
 * whether either edge is reached, and scrolls by exactly one card.
 *
 * The step is measured from the DOM (the distance between two consecutive
 * children), so it stays correct regardless of card width or gap — the previous
 * inline version hard-coded the gap per breakpoint and silently drifted if the
 * spacing classes changed.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(): Carousel<T> {
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

  return { containerRef, activeIndex, canScrollLeft, canScrollRight, scrollByCard, scrollToIndex };
}
