import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: Props) {
  return (
    <div
      className={cx(
        "flex flex-col gap-2 sm:gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal delay={0.05}>
        {/* No max-width (unlike the narrower reading/prose column below):
            the heading sits in a flex column with items-center, which
            shrink-wraps to content — a max-width here would cap that below
            the container's real available width and force early wraps. */}
        <h2
          className={cx(
            "text-heading-section font-display",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cx(
              "max-w-prose text-body-sm sm:text-body-lg",
              tone === "dark" ? "text-ink-inverse-2" : "text-ink-2",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export default SectionHeading;
