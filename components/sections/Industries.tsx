"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IndustryVisual } from "@/components/illustrations/IndustryVisual";
import { cx } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section id="industries" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries"
          title="Built around your kind of business"
          description="We understand what customers look for in your field — and design your online presence to bring them in."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Industries"
            className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {industries.map((ind, i) => {
              const selected = i === active;
              return (
                <button
                  key={ind.name}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cx(
                    "group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ease-premium",
                    selected
                      ? "border-accent/30 bg-white shadow-sm"
                      : "border-transparent bg-white/50 hover:bg-white hover:shadow-xs",
                  )}
                >
                  <span
                    className={cx(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors",
                      selected ? "bg-accent text-white" : "bg-accent-tint text-accent",
                    )}
                  >
                    <Icon name={ind.icon as IconName} size={18} strokeWidth={1.8} />
                  </span>
                  <span className={cx("whitespace-nowrap text-body-sm font-semibold lg:whitespace-normal", selected ? "text-ink" : "text-ink-2")}>
                    {ind.name}
                  </span>
                  <Icon
                    name="arrow-right"
                    size={16}
                    strokeWidth={2}
                    className={cx("ml-auto hidden text-accent transition-all lg:block", selected ? "opacity-100" : "opacity-0 group-hover:opacity-40")}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-sm lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease }}
                className="relative grid h-full items-center gap-8 lg:grid-cols-[1fr_0.82fr]"
              >
                <div className="flex flex-col">
                  <span className={cx("grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glow", current.accent)}>
                    <Icon name={current.icon as IconName} size={30} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 font-display text-heading-3 font-semibold text-ink">{current.name}</h3>
                  <p className="mt-2 max-w-md text-body-lg text-ink-2">{current.line}</p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                    {current.outcomes.map((o) => (
                      <li key={o} className="rounded-xl border border-line bg-bg-subtle px-4 py-3.5">
                        <Icon name="check" size={18} strokeWidth={2.2} className="text-accent" />
                        <p className="mt-2 text-body-sm font-medium text-ink">{o}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button href="#contact" arrow>
                      Grow my {current.name.split(" ")[0].toLowerCase()} business
                    </Button>
                    <span className="text-body-sm text-ink-3">Free consultation · No obligation</span>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <IndustryVisual icon={current.icon as IconName} accent={current.accent} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Industries;
