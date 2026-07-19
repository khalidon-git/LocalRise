"use client";

import { motion, type Variants } from "framer-motion";
import { HeroVideo } from "@/components/illustrations/HeroVideo";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { brand } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const quickPoints = ["Free consultation", "Ready in days", "No hidden charges"];

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[min(46rem,100svh)] overflow-hidden bg-bg-subtle">
      {/* Full-bleed background: the shop-to-city clip plays behind the whole
          section, not beside it. HeroVideo's own "bg" scrim keeps the
          overlaid heading/CTAs legible — see components/illustrations/HeroVideo.tsx.
          mesh-hero/dotgrid (the old flat background) are dropped here: they'd
          be fully hidden under an opaque full-bleed video anyway. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <HeroVideo size="bg" />
      </motion.div>

      <div className="container-x section-hero relative z-10 flex flex-1 flex-col items-start justify-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex max-w-2xl flex-col items-start">
          <motion.h1
            variants={item}
            className="text-display-xl font-display text-ink"
          >
            Helping local businesses{" "}
            <span className="relative whitespace-nowrap text-accent">
              grow online
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8C60 3 240 3 298 8" stroke="#2F5BFF" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-body-lg text-ink-2">
            Professional websites, Google visibility, WhatsApp integration and digital branding —
            designed to help your business attract more customers.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Magnetic>
              <Button href="/contact" size="lg" arrow className="w-full sm:w-auto">
                Get Free Consultation
              </Button>
            </Magnetic>
            <Button href="#packages" size="lg" variant="secondary" className="w-full sm:w-auto">
              View Packages
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {quickPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 text-body-sm font-medium text-ink-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-tint text-accent">
                  <Icon name="check" size={13} strokeWidth={2.4} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* smooth transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

export default Hero;
