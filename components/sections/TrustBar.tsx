import { trustItems } from "@/lib/data";
import { Icon } from "@/components/Icon";

export function TrustBar() {
  const items = [...trustItems, ...trustItems, ...trustItems];
  return (
    <section aria-label="Why businesses trust LocalRise" className="border-y border-line bg-white/60 py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {items.map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10">
              <span className="flex items-center gap-2.5 text-body-sm font-medium tracking-tight text-ink-2">
                <Icon name="check" size={16} strokeWidth={2.2} className="text-accent" />
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
