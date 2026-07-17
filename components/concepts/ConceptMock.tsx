import type { Concept } from "@/lib/content";
import { cx } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Code-rendered preview of a concept website, inside a browser frame.
//
// One component, six layouts. Each concept passes its own identity tokens
// (colour, typography, corner radius) plus a layout variant, which is what makes
// the previews read as genuinely different studios rather than one template in
// six colours. Pure markup — no client JS, safe in server components and the
// static export, and it costs no image bytes.
// ---------------------------------------------------------------------------

function Bar({ className }: { className?: string }) {
  return <div className={cx("h-1.5 rounded-full", className)} />;
}

export function ConceptMock({ concept, className }: { concept: Concept; className?: string }) {
  const { identity: id, preview: p } = concept;
  const dark = p.layout === "dark";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-xl border shadow-lg",
        dark ? "border-white/10" : "border-line",
        className,
      )}
    >
      {/* browser chrome */}
      <div className={cx("flex items-center gap-1.5 border-b px-3 py-2", dark ? "border-white/10 bg-[#171B18]" : "border-line bg-white")}>
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span
          className={cx(
            "ml-2 flex-1 truncate rounded px-2 py-0.5 text-[9px]",
            dark ? "bg-[#0C0F0D] text-white/40" : "bg-bg-subtle text-ink-3",
          )}
        >
          {p.domain}
        </span>
      </div>

      {/* page canvas */}
      <div className={cx("p-3", id.canvas, id.font)}>
        {/* site nav */}
        <div className="mb-3 flex items-center justify-between">
          <div className={cx("text-[10px] font-semibold tracking-tight", id.ink)}>{concept.name}</div>
          <div className="flex gap-2">
            {p.nav.map((n) => (
              <span key={n} className={cx("text-[7px] opacity-70", id.ink)}>
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* hero — the layout variant does the differentiating work */}
        {p.layout === "centered" && (
          <div className={cx("bg-gradient-to-br p-5 text-center", id.gradient, id.radius)}>
            <p className={cx("text-[8px] uppercase tracking-widest opacity-80", id.onBrand)}>{p.heroKicker}</p>
            <p className={cx("mt-1.5 text-[15px] font-semibold leading-tight", id.onBrand)}>{p.heroTitle}</p>
            <span className={cx("mt-3 inline-block px-3 py-1 text-[8px] font-semibold", id.surface, id.brandText, id.radius)}>
              {p.cta}
            </span>
          </div>
        )}

        {p.layout === "bold" && (
          <div className={cx("relative overflow-hidden bg-gradient-to-br p-4", id.gradient, id.radius)}>
            <p className={cx("text-[8px] uppercase tracking-widest opacity-80", id.onBrand)}>{p.heroKicker}</p>
            <p className={cx("mt-1 text-[19px] font-bold uppercase leading-[0.95] tracking-tight", id.onBrand)}>{p.heroTitle}</p>
            <span className={cx("mt-3 inline-block px-3 py-1 text-[8px] font-bold", id.surface, id.brandText, id.radius)}>
              {p.cta}
            </span>
          </div>
        )}

        {p.layout === "editorial" && (
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-2.5">
            <div className="flex flex-col justify-center">
              <p className={cx("text-[7px] uppercase tracking-[0.2em] opacity-60", id.ink)}>{p.heroKicker}</p>
              <p className={cx("mt-1.5 text-[13px] font-normal leading-snug", id.ink)}>{p.heroTitle}</p>
              <span className={cx("mt-3 inline-block w-fit px-3 py-1 text-[8px]", id.brand, id.onBrand, id.radius)}>{p.cta}</span>
            </div>
            <div className={cx("min-h-[76px] bg-gradient-to-br", id.gradient, id.radius)} />
          </div>
        )}

        {p.layout === "grid" && (
          <div className={cx("bg-gradient-to-br p-4", id.gradient, id.radius)}>
            <p className={cx("text-[8px] uppercase tracking-widest opacity-80", id.onBrand)}>{p.heroKicker}</p>
            <p className={cx("mt-1 text-[14px] font-semibold leading-tight", id.onBrand)}>{p.heroTitle}</p>
          </div>
        )}

        {p.layout === "dark" && (
          <div className={cx("border p-4", id.surface, id.radius, "border-white/10")}>
            <p className={cx("text-[7px] uppercase tracking-[0.25em]", id.brandText)}>{p.heroKicker}</p>
            <p className={cx("mt-1.5 text-[15px] font-bold uppercase leading-[0.95]", id.ink)}>{p.heroTitle}</p>
            <span className={cx("mt-3 inline-block px-3 py-1 text-[8px] font-bold uppercase", id.brand, id.onBrand, id.radius)}>
              {p.cta}
            </span>
          </div>
        )}

        {p.layout === "split" && (
          <div className="grid grid-cols-2 gap-2.5">
            <div className={cx("flex flex-col justify-center p-3", id.surface, id.radius)}>
              <p className={cx("text-[7px] uppercase tracking-[0.18em] opacity-60", id.ink)}>{p.heroKicker}</p>
              <p className={cx("mt-1 text-[12px] leading-snug", id.ink)}>{p.heroTitle}</p>
              <span className={cx("mt-2.5 inline-block w-fit px-2.5 py-1 text-[8px]", id.brand, id.onBrand, id.radius)}>{p.cta}</span>
            </div>
            <div className={cx("min-h-[80px] bg-gradient-to-br", id.gradient, id.radius)} />
          </div>
        )}

        {/* content cards */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {p.cards.map((c) => (
            <div key={c} className={cx("border p-2", id.surface, id.radius, dark ? "border-white/10" : "border-black/5")}>
              <div className={cx("h-5 w-full", id.muted, id.radius)} />
              <p className={cx("mt-1.5 text-[7px] font-medium", id.ink)}>{c}</p>
              <Bar className={cx("mt-1 w-2/3", id.muted)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConceptMock;
