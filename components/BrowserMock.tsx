import { cx } from "@/lib/utils";

// Code-rendered browser + phone mockup used by the per-service hero visuals.
// Pure markup (no client JS) — safe in server components and the static export.
// Concept pages use components/concepts/ConceptMock instead: that one takes a
// full per-concept identity, whereas this only varies by accent gradient.
export function BrowserMock({
  accent,
  title,
  badge = "Book now",
  className,
}: {
  accent: string; // tailwind gradient classes, e.g. "from-[#2f5bff] to-[#5b84ff]"
  title: string;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={cx("relative aspect-[16/11] overflow-hidden rounded-xl border border-line bg-bg-subtle", className)}>
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      </div>
      <div className="p-3.5">
        {/* hero banner */}
        <div className={cx("relative flex h-[46%] min-h-[92px] items-end overflow-hidden rounded-lg bg-gradient-to-br p-3.5", accent)}>
          <div className="noise absolute inset-0 opacity-[0.12]" />
          <div className="relative">
            <div className="h-1.5 w-14 rounded-full bg-white/60" />
            <p className="mt-1.5 font-display text-sm font-semibold leading-tight text-white">{title}</p>
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-ink">{badge}</span>
        </div>
        {/* content rows */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-line bg-white p-2">
              <div className="h-6 rounded bg-bg-muted" />
              <div className="mt-1.5 h-1 w-full rounded-full bg-line-2" />
              <div className="mt-1 h-1 w-2/3 rounded-full bg-line-2" />
            </div>
          ))}
        </div>
      </div>
      {/* floating phone (responsive hint) */}
      <div className="absolute bottom-3 right-3 w-[52px] overflow-hidden rounded-[10px] border-2 border-white bg-white shadow-lg">
        <div className={cx("h-9 bg-gradient-to-br", accent)} />
        <div className="space-y-1 p-1.5">
          <div className="h-1 w-full rounded-full bg-line-2" />
          <div className="h-1 w-3/4 rounded-full bg-line-2" />
          <div className="mt-1 h-3 rounded bg-[#25D366]/20" />
        </div>
      </div>
    </div>
  );
}

export default BrowserMock;
