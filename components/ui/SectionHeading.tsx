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
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      <Reveal delay={0.05}>
        <h2
          className={cx(
            "text-heading-1 font-display",
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
              "text-body-lg",
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
