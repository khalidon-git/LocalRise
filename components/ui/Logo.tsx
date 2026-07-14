import { cx } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-accent shadow-[0_6px_16px_-4px_rgba(47,91,255,0.6)]">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 16.5 11 11l3.2 3.2L19 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.6 8.5H19V13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={cx(
          "font-display text-[1.28rem] font-semibold tracking-tight",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        Local<span className="text-accent">Rise</span>
      </span>
    </span>
  );
}

export default Logo;
