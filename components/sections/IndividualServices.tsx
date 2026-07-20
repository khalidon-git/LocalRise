"use client";

import { homepageServices } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { RunningCarousel } from "@/components/ui/RunningCarousel";

export function IndividualServices() {
  const { addToCart } = useCart();

  return (
    <section id="services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading title="Everything your business needs online." />

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <RunningCarousel
            items={homepageServices}
            getKey={(s) => s.title}
            variant="service"
            renderItem={(s) => (
              <article className="card-standard group flex h-full flex-col p-0">
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
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default IndividualServices;
