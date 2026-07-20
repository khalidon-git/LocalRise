import { cx } from "@/lib/utils";

// The display-sized real logo mark (public/logo-display.png, derived from the
// full-resolution public/logo.png) is dark navy/blue on a transparent
// background — legible on light surfaces (Nav, which never sits on a dark
// background) but nearly invisible on dark ones. Footer is the one dark
// surface that uses this component, so tone="dark" sets it inside a small
// white card instead of inventing a second dark-safe logo asset.
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- output: export has no image loader
    <img src="/logo-display.png" alt="LocalRise" width={200} height={87} className="h-9 w-auto" />
  );

  if (tone === "dark") {
    return (
      <span className={cx("inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-sm", className)}>
        {img}
      </span>
    );
  }

  return <span className={cx("inline-flex items-center", className)}>{img}</span>;
}

export default Logo;
