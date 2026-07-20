"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, brand } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cx } from "@/lib/utils";
import { startConversation } from "@/lib/communication";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleDrawerKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDrawerKeys);
    return () => {
      window.removeEventListener("keydown", handleDrawerKeys);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  useScrollLock(open);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="container-x">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cx(
            "mt-3 flex min-h-14 items-center justify-between gap-3 rounded-full px-2.5 pl-4 transition-all duration-500 ease-premium sm:mt-4 sm:gap-4 sm:px-3 sm:pl-4",
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
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 py-2 text-body-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-bg-muted hover:text-ink"
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
            <Button href="/contact/" size="md" className="hidden sm:inline-flex" arrow>
              Get Free Consultation
            </Button>
            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="control-target grid place-items-center rounded-full border border-line-2 text-ink lg:hidden"
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
              id="mobile-navigation"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute inset-x-0 top-0 max-h-[100svh] overflow-y-auto border-b border-line-2 px-[var(--page-gutter)] pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="control-target grid place-items-center rounded-full border border-line-2 text-ink"
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
                      className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-ink transition-colors hover:bg-bg-muted"
                    >
                      {item.label}
                      <Icon name="arrow-up-right" size={18} className="text-ink-3" />
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact/" size="lg" onClick={() => setOpen(false)} arrow className="w-full">
                  Get Free Consultation
                </Button>
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon="whatsapp"
                  onClick={() => {
                    startConversation({ channel: "whatsapp", type: "consultation", meta: { section: "nav", button: "chat-on-whatsapp" } });
                    setOpen(false);
                  }}
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
