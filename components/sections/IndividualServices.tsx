"use client";

import { useMarquee } from "@/hooks/useMarquee";
import { homepageServices } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

// This is the site's one and only services listing now — it absorbed the old
// bento grid (components/sections/Services.tsx, deleted). `id="services"`
// so the existing nav "Services" link and the service-detail-page breadcrumb
// (both hard-coded to /#services) keep resolving without needing to touch
// either of those. See docs/architecture.md.
//
// Presented as a continuously drifting marquee (useMarquee) — multiple cards on
// desktop, one-and-a-peek on mobile — with native swipe, mouse drag, and pause
// on hover/focus. The card markup and the Book Now → add-to-cart action are
// unchanged from the previous snap-carousel version.
export function IndividualServices() {
  const { addToCart } = useCart();
  const { containerRef } = useMarquee<HTMLDivElement>({ speed: 32, itemCount: homepageServices.length });

  return (
    <section id="services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading title="Everything your business needs online." />

        {/* Continuous marquee track: native touch-swipe + trackpad scroll and
            mouse drag from useMarquee, autoplay paused on hover/focus. The set
            is rendered twice for a seamless loop; pb-6 leaves room for the card
            shadow so nothing clips. */}
        <div
          ref={containerRef}
          className="no-scrollbar mt-6 flex cursor-grab select-none gap-4 overflow-x-auto px-1 pb-6 pt-2 sm:mt-8 sm:gap-5 lg:mt-10 lg:gap-6"
          role="group"
          aria-label="Services — drag or swipe to explore"
        >
          {[0, 1].map((copy) =>
            homepageServices.map((s) => (
              <div
                key={`${s.title}-${copy}`}
                className="h-auto shrink-0 basis-[85%] sm:basis-[46%] lg:basis-[31%]"
                aria-hidden={copy === 1 || undefined}
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
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

export default IndividualServices;
