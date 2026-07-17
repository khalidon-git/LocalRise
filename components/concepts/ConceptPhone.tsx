import type { Concept } from "@/lib/content";
import { cx } from "@/lib/utils";

// Mobile preview of a concept, in a phone frame. Uses the same identity tokens
// as ConceptMock so the two read as one brand — and because most local-business
// customers arrive on a phone, this is the view that actually matters.
export function ConceptPhone({ concept, className }: { concept: Concept; className?: string }) {
  const { identity: id, preview: p } = concept;
  const dark = p.layout === "dark";

  return (
    <div
      className={cx(
        "overflow-hidden rounded-[18px] border-[3px] bg-white shadow-xl",
        dark ? "border-[#171B18]" : "border-ink",
        className,
      )}
    >
      <div className={cx("relative", id.canvas, id.font)}>
        {/* notch */}
        <div className={cx("flex justify-center py-1", dark ? "bg-[#0C0F0D]" : "bg-ink")}>
          <span className="h-1 w-8 rounded-full bg-white/30" />
        </div>

        <div className="p-2.5">
          {/* app bar */}
          <div className="mb-2 flex items-center justify-between">
            <span className={cx("text-[8px] font-semibold", id.ink)}>{concept.name}</span>
            <span className={cx("text-[8px]", id.ink, "opacity-50")}>☰</span>
          </div>

          {/* hero */}
          <div className={cx("bg-gradient-to-br p-2.5", id.gradient, id.radius)}>
            <p className={cx("text-[6px] uppercase tracking-widest opacity-80", id.onBrand)}>{p.heroKicker}</p>
            <p className={cx("mt-1 text-[10px] font-semibold leading-tight", id.onBrand)}>{p.heroTitle}</p>
          </div>

          {/* stacked cards — mobile is a single column */}
          <div className="mt-2 space-y-1.5">
            {p.cards.slice(0, 2).map((c) => (
              <div key={c} className={cx("flex items-center gap-2 border p-1.5", id.surface, id.radius, dark ? "border-white/10" : "border-black/5")}>
                <div className={cx("h-6 w-6 shrink-0", id.muted, id.radius)} />
                <div className="flex-1">
                  <p className={cx("text-[7px] font-medium", id.ink)}>{c}</p>
                  <div className={cx("mt-1 h-1 w-2/3 rounded-full", id.muted)} />
                </div>
              </div>
            ))}
          </div>

          {/* sticky action — the whole point on mobile */}
          <div className={cx("mt-2 py-1.5 text-center text-[8px] font-semibold", id.brand, id.onBrand, id.radius)}>{p.cta}</div>
        </div>
      </div>
    </div>
  );
}

export default ConceptPhone;
