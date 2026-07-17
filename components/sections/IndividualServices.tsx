"use client";

import { useCarousel } from "@/hooks/useCarousel";
import { individualServices } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { gradient } from "@/lib/palette";
import { useCart } from "@/providers/CartProvider";

export function IndividualServices() {
  const { addToCart } = useCart();
  const { containerRef, activeIndex, canScrollLeft, canScrollRight, scrollByCard, scrollToIndex } =
    useCarousel<HTMLDivElement>();

  return (
    <section id="individual-services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading
          title="Need just one thing? Pick a service."
          description="Every service is a clear, fixed offer — you always see the price, the delivery time and exactly what's included before you decide."
        />

        <div className="relative mt-14">
          {/* Navigation Arrow - Left */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous packages"
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
              {individualServices.map((s, i) => (
                <StaggerItem
                  key={s.title}
                  className="w-[calc((100%-12px)/1.15)] md:w-[calc((100%-24px)/2.25)] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start h-auto"
                >
                  <article className="card card-hover group flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-glow ${gradient(i)}`}>
                        <Icon name={s.icon as IconName} size={22} strokeWidth={1.7} />
                      </span>
                      <div className="text-right">
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

                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-ink-2 flex-1">{s.desc}</p>

                    <div className="my-5 h-px bg-line" />

                    <ul className="mb-6 flex flex-col gap-2">
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
            aria-label="Next packages"
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
              aria-label={`Go to service package ${index + 1}`}
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
