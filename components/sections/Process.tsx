"use client";

import { motion, useReducedMotion } from "framer-motion";
import { process } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function Node({ step }: { step: (typeof process)[number] }) {
  return (
    <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-white shadow-sm transition-all duration-500 ease-premium group-hover:border-accent/40 group-hover:shadow-glow sm:h-16 sm:w-16">
      <Icon name={step.icon as IconName} size={24} strokeWidth={1.7} className="text-accent" />
      <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">
        {step.n}
      </span>
    </div>
  );
}

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="section-pad">
      <div className="container-x">
        <SectionHeading
          title="A clear path from idea to launch"
          description="No confusion, no jargon. You always know exactly what's happening and what comes next."
        />

        {/* Desktop: horizontal infographic timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* connector line (draws in on scroll), inset to sit between the first and last node centres */}
          <div className="absolute left-[8.33%] right-[8.33%] top-8 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <motion.div
              className="h-full origin-left accent-gradient"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease }}
            />
          </div>
          <ol className="relative grid grid-cols-6 gap-4">
            {process.map((step, i) => (
              <motion.li
                key={step.n}
                initial={reduce ? undefined : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, ease, delay: 0.15 + i * 0.12 }}
                className="group flex flex-col items-center text-center"
              >
                <Node step={step} />
                <div className="mt-5 h-full w-full rounded-2xl border border-line bg-white p-4 shadow-xs transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative mx-auto mt-14 max-w-3xl lg:hidden">
          <div
            className="absolute bottom-6 left-[27px] top-4 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent sm:left-[31px]"
            aria-hidden="true"
          />
          <ol className="space-y-4">
            {process.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 0.05}>
                  <div className="group relative flex items-start gap-5 sm:gap-6">
                    <Node step={step} />
                    <div className="flex-1 rounded-2xl border border-line bg-white p-5 shadow-xs transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:shadow-md sm:p-6">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-body-sm text-ink-2">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Process;
