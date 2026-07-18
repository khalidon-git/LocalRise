"use client";

import { Button } from "@/components/ui/Button";
import type { IconName } from "@/components/ui/Icon";
import { startConversation, type StartConversationInput } from "@/lib/communication";

// Lets a server component (ConceptCard, Footer, the service/concepts pages)
// render a button that starts a WhatsApp conversation, without the whole
// component needing "use client" — only this thin wrapper does. Button
// itself already renders a plain <button> when no `href` is given; this just
// supplies the onClick, which is the one thing a server component can't do.
//
// Props are listed explicitly rather than derived via ComponentProps<typeof
// Button> — Button's props are a union (anchor-mode | button-mode) and a
// plain Omit over a union doesn't distribute the way you'd expect, producing
// an unusable merged type.
type Props = {
  start: StartConversationInput;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "whatsapp";
  size?: "md" | "lg";
  icon?: IconName;
  arrow?: boolean;
  className?: string;
};

export function ConversationButton({ start, ...rest }: Props) {
  return <Button type="button" onClick={() => startConversation(start)} {...rest} />;
}

export default ConversationButton;
