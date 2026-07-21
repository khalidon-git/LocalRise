"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// A finite, reliable scroll-snap carousel. Native horizontal scroll gives real
// touch-swipe on mobile for free; on tablet/desktop, accessible prev/next
// buttons page through one card at a time and disable at the ends. No autoplay,
// no dependency (this replaced a Swiper marquee that appeared frozen/inert on
// desktop). Respects prefers-reduced-motion via the programmatic scroll behavior.
type Variant = "service" | "concept";

// Card basis per breakpoint: always peek the next card on mobile, ~2 on tablet,
// ~3 (service) / ~2.3 (concept) on desktop.
const slideWidth: Record<Variant, string> = {
  service: "w-[86%] sm:w-[47%] lg:w-[31.5%]",
  concept: "w-[86%] sm:w-[46%] lg:w-[42%]",
};

type RunningCarouselProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  variant?: Variant;
};

export function RunningCarousel<T>({
  items,
  getKey,
  renderItem,
  variant = "service",
}: RunningCarouselProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.85;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full " +
    "border border-line-2 bg-white text-ink shadow-lg transition duration-200 ease-premium " +
    "hover:border-accent hover:bg-accent hover:text-white " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
    "active:scale-95 disabled:opacity-40 disabled:shadow-none " +
    "disabled:hover:border-line-2 disabled:hover:bg-white disabled:hover:text-ink sm:grid";

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 sm:gap-5 lg:gap-6"
      >
        {items.map((item) => (
          <div
            key={getKey(item)}
            className={cx("flex-none snap-start", slideWidth[variant])}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => page(-1)}
        disabled={atStart}
        className={cx(arrow, "left-1 lg:-left-2")}
      >
        <Icon name="arrow-right" size={18} strokeWidth={1.8} className="rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => page(1)}
        disabled={atEnd}
        className={cx(arrow, "right-1 lg:-right-2")}
      >
        <Icon name="arrow-right" size={18} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export default RunningCarousel;
