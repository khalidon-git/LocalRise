import { trustItems } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// Colour-cycled check marks so the trust marquee isn't a wall of one blue.
const checkColors = ["text-[#2f5bff]", "text-[#12b981]", "text-[#ff7a3d]", "text-[#9b5bff]", "text-[#ec4899]"];

export function TrustBar() {
  const items = [...trustItems, ...trustItems, ...trustItems];
  return (
    <section aria-label="Why businesses trust LocalRise" className="border-y border-line bg-white/60 py-4 sm:py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8 sm:gap-10 sm:pr-10">
          {items.map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 sm:gap-10">
              <span className="flex items-center gap-2.5 text-body-sm font-medium tracking-tight text-ink-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-bg-subtle">
                  <Icon name="check" size={14} strokeWidth={2.4} className={checkColors[i % checkColors.length]} />
                </span>
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-line-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
