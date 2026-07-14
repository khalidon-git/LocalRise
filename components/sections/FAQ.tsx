"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, brand } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                FAQ
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-heading-1 font-semibold text-ink">
                Questions? Answered simply.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-body-lg text-ink-2">
                No jargon — just straight answers. Still unsure about something? We&apos;re a message away.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6">
                <Button href={`https://wa.me/${brand.whatsappHref}`} variant="whatsapp" icon="whatsapp" size="lg">
                  Ask us on WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <div className="divide-y divide-line rounded-2xl border border-line bg-white px-5 shadow-xs sm:px-7">
            {faqs.map((f, i) => {
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
        </div>
      </div>
    </section>
  );
}

export default FAQ;
