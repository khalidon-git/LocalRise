"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { industries, concepts, type Industry } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ConceptMock } from "@/components/concepts/ConceptMock";
import { ConceptPhone } from "@/components/concepts/ConceptPhone";
import { cx } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Merged with the old Concepts teaser (formerly two sections doing the same
// job — pick an industry, see what we'd build). The panel now shows the real
// per-industry concept mock instead of a generic decorative graphic; see
// docs/content.md and the note below on the coverage gap.
//
// Only 4 of the 9 industries here have a matching concept today — the other
// six concepts (Forge Performance, Maison Rilé, Atelier Norlind, Kessler
// Bright, Flowstack, Golden Hour) cover industries this list doesn't include
// at all (gym, fashion, interior design, architecture, SaaS, wedding
// photography) and aren't reachable from this section. They're still fully
// browsable at /concepts. Unmatched industries show a "Concept coming soon"
// state rather than a fabricated screenshot — see ComingSoonMock below.
const conceptSlugByIndustry: Record<string, string> = {
  "Doctors & Clinics": "meridian-dental",
  "Restaurants & Cafés": "noir-and-vine",
  "Hotels & Stays": "casa-alma",
  "Real Estate": "ashford-vale",
};

export function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];
  const matchedConcept = concepts.find((c) => c.slug === conceptSlugByIndustry[current.name]);

  return (
    <section id="concepts" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built around your kind of business"
          description="We understand what customers look for in your field — and design your online presence to bring them in. Here's real concept work, not a stock illustration."
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
                  id={`industry-tab-${i}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="industry-panel"
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
          <div
            id="industry-panel"
            role="tabpanel"
            aria-labelledby={`industry-tab-${active}`}
            className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease }}
                className="relative"
              >
                {/* Screenshot — the visual anchor. Real concept mock when we
                    have one, an honest "coming soon" frame when we don't. */}
                <div className="relative mx-auto max-w-[560px]">
                  {matchedConcept ? (
                    <>
                      <ConceptMock concept={matchedConcept} />
                      <ConceptPhone
                        concept={matchedConcept}
                        className="absolute -bottom-5 -right-4 hidden w-[110px] shrink-0 sm:block"
                      />
                    </>
                  ) : (
                    <ComingSoonMock industry={current} />
                  )}
                </div>

                {/* Supporting copy — smaller, secondary to the screenshot above */}
                <div className={cx("flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between", matchedConcept ? "mt-10 sm:mt-14" : "mt-8")}>
                  <div className="max-w-md">
                    <span className={cx("grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", current.accent)}>
                      <Icon name={current.icon as IconName} size={20} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-display text-heading-3 font-semibold text-ink">{current.name}</h3>
                    <p className="mt-2 text-body text-ink-2">{current.line}</p>
                  </div>

                  {matchedConcept && (
                    <div className="flex shrink-0 flex-wrap gap-2.5">
                      <Button href={`/concepts/${matchedConcept.slug}/live`} size="md" variant="dark" icon="browser">
                        Live Preview
                      </Button>
                      <Button href="/#contact" size="md" variant="secondary">
                        Build Something Similar
                      </Button>
                    </div>
                  )}
                </div>

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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Honest placeholder for industries without a built concept yet — keeps the
// browser-chrome language of ConceptMock (so the panel doesn't jump styles
// between states) but never fabricates content inside it.
function ComingSoonMock({ industry }: { industry: Industry }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded bg-bg-subtle px-2 py-0.5 text-[9px] text-ink-3">
          coming soon
        </span>
      </div>
      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 border-2 border-dashed border-line-2 bg-bg-subtle p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-accent shadow-sm">
          <Icon name={industry.icon as IconName} size={22} strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-body-sm font-semibold text-ink">Concept coming soon</p>
          <p className="mx-auto mt-1 max-w-[240px] text-[13px] text-ink-3">
            We haven&apos;t designed a {industry.name.toLowerCase()} concept yet — yours could be the first.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Industries;
