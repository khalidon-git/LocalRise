"use client";

import { motion } from "framer-motion";
import type { ConceptSite } from "@/lib/content";
import { LiveButton } from "@/components/live/LiveButton";
import { LiveDashboardPanel } from "@/components/live/LiveDashboard";
import { cx } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Five hero personalities, chosen per concept via theme.heroStyle. This is
// the single biggest lever for making ten sites feel like ten different
// studios rather than one template — see docs/concepts.md.
export function LiveHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;

  if (theme.heroStyle === "product") return <ProductHero site={site} />;
  if (theme.heroStyle === "split") return <SplitHero site={site} />;
  if (theme.heroStyle === "editorial-grid") return <EditorialHero site={site} />;
  if (theme.heroStyle === "centered-stat") return <CenteredHero site={site} />;
  return <FullBleedHero site={site} />;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--lv-brand)]"
    >
      {children}
    </motion.p>
  );
}

function FullBleedHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;
  return (
    <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden">
      {hero.image && (
        <div className="absolute inset-0">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            width={1600}
            height={1000}
            fetchPriority="high"
            loading="eager"
            className="lv-kenburns h-full w-full object-cover"
          />
          {/* Always a dark scrim, regardless of theme.bg — the headline below is
              hardcoded white for legibility over a photograph, so light-theme
              brands (Casa Alma, Golden Hour) need a dark bottom fade too, not a
              fade to their own near-white background. */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.78) 100%)" }}
          />
        </div>
      )}
      <div className="lv-container relative pb-16 pt-40 sm:pb-24">
        <Kicker>{hero.kicker}</Kicker>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className={cx("mt-3 max-w-2xl text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] text-white", theme.headFont, theme.tracking)}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/85"
        >
          {hero.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <LiveButton href="#contact" radius={theme.radius} arrow>{hero.cta}</LiveButton>
          <LiveButton href="#work" radius={theme.radius} variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">
            {hero.secondaryCta}
          </LiveButton>
        </motion.div>
      </div>
    </section>
  );
}

function SplitHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;
  return (
    <section id="top" className="grid min-h-[90vh] pt-20 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <Kicker>{hero.kicker}</Kicker>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className={cx("mt-4 text-[clamp(2.4rem,4.6vw,3.75rem)] font-semibold leading-[1.05] text-[var(--lv-ink)]", theme.headFont, theme.tracking)}
        >
          {hero.title}
        </motion.h1>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[var(--lv-ink-muted)]">{hero.sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LiveButton href="#contact" radius={theme.radius} arrow>{hero.cta}</LiveButton>
          <LiveButton href="#work" radius={theme.radius} variant="outline">{hero.secondaryCta}</LiveButton>
        </div>
      </div>
      {hero.image && (
        <div className="relative min-h-[50vh] lg:min-h-0">
          <img src={hero.image.src} alt={hero.image.alt} width={1200} height={1400} fetchPriority="high" loading="eager" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
    </section>
  );
}

function EditorialHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;
  return (
    <section id="top" className="pt-32 sm:pt-40">
      <div className="lv-container">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-6">
          <div>
            <Kicker>{hero.kicker}</Kicker>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className={cx("mt-4 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase leading-[0.95] text-[var(--lv-ink)]", theme.headFont, theme.tracking)}
            >
              {hero.title}
            </motion.h1>
          </div>
          <div className="flex flex-col gap-5 lg:pb-2">
            <p className="text-[16px] leading-relaxed text-[var(--lv-ink-muted)]">{hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <LiveButton href="#contact" radius={theme.radius} arrow>{hero.cta}</LiveButton>
              <LiveButton href="#work" radius={theme.radius} variant="outline">{hero.secondaryCta}</LiveButton>
            </div>
          </div>
        </div>
        {hero.image && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className={cx("mt-10 aspect-[16/8] w-full overflow-hidden", theme.radius)}
          >
            <img src={hero.image.src} alt={hero.image.alt} width={1400} height={700} fetchPriority="high" loading="eager" className="h-full w-full object-cover" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CenteredHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;
  return (
    <section id="top" className="pt-36 sm:pt-44">
      <div className="lv-container text-center">
        <Kicker>{hero.kicker}</Kicker>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className={cx("mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5.2vw,4.25rem)] font-semibold leading-[1.05] text-[var(--lv-ink)]", theme.headFont, theme.tracking)}
        >
          {hero.title}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--lv-ink-muted)]">{hero.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LiveButton href="#contact" radius={theme.radius} arrow>{hero.cta}</LiveButton>
          <LiveButton href="#work" radius={theme.radius} variant="outline">{hero.secondaryCta}</LiveButton>
        </div>
      </div>
      {hero.image && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="lv-container mt-14"
        >
          <div className={cx("aspect-[16/7] w-full overflow-hidden border border-[var(--lv-line)]", theme.radius)}>
            <img src={hero.image.src} alt={hero.image.alt} width={1600} height={700} fetchPriority="high" loading="eager" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      )}
    </section>
  );
}

function ProductHero({ site }: { site: ConceptSite }) {
  const { hero, theme } = site;
  return (
    <section id="top" className="relative overflow-hidden pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{ background: `radial-gradient(60% 60% at 50% 0%, ${theme.brandSoft} 0%, transparent 70%)` }}
      />
      <div className="lv-container relative text-center">
        <Kicker>{hero.kicker}</Kicker>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className={cx("mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)] font-semibold leading-[1.05] text-[var(--lv-ink)]", theme.headFont, theme.tracking)}
        >
          {hero.title}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--lv-ink-muted)]">{hero.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LiveButton href="#contact" radius={theme.radius} arrow>{hero.cta}</LiveButton>
          <LiveButton href="#work" radius={theme.radius} variant="outline">{hero.secondaryCta}</LiveButton>
        </div>
      </div>
      {site.dashboard && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="lv-container relative mt-14"
        >
          <LiveDashboardPanel site={site} />
        </motion.div>
      )}
    </section>
  );
}

export default LiveHero;
