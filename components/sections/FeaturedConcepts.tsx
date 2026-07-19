"use client";

import { useEffect, useRef } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import type { Concept } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { ScreenshotMock } from "@/components/concepts/ScreenshotMock";
import { ScreenshotPhone } from "@/components/concepts/ScreenshotPhone";
import { SmartLink } from "@/components/ui/SmartLink";
import { cx } from "@/lib/utils";

// Curated homepage teaser — two real concepts, not the full ten. The complete
// library lives at /concepts/ (ConceptCard grid); this section's only job is
// to prove the craft fast and point people there. Replaces the old
// industry-selector panel (Industries.tsx), which put all ten behind a tab UI.
//
// The two concepts are resolved on the *server* (app/page.tsx) and passed in as
// `featured`. This is deliberate: this is a client component (autoplay
// carousel), so importing the full `concepts` data array here would bundle all
// ten concepts' prose into the homepage's client JS — the LCP-critical route —
// even though only two ever render. (The slug list lives in page.tsx, not here:
// data exported from a "use client" module becomes a client-reference proxy and
// can't be mapped on the server.)
const iconBySlug: Record<string, IconName> = {
  "noir-and-vine": "utensils",
  "meridian-dental": "stethoscope",
  "casa-alma": "bed",
};

// "use client" (and useCarousel) here for the same reason as
// IndividualServices: it's a horizontally snap-scrolling, autoplaying
// carousel now, not a static grid — see docs/hooks.md.
export function FeaturedConcepts({ featured }: { featured: Concept[] }) {
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { containerRef, activeIndex, canScrollLeft, canScrollRight, scrollByCard, scrollToIndex } =
    useCarousel<HTMLDivElement>({ autoplay: true, intervalMs: 6000 });

  useEffect(() => {
    indicatorRefs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeIndex]);

  return (
    <section id="concepts" className="section-pad overflow-hidden bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built for your business."
          description="Real concepts for different industries."
        />

        <div className="relative mt-6 sm:mt-8 lg:mt-10">
          {/* Navigation Arrow - Left */}
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous concept"
            className="absolute -left-5 top-[40%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md transition-all hover:bg-bg-subtle active:scale-95 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <Icon name="arrow-right" size={20} className="rotate-180 text-ink-2" />
          </button>

          {/* Carousel Track — one concept prominent, a peek of the next on
              wider screens (basis-* below 100%), same snap-scroll mechanics
              as IndividualServices. */}
          <Stagger amount={0.15} className="w-full">
            <div
              ref={containerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-6 sm:gap-5 lg:gap-6"
            >
              {featured.map((concept) => {
                const liveHref = `/concepts/${concept.slug}/live`;
                const icon = iconBySlug[concept.slug];

                return (
                  <StaggerItem
                    key={concept.slug}
                    className="h-auto basis-[86%] shrink-0 snap-start sm:basis-[78%] lg:basis-[72%]"
                  >
                    {/* No overflow-hidden on the card or the screenshot link:
                        the phone mockup deliberately overhangs the
                        screenshot's corner, and clipping it here was cutting
                        it off. Rounding/clipping for the screenshot image
                        itself lives inside ScreenshotMock, the actual media
                        frame. */}
                    <article className="card group flex h-full flex-col p-3 sm:p-4">
                      <SmartLink href={liveHref} className="relative block" aria-label={`Open the ${concept.name} live preview`}>
                        <div className="relative transition-transform duration-700 ease-premium group-hover:scale-[1.015]">
                          {/* No `priority` here on purpose: this section is the
                              last on the homepage (well below the fold), so
                              eager-loading its ~125 kB of screenshots would
                              compete with the hero for the initial network
                              window and hurt LCP. Lazy is the right default at
                              this scroll position — pass `priority` only where a
                              slide is actually above/near the fold. */}
                          <ScreenshotMock concept={concept} />
                          <ScreenshotPhone
                            concept={concept}
                            className="absolute -bottom-5 -right-3 hidden w-24 shrink-0 sm:block lg:w-28"
                          />
                        </div>
                      </SmartLink>

                      <div className="flex flex-1 flex-col p-3 pt-6 sm:p-4 sm:pt-7">
                        <div className="flex items-center gap-3">
                          <span className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", concept.identity.gradient)}>
                            <Icon name={icon} size={20} strokeWidth={1.7} />
                          </span>
                          <span className="text-label font-semibold uppercase tracking-wider text-accent">
                            {concept.industry}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-heading-3 font-semibold text-ink">{concept.name}</h3>
                        <p className="mt-2 text-body text-ink-2">{concept.summary}</p>

                        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          <Button href={liveHref} size="md" variant="dark" icon="browser" className="w-full">
                            Live Preview
                          </Button>
                          <ConversationButton
                            start={{
                              channel: "whatsapp",
                              type: "concept",
                              conceptName: concept.name,
                              meta: { section: "featured-concepts", button: concept.slug },
                            }}
                            size="md"
                            variant="secondary"
                            className="w-full"
                          >
                            Build Something Similar
                          </ConversationButton>
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </div>
          </Stagger>

          {/* Navigation Arrow - Right */}
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next concept"
            className="absolute -right-5 top-[40%] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-md transition-all hover:bg-bg-subtle active:scale-95 disabled:pointer-events-none disabled:opacity-0 lg:flex"
          >
            <Icon name="arrow-right" size={20} className="text-ink-2" />
          </button>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="no-scrollbar mt-5 flex max-w-full items-center justify-center gap-2 overflow-x-auto px-1 sm:mt-6">
          {featured.map((concept, index) => (
            <button
              key={concept.slug}
              ref={(node) => {
                indicatorRefs.current[index] = node;
              }}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`View ${concept.name}`}
              className={cx(
                "grid min-h-11 min-w-11 shrink-0 place-items-center rounded-full before:block before:h-2 before:w-8 before:origin-center before:rounded-full before:transition-[transform,background-color] before:duration-300",
                activeIndex === index
                  ? "before:scale-x-100 before:bg-accent"
                  : "before:scale-x-25 before:bg-ink-4 hover:before:bg-ink-3",
              )}
            />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6 flex justify-center sm:mt-8">
          <Button href="/concepts" variant="secondary" size="lg" arrow>
            Explore All 10 Concepts
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default FeaturedConcepts;
