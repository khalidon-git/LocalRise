import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// Theme-aware CTA for concept live sites. Unlike the main site's Button (which
// is hard-coded to the LocalRise accent), this one takes the concept's own
// brand colour and radius so it reads as that brand's button, not LocalRise's.
// Colours arrive as CSS custom properties (see conceptSites.ts theme + globals.css)
// consumed through literal bg-[var(--lv-*)] classes — never built dynamically.
type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  radius: string;
  arrow?: boolean;
  className?: string;
};

export function LiveButton({ href, children, variant = "solid", radius, arrow, className }: Props) {
  const variants: Record<string, string> = {
    solid: "bg-[var(--lv-brand)] text-[var(--lv-brand-ink)] hover:opacity-90",
    outline: "border border-[var(--lv-line)] text-[var(--lv-ink)] hover:bg-[var(--lv-brand-soft)]",
    ghost: "text-[var(--lv-ink)] hover:bg-[var(--lv-brand-soft)]",
  };

  return (
    <SmartLink
      href={href}
      className={cx(
        "group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium tracking-tight transition-all duration-300 ease-premium",
        variants[variant],
        radius,
        className,
      )}
    >
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrow-right"
          size={16}
          strokeWidth={1.8}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
        />
      )}
    </SmartLink>
  );
}

export default LiveButton;
