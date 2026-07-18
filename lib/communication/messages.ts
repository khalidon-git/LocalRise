import { formatINR } from "@/lib/utils";
import type { StartConversationInput } from "./types";

// Builds the plain-text message body for a conversation start. Deliberately
// channel-agnostic — whatsapp.ts URL-encodes this into a wa.me link; a future
// channel (email body, chatbot opener) would consume the same string
// differently rather than needing its own copy of this logic.
export function buildMessage(input: StartConversationInput): string {
  switch (input.type) {
    case "consultation":
      return buildConsultationMessage(input);
    case "package":
      return `Hi LocalRise, I'm interested in your ${input.packageName} Package (${formatINR(input.price)}). Could you tell me what's included and how we can get started?`;
    case "service":
      return input.price
        ? `Hi LocalRise, I'd like to get ${input.serviceName} (${formatINR(input.price)}) done for my business. What's the next step?`
        : `Hi LocalRise, I'd like to get ${input.serviceName} done for my business. What's the next step?`;
    case "industry":
      return input.conceptName
        ? `Hi LocalRise, I run a ${input.industryName.toLowerCase()} and I'm interested in a website similar to your ${input.conceptName} concept. Could you share the next steps?`
        : `Hi LocalRise, I run a ${input.industryName.toLowerCase()} and I'm interested in a website for it. Could you share the next steps?`;
    case "concept":
      return `Hi LocalRise! I like the ${input.conceptName} concept — can we build something similar for my business?`;
    case "portfolio":
      return input.projectName
        ? `Hi LocalRise, I saw ${input.projectName} and I'd like something similar for my business. What's the next step?`
        : `Hi LocalRise, I'd like to see more of your work and discuss something similar for my business.`;
    case "cart":
      return buildCartMessage(input);
  }
}

function buildConsultationMessage(input: Extract<StartConversationInput, { type: "consultation" }>): string {
  const { name, business, businessType, phone, message } = input;
  // No form fields → the plain generic opener (floating button, nav CTA, etc).
  if (!name && !business && !message) {
    return "Hi LocalRise, I'd like a free consultation for my business. Can we discuss my requirements?";
  }
  // Form fields present → the richer, structured version (the /contact form).
  return [
    "Hi LocalRise! I'd like a free consultation.",
    "",
    name && `Name: ${name}`,
    business && `Business: ${business}`,
    businessType && `Type: ${businessType}`,
    phone && `Phone: ${phone}`,
    message && `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCartMessage(input: Extract<StartConversationInput, { type: "cart" }>): string {
  const lines = input.items
    .map((item) => `• ${item.title} x${item.quantity} (${formatINR(item.price * item.quantity)})`)
    .join("\n");
  return `Hi LocalRise! I'd like to book these services:\n\n${lines}\n\nTotal Price: ${formatINR(input.subtotal)}\n\nPlease let me know how to proceed!`;
}
