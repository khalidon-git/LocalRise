"use client";

import { useEffect, useRef } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { individualServices } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

// This is the site's one and only services listing now — it absorbed the old
// bento grid (components/sections/Services.tsx, deleted). `id="services"`
// so the existing nav "Services" link and the service-detail-page breadcrumb
// (both hard-coded to /#services) keep resolving without needing to touch
// either of those. See docs/architecture.md.
export function IndividualServices() {
  const { addToCart } = useCart();
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { containerRef, activeIndex, canScrollLeft, canScrollRight, scrollByCard, scrollToIndex } =
    useCarousel<HTMLDivElement>();

  useEffect(() => {
    indicatorRefs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeIndex]);

  return (
    <section id="services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading title="Everything your business needs online." />

        <div className="relative mt-6 sm:mt-8 lg:mt-10">
          {/* Navigation Arrow - Left */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous services"
            className="absolute -left-5 top-[40%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md transition-all hover:bg-bg-subtle active:scale-95 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <Icon name="arrow-right" size={20} className="rotate-180 text-ink-2" />
          </button>

          {/* Carousel Track wrapper */}
          <Stagger className="w-full">
            <div
              ref={containerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-6 sm:gap-5 lg:gap-6"
            >
              {individualServices.map((s) => (
                <StaggerItem
                  key={s.title}
                  className="h-auto basis-[86%] shrink-0 snap-start sm:basis-[44%] lg:basis-[calc(33.333%_-_1rem)]"
                >
                  <article className="card-standard group flex h-full flex-col p-0">
                    {/* Visual banner — the card's visual anchor, not an icon chip.
                        overflow-hidden + rounding live here (the media frame),
                        not on the outer article, so long card copy below is
                        never at risk of being clipped by the card boundary. */}
                    <div className="card-media shrink-0 rounded-t-2xl">
                      <ServiceVisual kind={s.visual} accent={s.accent} />
                      <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-ink shadow-md backdrop-blur">
                        <Icon name={s.icon as IconName} size={18} strokeWidth={1.8} />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-[var(--card-pad)]">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                          {s.title}
                        </h3>
                        <div className="shrink-0 text-right">
                          <div className="font-display text-lg font-semibold text-ink">
                            {s.priceNote === "starting" && (
                              <span className="mr-1 text-label font-normal text-ink-3">from</span>
                            )}
                            {formatINR(s.price)}
                          </div>
                          <span className="mt-1 inline-flex items-center gap-1 text-label text-ink-3">
                            <Icon name="clock" size={12} /> {s.delivery}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-body-sm text-ink-2">{s.desc}</p>

                      <div className="my-4 h-px bg-line" />

                      <ul className="mb-4 flex flex-1 flex-col justify-center gap-2">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex items-center gap-2.5 text-body-sm text-ink-2">
                            <Icon
                              name="check"
                              size={15}
                              strokeWidth={2.2}
                              className="shrink-0 text-accent"
                            />
                            {inc}
                          </li>
                        ))}
                      </ul>

                      <Button
                        type="button"
                        onClick={() => addToCart(s.title, s.price)}
                        variant="secondary"
                        arrow
                        className="w-full border-line-2 text-ink hover:bg-accent hover:text-white hover:border-accent active:scale-95 group-hover:shadow-md transition-all duration-300"
                      >
                        Book Now
                      </Button>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </div>
          </Stagger>

          {/* Navigation Arrow - Right */}
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next services"
            className="absolute -right-5 top-[40%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md transition-all hover:bg-bg-subtle active:scale-95 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <Icon name="arrow-right" size={20} className="text-ink-2" />
          </button>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="no-scrollbar mt-5 flex max-w-full items-center justify-start gap-2 overflow-x-auto px-1 sm:mt-6 sm:justify-center">
          {individualServices.map((_, index) => (
            <button
              key={index}
              ref={(node) => {
                indicatorRefs.current[index] = node;
              }}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to service ${index + 1}`}
              className={`grid min-h-11 min-w-11 shrink-0 place-items-center rounded-full before:block before:h-2 before:w-8 before:origin-center before:rounded-full before:transition-[transform,background-color] before:duration-300 ${
                activeIndex === index
                  ? "before:scale-x-100 before:bg-accent"
                  : "before:scale-x-25 before:bg-line-2 hover:before:bg-ink-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndividualServices;
