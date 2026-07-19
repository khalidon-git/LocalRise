"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { concepts } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScreenshotMock } from "@/components/concepts/ScreenshotMock";
import { ScreenshotPhone } from "@/components/concepts/ScreenshotPhone";
import { SmartLink } from "@/components/ui/SmartLink";
import { cx } from "@/lib/utils";
import { startConversation } from "@/lib/communication";

const ease = [0.22, 1, 0.36, 1] as const;

// Merged with the old Concepts teaser — pick a category, see what we'd build.
// Driven directly by the ten `concepts`, not a separate industries list: every
// entry here is guaranteed to have a real concept and a real screenshot, no
// "coming soon" placeholder needed. (An earlier version mapped concepts onto
// the pre-existing 9-category `industries` list used by ContactForm.tsx's
// business-type dropdown — that only covered 4 of 10 concepts and showed a
// placeholder for the rest. Driving the list from `concepts` itself removes
// the mismatch entirely.)
const iconBySlug: Record<string, IconName> = {
  "noir-and-vine": "utensils",
  "meridian-dental": "stethoscope",
  "casa-alma": "bed",
  "ashford-vale": "home",
  "forge-performance": "dumbbell",
  "maison-rile": "shirt",
  "atelier-norlind": "sofa",
  "kessler-bright": "building",
  flowstack: "chart",
  "golden-hour": "camera",
};

export function Industries() {
  const [active, setActive] = useState(0);
  const current = concepts[active];
  const icon = iconBySlug[current.slug];

  const selectTabFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = concepts.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? (index + 1) % concepts.length
            : event.key === "ArrowLeft" || event.key === "ArrowUp"
              ? (index - 1 + concepts.length) % concepts.length
              : null;

    if (nextIndex === null) return;
    event.preventDefault();
    setActive(nextIndex);
    document.getElementById(`industry-tab-${nextIndex}`)?.focus();
  };

  return (
    <section id="concepts" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built around your kind of business"
          description="We understand what customers look for in your field — and design your online presence to bring them in. Real screenshots of real concept sites, not stock illustrations."
        />

        <div className="mt-5 flex justify-center">
          <SmartLink
            href="/concepts"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-accent"
          >
            Browse all {concepts.length} concepts
            <Icon name="arrow-right" size={16} strokeWidth={2} />
          </SmartLink>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:gap-6 lg:mt-14">
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Concept industries"
            className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {concepts.map((c, i) => {
              const selected = i === active;
              return (
                <button
                  key={c.slug}
                  id={`industry-tab-${i}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="industry-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => selectTabFromKeyboard(event, i)}
                  className={cx(
                    "group flex min-h-12 shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ease-premium",
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
                    <Icon name={iconBySlug[c.slug]} size={18} strokeWidth={1.8} />
                  </span>
                  <span className={cx("whitespace-nowrap text-body-sm font-semibold lg:whitespace-normal", selected ? "text-ink" : "text-ink-2")}>
                    {c.industry}
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
            className="relative overflow-hidden rounded-2xl border border-line bg-white p-[var(--card-pad)] shadow-sm sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                className="relative"
              >
                {/* Real screenshot — the visual anchor */}
                <div className="relative mx-auto max-w-media">
                  <ScreenshotMock concept={current} />
                  <ScreenshotPhone concept={current} className="absolute -bottom-5 -right-3 hidden w-24 shrink-0 sm:block lg:w-28" />
                </div>

                {/* Supporting copy — smaller, secondary to the screenshot above */}
                <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-start sm:justify-between lg:mt-12">
                  <div className="max-w-md">
                    <span className={cx("grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", current.identity.gradient)}>
                      <Icon name={icon} size={20} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-display text-heading-3 font-semibold text-ink">{current.industry}</h3>
                    <p className="mt-2 text-body text-ink-2">{current.summary}</p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <Button href={`/concepts/${current.slug}/live`} size="md" variant="dark" icon="browser">
                      Live Preview
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        startConversation({
                          channel: "whatsapp",
                          type: "industry",
                          industryName: current.industry,
                          conceptName: current.name,
                          meta: { section: "industries", button: current.slug },
                        })
                      }
                      size="md"
                      variant="secondary"
                    >
                      Build Something Similar
                    </Button>
                  </div>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {current.features.slice(0, 3).map((f) => (
                    <li key={f} className="card-feature rounded-xl bg-bg-subtle p-4">
                      <Icon name="check" size={18} strokeWidth={2.2} className="text-accent" />
                      <p className="mt-2 text-body-sm font-medium text-ink">{f}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <Button href="/contact" arrow>
                    Grow my business
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

export default Industries;
