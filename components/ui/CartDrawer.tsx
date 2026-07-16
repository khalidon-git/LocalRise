"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { formatINR } from "@/lib/utils";
import { Icon } from "@/components/Icon";
import { brand } from "@/lib/data";

export function CartDrawer() {
  const { cart, isOpen, toggleCart, updateQuantity } = useCart();

  // Escape key handler to close the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleCart(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleCart]);

  // Calculate items count and subtotal
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Construct the prefilled WhatsApp text for booking checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;

    const lineItems = cart
      .map(
        (item) =>
          `• ${item.title} x${item.quantity} (${formatINR(item.price * item.quantity)})`
      )
      .join("\n");

    const textMessage = `Hi LocalRise! I'd like to book these services:\n\n${lineItems}\n\nTotal Price: ${formatINR(
      subtotal
    )}\n\nPlease let me know how to proceed!`;

    window.open(
      `https://wa.me/${brand.whatsappHref}?text=${encodeURIComponent(textMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleCart(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-full w-full max-w-[420px] flex-col border-l border-line bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-center gap-3">
                <h3
                  id="cart-drawer-title"
                  className="font-display text-lg font-semibold text-ink"
                >
                  Selected Packages
                </h3>
                {totalItems > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleCart(false)}
                aria-label="Close cart drawer"
                className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-bg-subtle text-ink"
              >
                <Icon name="close" size={18} strokeWidth={2.2} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon name="cart" size={28} />
                  </div>
                  <h4 className="mt-4 font-display text-base font-semibold text-ink">
                    Your cart is empty
                  </h4>
                  <p className="mt-2 text-body-sm text-ink-3">
                    Add a package from the services list below to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <article
                      key={item.title}
                      className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-xs"
                    >
                      <div className="pr-4">
                        <h4 className="font-display text-body-sm font-semibold text-ink">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[13px] font-semibold text-accent">
                          {formatINR(item.price * item.quantity)}
                          {item.quantity > 1 && (
                            <span className="ml-1 text-[11px] font-normal text-ink-3">
                              ({formatINR(item.price)} each)
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Quantity Controller with 44px Touch Targets */}
                      <div className="flex items-center gap-1 rounded-full border border-line-2 bg-bg-subtle p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.title, -1)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          className="grid h-11 w-11 place-items-center rounded-full text-ink-2 hover:bg-white hover:text-ink active:scale-95 transition-all"
                        >
                          <Icon name="minus" size={16} strokeWidth={2.2} />
                        </button>
                        <span className="w-6 text-center text-body-sm font-semibold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.title, 1)}
                          aria-label={`Increase quantity of ${item.title}`}
                          className="grid h-11 w-11 place-items-center rounded-full text-ink-2 hover:bg-white hover:text-ink active:scale-95 transition-all"
                        >
                          <Icon name="plus" size={16} strokeWidth={2.2} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="border-t border-line bg-white p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.02)]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-body-sm font-semibold text-ink-2">Subtotal</span>
                  <span className="font-display text-2xl font-bold text-ink">
                    {formatINR(subtotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex w-full select-none items-center justify-center gap-2 rounded-full bg-accent text-white h-[54px] px-7 text-body font-semibold tracking-tight transition-all duration-300 ease-premium hover:bg-accent-dark shadow-[0_10px_30px_-8px_rgba(47,91,255,0.6)] hover:shadow-[0_14px_38px_-8px_rgba(47,91,255,0.7)] hover:-translate-y-0.5"
                >
                  <span>Proceed to Checkout</span>
                  <Icon name="whatsapp" size={18} />
                </button>

                <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-3">
                  This checkout redirect will open WhatsApp to discuss details of your order. No payments are charged immediately.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
