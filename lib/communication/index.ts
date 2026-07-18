// ---------------------------------------------------------------------------
// Communication layer — single entrypoint for "start a conversation with
// LocalRise" from anywhere on the site, across whatever channel a given CTA
// represents.
//
// Structure: index.ts (public entrypoint, this file) / messages.ts (message
// text, channel-agnostic) / whatsapp.ts (the whatsapp channel — number
// alternation, URL building, opening the chat) / types.ts (shared types).
// Adding a second channel later means a new sibling module + a new case
// below — not touching any of the call sites that already use this.
//
// Client-only: reads sessionStorage and calls window.open, so every caller
// must be inside a "use client" component. Server components that need one
// of these buttons use components/ui/ConversationButton.tsx instead of
// calling this directly.
// ---------------------------------------------------------------------------

import type { StartConversationInput } from "./types";
import { buildMessage } from "./messages";
import { openWhatsApp } from "./whatsapp";

export type { Channel, Meta, CartItem, MessageType, StartConversationInput } from "./types";

// Intentional no-op — the natural place to wire up real analytics later
// (input.meta.source/section/button + input.type), once one exists. Nothing
// currently reads this; it's here so `meta` has a concrete destination
// instead of silently going nowhere.
function trackConversationStart(input: StartConversationInput): void {
  void input;
}

export function startConversation(input: StartConversationInput): void {
  trackConversationStart(input);
  const message = buildMessage(input);

  switch (input.channel) {
    case "whatsapp":
      openWhatsApp(message);
      return;
    default: {
      const exhaustive: never = input.channel;
      throw new Error(`startConversation: unsupported channel "${exhaustive}"`);
    }
  }
}
