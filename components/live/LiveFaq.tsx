"use client";

import { useState } from "react";
import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function LiveFaq({ site }: { site: ConceptSite }) {
  const { faq, theme } = site;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="lv-section">
      <div className="lv-container max-w-2xl">
        <Reveal>
          <h2 className={cx("text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {faq.heading}
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-b py-4" style={{ borderColor: "var(--lv-line)" }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-[15px] font-medium text-[var(--lv-ink)]">{item.q}</span>
                  <Icon
                    name="plus"
                    size={16}
                    strokeWidth={2}
                    className={cx("shrink-0 transition-transform duration-300 ease-premium", open && "rotate-45")}
                    style={{ color: "var(--lv-brand)" }}
                  />
                </button>
                {open && <p className="mt-3 text-[14px] leading-relaxed text-[var(--lv-ink-muted)]">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LiveFaq;
