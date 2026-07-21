import { Icon } from "@/components/ui/Icon";
import { BrowserMock } from "@/components/illustrations/BrowserMock";

// A calm, code-rendered hero scene for each service page: the shared
// BrowserMock plus one floating card themed to the service. CSS float
// animations only (reduced-motion is handled globally in globals.css).

const cardShell = "rounded-xl border border-line bg-white/95 p-3 shadow-lg backdrop-blur sm:rounded-2xl sm:p-3.5";

function FloatingCard({ id }: { id: string }) {
  switch (id) {
    case "google":
      return (
        <div className={cardShell}>
          <div className="flex items-start gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
              <Icon name="pin" size={18} />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-ink">Business profile preview</p>
              <p className="mt-1 text-[10px] text-ink-3">Hours · photos · directions</p>
              <p className="mt-1 text-[9px] font-medium uppercase tracking-wide text-accent">Illustrative example</p>
            </div>
          </div>
        </div>
      );
    case "whatsapp":
      return (
        <div className={cardShell}>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25D366] text-[#06240f]">
              <Icon name="whatsapp" size={13} />
            </span>
            <span className="text-[11px] font-semibold text-ink">WhatsApp preview</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-[#25D366]" />
          </div>
          <div className="space-y-1.5">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-bg-muted px-3 py-1.5 text-[11px] text-ink-2">Customer enquiry</div>
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[#DCFCE7] px-3 py-1.5 text-[11px] text-[#0b3d1e]">Saved reply</div>
          </div>
        </div>
      );
    case "store":
      return (
        <div className={cardShell}>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-3">
              <Icon name="cart" size={13} className="text-accent" /> Order workflow
            </span>
            <span className="rounded-full bg-accent-tint px-1.5 py-0.5 text-[10px] font-semibold text-accent">Example</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-ink">Products · checkout · alerts</p>
          <p className="mt-1 text-[10px] text-ink-3">Illustrative storefront preview</p>
        </div>
      );
    case "logo":
      return (
        <div className={cardShell}>
          <p className="text-[11px] font-medium text-ink-3">Brand kit</p>
          <div className="mt-2 flex items-center gap-1.5">
            {["bg-accent", "bg-[#ff7a3d]", "bg-ink", "bg-[#12b981]"].map((c) => (
              <span key={c} className={`h-6 w-6 rounded-full ${c}`} />
            ))}
          </div>
          <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">Aa</p>
        </div>
      );
    case "reviews":
      return (
        <div className={cardShell}>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#FFF3D6] text-[#FFB020]">
              <Icon name="star" size={14} strokeWidth={0} className="fill-current" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-ink">Review request ready</p>
              <p className="mt-0.5 text-[10px] text-ink-3">Share link · QR code</p>
            </div>
          </div>
        </div>
      );
    case "branding":
      return (
        <div className={cardShell}>
          <p className="text-[11px] font-medium text-ink-3">Brand kit</p>
          <div className="mt-2 flex items-center gap-1.5">
            {["bg-[#ec4899]", "bg-accent", "bg-ink", "bg-[#12b981]"].map((c) => (
              <span key={c} className={`h-6 w-6 rounded-full ${c}`} />
            ))}
          </div>
          <p className="mt-2 text-[10px] text-ink-3">Logo · colours · templates</p>
        </div>
      );
    case "marketplace":
      return (
        <div className={cardShell}>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-3">
              <Icon name="rocket" size={13} className="text-accent" /> Seller setup
            </span>
            <span className="rounded-full bg-accent-tint px-1.5 py-0.5 text-[10px] font-semibold text-accent">Example</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-ink">Amazon · Flipkart · Myntra</p>
          <p className="mt-1 text-[10px] text-ink-3">Docs · catalogue · account</p>
        </div>
      );
    case "automation":
    case "websites":
    default:
      return (
        <div className={cardShell}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink-3">Enquiry workflow</p>
            <span className="rounded-full bg-accent-tint px-1.5 py-0.5 text-[10px] font-semibold text-accent">Example</span>
          </div>
          <div className="mt-2 space-y-1.5 text-[10px] text-ink-2">
            <p className="rounded-md bg-bg-muted px-2 py-1">Website visit</p>
            <p className="rounded-md bg-accent-tint px-2 py-1 text-accent">Call · WhatsApp · form</p>
          </div>
        </div>
      );
  }
}

export function ServiceHeroVisual({ id, title, accent }: { id: string; title: string; accent: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md px-4 pt-4 sm:px-0 sm:pt-0">
      {/* soft accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl sm:h-64 sm:w-64" />
      <div className="animate-float-soft">
        <BrowserMock accent={accent} title={title} className="shadow-float" />
      </div>
      <div className="absolute right-0 top-0 w-36 animate-float-slow sm:-right-4 sm:-top-5 sm:w-48">
        <FloatingCard id={id} />
      </div>
    </div>
  );
}

export default ServiceHeroVisual;
