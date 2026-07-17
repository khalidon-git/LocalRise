"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// Same accordion look/behaviour as the homepage FAQ section, but driven by a
// passed-in subset of Q&As so each service page shows only its relevant ones.
export function ServiceFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white px-5 shadow-xs sm:px-7">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <span className={cx("flex-1 font-display text-lg font-medium tracking-tight transition-colors", isOpen ? "text-accent" : "text-ink")}>
                {f.q}
              </span>
              <span
                className={cx(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-line-2 text-ink-2",
                )}
              >
                <Icon name="plus" size={16} strokeWidth={2.2} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl pb-5 pr-12 text-body text-ink-2">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceFAQ;
