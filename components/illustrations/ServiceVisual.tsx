import type { ServiceVisualKind } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// The banner visual for each individual-service card (components/sections/
// IndividualServices.tsx). One component, nine kinds — same pattern as
// ConceptMock's layout variants: keeps every card visually distinct without
// nine separate files. All pure markup (no client JS), safe in a server
// component. "website" is the one real photograph (a real captured
// screenshot of a concept live site, see docs/concepts.md) — everything else
// is a code-rendered illustrative mockup, keeping the zero-image-weight
// philosophy for every service that isn't literally "look at a real site."
export function ServiceVisual({ kind, accent, className }: { kind: ServiceVisualKind; accent: string; className?: string }) {
  if (kind === "website") return <WebsiteVisual className={className} />;

  return (
    <div className={cx("relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br", accent, className)}>
      <div className="noise absolute inset-0 opacity-[0.08]" />
      {kind === "maps" && <MapsVisual />}
      {kind === "chat" && <ChatVisual />}
      {kind === "shop" && <ShopVisual />}
      {kind === "brand" && <BrandVisual />}
      {kind === "brandkit" && <BrandKitVisual />}
      {kind === "reviews" && <ReviewsVisual />}
      {kind === "automation" && <AutomationVisual />}
      {kind === "marketplace" && <MarketplaceVisual />}
    </div>
  );
}

function WebsiteVisual({ className }: { className?: string }) {
  return (
    <div className={cx("relative h-full w-full overflow-hidden bg-white", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded bg-bg-subtle px-2 py-0.5 text-[9px] text-ink-3">
          a real business site we built
        </span>
      </div>
      <img
        src="/concepts-shots/casa-alma-desktop.jpg"
        alt="A real website LocalRise built — example homepage"
        width={1120}
        height={720}
        loading="lazy"
        decoding="async"
        className="h-[calc(100%-33px)] w-full object-cover object-top"
      />
    </div>
  );
}

function MapsVisual() {
  return (
    <div className="dotgrid relative flex h-full w-full items-center justify-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-ink shadow-lg">
        <Icon name="pin" size={28} strokeWidth={1.6} />
      </span>
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600">
          <Icon name="star" size={14} strokeWidth={0} className="fill-current" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 w-3/4 rounded-full bg-ink/15" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-ink/10" />
        </div>
        <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">Open</span>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-2 p-4">
      <div className="max-w-[78%] self-start rounded-2xl rounded-bl-sm bg-white/95 px-3 py-2 text-[11px] text-ink shadow-md">
        Are you open today?
      </div>
      <div className="max-w-[78%] self-end rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-[11px] text-white shadow-md">
        Yes! Open till 9pm 😊
      </div>
      <div className="mt-1 flex items-center gap-1.5 self-start rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-medium text-ink-2 shadow">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> typing…
      </div>
    </div>
  );
}

function ShopVisual() {
  return (
    <div className="relative grid h-full w-full grid-cols-2 gap-2.5 p-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-xl bg-white/90 p-2 shadow-md">
          <div className="aspect-square w-full rounded-lg bg-ink/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-ink/20" />
        </div>
      ))}
      <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-lg">
        <Icon name="cart" size={17} strokeWidth={1.8} />
      </span>
    </div>
  );
}

function BrandVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <span className="grid h-16 w-16 place-items-center rounded-3xl bg-white/95 text-ink shadow-lg">
        <span className="font-display text-2xl font-bold">Aa</span>
      </span>
      <div className="flex gap-2">
        {["bg-white", "bg-white/70", "bg-white/45", "bg-white/25"].map((c, i) => (
          <span key={i} className={cx("h-5 w-5 rounded-full ring-1 ring-white/40", c)} />
        ))}
      </div>
    </div>
  );
}

function BrandKitVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 p-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/95 text-ink shadow-lg">
        <span className="font-display text-xl font-bold">Aa</span>
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <div className="aspect-[1.6/1] w-full rounded-lg bg-white/90 p-2 shadow-md">
          <div className="h-1.5 w-1/2 rounded-full bg-ink/20" />
          <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-ink/10" />
        </div>
        <div className="flex gap-1.5">
          {["bg-white", "bg-white/70", "bg-white/40"].map((c, i) => (
            <span key={i} className={cx("h-4 w-4 rounded-full", c)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-bold text-white">4.9</span>
        <div className="flex gap-0.5 text-white">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={13} strokeWidth={0} className="fill-current" />
          ))}
        </div>
      </div>
      <div className="flex w-3/5 flex-col gap-1.5">
        {[0.9, 0.6].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/40" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-px w-2/3 bg-white/30" />
      <div className="absolute flex w-2/3 justify-between">
        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
      </div>
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/95 text-ink shadow-lg">
        <Icon name="bolt" size={26} strokeWidth={1.6} />
      </span>
    </div>
  );
}

function MarketplaceVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex h-11 w-11 flex-col gap-1 rounded-lg bg-white/90 p-1.5 shadow-md">
            <div className="flex-1 rounded bg-ink/10" />
          </div>
        ))}
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/95 text-emerald-600 shadow-md">
          <Icon name="check" size={18} strokeWidth={2.4} />
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Amazon", "Flipkart", "Myntra"].map((p) => (
          <span key={p} className="rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-ink shadow">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ServiceVisual;
