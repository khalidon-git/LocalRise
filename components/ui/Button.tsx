import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Icon, type IconName } from "@/components/Icon";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "whatsapp";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-premium focus-visible:outline-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-8px_rgba(47,91,255,0.6)] hover:bg-accent-dark hover:shadow-[0_14px_38px_-8px_rgba(47,91,255,0.7)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-ink border border-line-2 shadow-xs hover:border-ink/20 hover:shadow-sm hover:-translate-y-0.5",
  ghost: "text-ink-2 hover:text-ink hover:bg-bg-muted",
  dark: "bg-ink text-white hover:bg-ink-2 hover:-translate-y-0.5 shadow-lg",
  whatsapp:
    "bg-[#25D366] text-[#06240f] font-semibold hover:brightness-105 hover:-translate-y-0.5 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-body-sm",
  lg: "h-[54px] px-7 text-body",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  arrow?: boolean;
  className?: string;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  arrow,
  className,
  href,
  ...rest
}: ButtonProps) {
  const classes = cx(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} strokeWidth={1.8} />}
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrow-right"
          size={18}
          strokeWidth={1.8}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

export default Button;
