"use client";

import type { IndividualService } from "@/lib/content";
import { serviceMoreInfoHref } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

// One catalogue-service card. Shared by the homepage carousel
// (IndividualServices) and the /services/ grid so the card markup, actions and
// accessibility live in exactly one place. Two actions: "More Info" (secondary,
// links to the detail page) and "Book Now" (primary, adds to the enquiry cart —
// the existing consent-safe conversation flow, unchanged).
export function ServiceCard({ service: s }: { service: IndividualService }) {
  const { addToCart } = useCart();
  const moreInfoHref = serviceMoreInfoHref(s);

  return (
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

        <ul className="mb-5 flex flex-1 flex-col justify-center gap-2">
          {s.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-2.5 text-body-sm text-ink-2">
              <Icon name="check" size={15} strokeWidth={2.2} className="shrink-0 text-accent" />
              {inc}
            </li>
          ))}
        </ul>

        {/* Two clear actions: secondary "More Info" + primary "Book Now".
            Balanced two-column at every width; each control is >=44px tall. */}
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            href={moreInfoHref}
            variant="secondary"
            size="md"
            aria-label={`More information about ${s.title}`}
          >
            More Info
          </Button>
          <Button
            type="button"
            onClick={() => addToCart(s.title, s.price)}
            variant="primary"
            size="md"
            aria-label={`Book ${s.title}`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
