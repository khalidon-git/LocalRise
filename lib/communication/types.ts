// ---------------------------------------------------------------------------
// Shared types for the communication layer (lib/communication). See index.ts
// for the public entrypoint, messages.ts for how these become message text.
// ---------------------------------------------------------------------------

// Only "whatsapp" is implemented today. The union exists so a future channel
// (email, phone, calendar, chatbot, CRM) is a new case in index.ts's switch
// and a new sibling module — not a rewrite of every CTA that calls
// startConversation(), since they already pass `channel` explicitly.
export type Channel = "whatsapp";

/** Accepted and threaded through for future analytics — nothing reads this yet. */
export type Meta = {
  source?: string;
  section?: string;
  button?: string;
};

export type CartItem = { title: string; quantity: number; price: number };

// Discriminated by `type` so each variant carries exactly the fields its
// message needs — TypeScript narrows this correctly in messages.ts's switch,
// which a generic/conditional-type version doesn't do as cleanly.
export type StartConversationInput =
  | {
      channel: Channel;
      type: "consultation";
      meta?: Meta;
      name?: string;
      business?: string;
      businessType?: string;
      phone?: string;
      message?: string;
    }
  | { channel: Channel; type: "package"; meta?: Meta; packageName: string; price: number }
  | { channel: Channel; type: "service"; meta?: Meta; serviceName: string; price?: number }
  | { channel: Channel; type: "industry"; meta?: Meta; industryName: string; conceptName?: string }
  | { channel: Channel; type: "concept"; meta?: Meta; conceptName: string }
  // No current button sends this — kept because it was specified as a
  // required type. Nothing to migrate it *from*; wire it up when a
  // portfolio/case-study surface exists.
  | { channel: Channel; type: "portfolio"; meta?: Meta; projectName?: string }
  // Added beyond the originally specified 6 types: CartDrawer's checkout
  // already builds a real multi-item WhatsApp message (see cart.md) that
  // doesn't fit consultation/package/service/industry/concept/portfolio —
  // each of those describes exactly one thing, and a cart is a list of them.
  // See knowledge/decisions/ for the fuller reasoning.
  | { channel: Channel; type: "cart"; meta?: Meta; items: CartItem[]; subtotal: number };

export type MessageType = StartConversationInput["type"];
