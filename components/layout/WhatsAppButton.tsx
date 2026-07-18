"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { startConversation } from "@/lib/communication";

export function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() =>
            startConversation({ channel: "whatsapp", type: "consultation", meta: { section: "floating-button" } })
          }
          aria-label="Chat with LocalRise on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 sm:bottom-6 sm:right-6"
        >
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
            <Icon name="whatsapp" size={28} className="relative" />
          </span>
          <span className="pointer-events-none absolute right-16 hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-ink px-0 py-2.5 text-body-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-[180px] group-hover:px-4 group-hover:opacity-100 sm:block">
            Chat with us
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppButton;
