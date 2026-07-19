import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// Theme-aware CTA for concept live sites. Unlike the main site's Button (which
// is hard-coded to the LocalRise accent), this one takes the concept's own
// brand colour and radius so it reads as that brand's button, not LocalRise's.
// Colours arrive as CSS custom properties (see conceptSites.ts theme + globals.css)
// consumed through literal bg-[var(--lv-*)] classes — never built dynamically.
//
// Dual-mode like the main Button: pass `href` for a link, or `onClick` (no
// href) to render a plain <button> — e.g. LiveFooter's "Build something
// similar" starts a WhatsApp conversation rather than navigating.
type CommonProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  radius: string;
  arrow?: boolean;
  className?: string;
};

type Props = CommonProps & ({ href: string; onClick?: never } | { href?: undefined; onClick: () => void });

export function LiveButton({ children, variant = "solid", radius, arrow, className, href, onClick }: Props) {
  const variants: Record<string, string> = {
    solid: "bg-[var(--lv-brand)] text-[var(--lv-brand-ink)] hover:opacity-90",
    outline: "border border-[var(--lv-line)] text-[var(--lv-ink)] hover:bg-[var(--lv-brand-soft)]",
    ghost: "text-[var(--lv-ink)] hover:bg-[var(--lv-brand-soft)]",
  };

  const classes = cx(
    "group inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-body-sm font-medium tracking-tight transition-all duration-300 ease-premium",
    variants[variant],
    radius,
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrow-right"
          size={16}
          strokeWidth={1.8}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <SmartLink href={href} className={classes}>
        {inner}
      </SmartLink>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

export default LiveButton;
