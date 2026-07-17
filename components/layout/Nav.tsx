"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, brand } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cx } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cx(
            "mt-3 flex items-center justify-between gap-4 rounded-full px-3 pl-4 transition-all duration-500 ease-premium sm:mt-4",
            scrolled
              ? "border border-line-2 bg-white/95 py-2 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-white/80"
              : "border border-transparent py-2.5",
          )}
        >
          <SmartLink href="/#top" aria-label="LocalRise home" className="shrink-0">
            <Logo />
          </SmartLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <SmartLink
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-body-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-bg-muted hover:text-ink"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${brand.phoneHref}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-body-sm font-medium text-ink-2 transition-colors hover:text-ink md:inline-flex"
            >
              <Icon name="phone" size={16} strokeWidth={1.8} />
              <span className="hidden xl:inline">{brand.phoneDisplay}</span>
            </a>
            <Button href="/#contact" size="md" className="hidden sm:inline-flex" arrow>
              Get Free Consultation
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-ink lg:hidden"
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute inset-x-0 top-0 border-b border-line-2 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-ink"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <ul className="mt-6 flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-bg-muted"
                    >
                      {item.label}
                      <Icon name="arrow-up-right" size={18} className="text-ink-3" />
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/#contact" size="lg" onClick={() => setOpen(false)} arrow className="w-full">
                  Get Free Consultation
                </Button>
                <Button
                  href={`https://wa.me/${brand.whatsappHref}`}
                  variant="whatsapp"
                  size="lg"
                  icon="whatsapp"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
