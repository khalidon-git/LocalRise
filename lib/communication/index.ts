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
import { ga4Enabled } from "@/lib/analytics/config";
import { isConsentGranted } from "@/lib/analytics/consent";
import { trackWhatsAppConversion } from "@/lib/analytics/conversions";

export type { Channel, Meta, CartItem, MessageType, StartConversationInput } from "./types";

// Fires configured Google Ads and GA4 events when a conversation starts. The
// discriminated `type` and `meta` keep configured events segmentable without
// restructuring anything here.
//
// Guarded so it's a safe no-op during SSR/static export and whenever gtag.js
// has not loaded. The event-specific flags below keep the account-level Ads
// tag separate from conversion and GA4 event configuration.
function trackConversationStart(input: StartConversationInput): void {
  trackWhatsAppConversion();

  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function" ||
    !isConsentGranted()
  ) return;

  // GA4 is independent of Ads and must not fire until its own measurement id
  // exists. Loading only the Google Ads base tag does not create an event.
  if (ga4Enabled) {
    window.gtag("event", "start_conversation", {
      channel: input.channel,
      conversation_type: input.type,
      section: input.meta?.section,
      button: input.meta?.button,
    });
  }
}

export function startConversation(input: StartConversationInput): void {
  const message = buildMessage(input);

  switch (input.channel) {
    case "whatsapp":
      trackConversationStart(input);
      openWhatsApp(message);
      return;
    default: {
      const exhaustive: never = input.channel;
      throw new Error(`startConversation: unsupported channel "${exhaustive}"`);
    }
  }
}
