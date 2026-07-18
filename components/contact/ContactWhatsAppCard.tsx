"use client";

import { Icon } from "@/components/ui/Icon";
import { startConversation } from "@/lib/communication";

// The WhatsApp entry in ContactMethods' card list needs an onClick (to start
// a conversation) rather than an href, so — same reason as ConversationButton
// — it gets its own tiny client component instead of making all of
// ContactMethods client-side. Matches the other method cards' exact markup.
export function ContactWhatsAppCard() {
  return (
    <button
      type="button"
      onClick={() => startConversation({ channel: "whatsapp", type: "consultation", meta: { section: "contact-page", button: "whatsapp-card" } })}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#4ADE9E] text-white shadow-sm">
        <Icon name="whatsapp" size={20} strokeWidth={1.8} />
      </span>
      <span className="flex-1">
        <span className="block text-body-sm font-semibold text-ink">WhatsApp</span>
        <span className="block text-[13px] text-ink-2">Chat with us instantly</span>
      </span>
      <Icon name="arrow-up-right" size={18} className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}

export default ContactWhatsAppCard;
