"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConceptSite } from "@/lib/content";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { LiveButton } from "@/components/live/LiveButton";
import { themeVars } from "@/components/live/liveTheme";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cx } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Nav for a concept live site. `navStyle: "overlay"` starts transparent over
// the hero and solidifies on scroll (restaurant/hotel/gym/wedding — anywhere
// the hero photo should read edge-to-edge); `"solid"` is always on a surface
// bar (dental/real-estate/fashion/architecture/saas — brands that read more
// structured/corporate). Both share one mobile drawer.
export function LiveNav({ site }: { site: ConceptSite }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = site.theme.navStyle === "overlay";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useScrollLock(open);

  const bar = overlay
    ? scrolled
      ? "bg-[var(--lv-surface)]/95 backdrop-blur-xl border-b border-[var(--lv-line)] shadow-sm"
      : "bg-transparent border-b border-transparent"
    : "bg-[var(--lv-surface)] border-b border-[var(--lv-line)]";

  return (
    <header className="lv-root fixed inset-x-0 top-0 z-50" style={themeVars(site)}>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={cx("transition-colors duration-500", bar)}
      >
        <div className="lv-container flex items-center justify-between gap-4 py-4">
          <SmartLink href="#top" className={cx("text-[17px] font-semibold text-[var(--lv-ink)]", site.theme.headFont, site.theme.tracking)}>
            {site.brandName}
          </SmartLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <SmartLink
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-[var(--lv-ink-muted)] transition-colors hover:text-[var(--lv-ink)]"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LiveButton href="#contact" radius={site.theme.radius} className="hidden sm:inline-flex">
              {site.hero.cta}
            </LiveButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--lv-line)] text-[var(--lv-ink)] lg:hidden"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-x-0 top-0 bg-[var(--lv-surface)] p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className={cx("text-[17px] font-semibold text-[var(--lv-ink)]", site.theme.headFont)}>{site.brandName}</span>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--lv-line)] text-[var(--lv-ink)]"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
              <ul className="mt-6 flex flex-col gap-1">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[17px] font-medium text-[var(--lv-ink)]"
                    >
                      {item.label}
                      <Icon name="arrow-up-right" size={16} className="text-[var(--lv-ink-muted)]" />
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <LiveButton href="#contact" radius={site.theme.radius} className="mt-4 w-full" arrow>
                {site.hero.cta}
              </LiveButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default LiveNav;
