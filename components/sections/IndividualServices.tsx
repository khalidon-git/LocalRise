"use client";

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
  const { containerRef, activeIndex, canScrollLeft, canScrollRight, scrollByCard, scrollToIndex } =
    useCarousel<HTMLDivElement>();

  return (
    <section id="services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading
          title="Everything your business needs to grow online"
          description="Every service is a clear, fixed offer — you always see the price, the delivery time and exactly what's included before you decide."
        />

        <div className="relative mt-14">
          {/* Navigation Arrow - Left */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous services"
            className="absolute -left-6 top-[40%] z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white shadow-md transition-all hover:bg-bg-subtle disabled:pointer-events-none disabled:opacity-0 lg:flex h-12 w-12 text-ink active:scale-95"
          >
            <Icon name="arrow-right" size={20} className="rotate-180 text-ink-2" />
          </button>

          {/* Carousel Track wrapper */}
          <Stagger className="w-full">
            <div
              ref={containerRef}
              className="no-scrollbar flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-1"
            >
              {individualServices.map((s) => (
                <StaggerItem
                  key={s.title}
                  className="w-[calc((100%-12px)/1.15)] md:w-[calc((100%-24px)/2.25)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start h-auto"
                >
                  <article className="card card-hover group flex h-full flex-col overflow-hidden p-0">
                    {/* Visual banner — the card's visual anchor, not an icon chip */}
                    <div className="relative aspect-[16/10] w-full shrink-0">
                      <ServiceVisual kind={s.visual} accent={s.accent} />
                      <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-ink shadow-md backdrop-blur">
                        <Icon name={s.icon as IconName} size={18} strokeWidth={1.8} />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                          {s.title}
                        </h3>
                        <div className="shrink-0 text-right">
                          <div className="font-display text-lg font-semibold text-ink">
                            {s.priceNote === "starting" && (
                              <span className="mr-1 text-[12px] font-normal text-ink-3">from</span>
                            )}
                            {formatINR(s.price)}
                          </div>
                          <span className="mt-1 inline-flex items-center gap-1 text-[12px] text-ink-3">
                            <Icon name="clock" size={12} /> {s.delivery}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-body-sm text-ink-2">{s.desc}</p>

                      <div className="my-5 h-px bg-line" />

                      <ul className="mb-6 flex flex-1 flex-col gap-2">
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
            className="absolute -right-6 top-[40%] z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white shadow-md transition-all hover:bg-bg-subtle disabled:pointer-events-none disabled:opacity-0 lg:flex h-12 w-12 text-ink active:scale-95"
          >
            <Icon name="arrow-right" size={20} className="text-ink-2" />
          </button>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {individualServices.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to service ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-accent"
                  : "w-2 bg-line-2 hover:bg-ink-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndividualServices;
