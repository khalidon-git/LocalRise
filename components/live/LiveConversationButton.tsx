"use client";

import type { ReactNode } from "react";
import { LiveButton } from "@/components/live/LiveButton";
import { startConversation, type StartConversationInput } from "@/lib/communication";

// LiveFooter (a server component) needs this the same way ConceptCard needs
// components/ui/ConversationButton — LiveButton itself doesn't require
// "use client", but the onClick closure calling startConversation does.
export function LiveConversationButton({
  start,
  children,
  ...rest
}: {
  start: StartConversationInput;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  radius: string;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <LiveButton onClick={() => startConversation(start)} {...rest}>
      {children}
    </LiveButton>
  );
}

export default LiveConversationButton;
