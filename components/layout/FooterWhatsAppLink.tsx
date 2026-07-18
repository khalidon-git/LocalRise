"use client";

import { Icon } from "@/components/ui/Icon";
import { startConversation } from "@/lib/communication";

// Footer (a server component) needs this for the same reason ConceptCard
// needs ConversationButton — this one specific list item is styled as a
// plain inline link, not the shared Button component, so it gets its own
// tiny client wrapper rather than forcing all of Footer client-side.
export function FooterWhatsAppLink() {
  return (
    <button
      type="button"
      onClick={() => startConversation({ channel: "whatsapp", type: "consultation", meta: { section: "footer", button: "get-in-touch-whatsapp" } })}
      className="inline-flex items-center gap-2 transition-colors hover:text-white"
    >
      <Icon name="whatsapp" size={16} /> WhatsApp
    </button>
  );
}

export default FooterWhatsAppLink;
