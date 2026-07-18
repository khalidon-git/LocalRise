"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Package } from "@/lib/content";
import { formatINR, cx } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { startConversation } from "@/lib/communication";

export function PackageCard({ pkg }: { pkg: Package }) {
  const [open, setOpen] = useState<number | null>(null);
  const best = pkg.best;

  return (
    <div
      className={cx(
        "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 ease-premium",
        best
          ? "border-accent/30 bg-white shadow-xl ring-1 ring-accent/20 lg:-translate-y-4"
          : "card card-hover",
      )}
    >
      {best && (
        <>
          <div className="absolute inset-x-0 -top-px h-1 rounded-t-2xl accent-gradient" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
            Most Popular
          </span>
        </>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-ink">{pkg.name}</h3>
        <span className="chip !py-1 text-[12px]">
          <Icon name="clock" size={13} className="text-accent" />
          {pkg.delivery.replace("Ready in ", "")}
        </span>
      </div>
      <p className="mt-1.5 text-body-sm text-ink-2">{pkg.tagline}</p>

      <div className="mt-6 flex items-end gap-1.5">
        <span className={cx("font-display text-4xl font-semibold tracking-tight", best ? "text-accent" : "text-ink")}>
          {formatINR(pkg.price)}
        </span>
        <span className="mb-1 text-body-sm text-ink-3">{pkg.priceNote}</span>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          onClick={() =>
            startConversation({
              channel: "whatsapp",
              type: "package",
              packageName: pkg.name,
              price: pkg.price,
              meta: { section: "packages", button: pkg.id },
            })
          }
          variant={best ? "primary" : "secondary"}
          size="lg"
          arrow
          className="w-full"
        >
          {pkg.cta}
        </Button>
      </div>

      <div className="my-6 h-px bg-line" />

      <ul className="flex flex-1 flex-col gap-1">
        {pkg.features.map((f, i) => {
          const hasHint = Boolean(f.hint);
          const isOpen = open === i;
          return (
            <li key={i} className="rounded-lg">
              <button
                type="button"
                disabled={!hasHint}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cx(
                  "flex w-full items-start gap-3 rounded-lg px-1.5 py-1.5 text-left transition-colors",
                  hasHint && "hover:bg-bg-subtle",
                )}
                aria-expanded={hasHint ? isOpen : undefined}
              >
                <span
                  className={cx(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                    best ? "bg-accent text-white" : "bg-accent-tint text-accent",
                  )}
                >
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </span>
                <span className="flex-1 text-body-sm font-medium text-ink">{f.text}</span>
                {hasHint && (
                  <Icon
                    name="plus"
                    size={15}
                    strokeWidth={2}
                    className={cx("mt-0.5 shrink-0 text-ink-3 transition-transform duration-300", isOpen && "rotate-45")}
                  />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && f.hint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-1.5 pb-2 pl-9 text-[13px] leading-relaxed text-ink-2">{f.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PackageCard;
