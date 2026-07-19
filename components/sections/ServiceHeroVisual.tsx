import { Icon } from "@/components/ui/Icon";
import { BrowserMock } from "@/components/BrowserMock";

// A calm, code-rendered hero scene for each service page: the shared
// BrowserMock plus one floating card themed to the service. CSS float
// animations only (reduced-motion is handled globally in globals.css).

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#FFB020]">
      {Array.from({ length: n }).map((_, i) => (
        <Icon key={i} name="star" size={11} strokeWidth={0} className="fill-current" />
      ))}
    </span>
  );
}

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
              <p className="text-[12px] font-semibold text-ink">Your Business</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-ink">4.9</span>
                <Stars />
              </div>
              <p className="mt-1 text-[10px] text-ink-3">Open now · 2.1 km</p>
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
            <span className="text-[11px] font-semibold text-ink">WhatsApp</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-[#25D366]" />
          </div>
          <div className="space-y-1.5">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-bg-muted px-3 py-1.5 text-[11px] text-ink-2">Are you open today?</div>
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[#DCFCE7] px-3 py-1.5 text-[11px] text-[#0b3d1e]">Yes! Till 9pm 🙌</div>
          </div>
        </div>
      );
    case "store":
      return (
        <div className={cardShell}>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-3">
              <Icon name="cart" size={13} className="text-accent" /> New order
            </span>
            <span className="rounded-full bg-[#e7f8ef] px-1.5 py-0.5 text-[10px] font-semibold text-[#12b981]">Paid</span>
          </div>
          <p className="mt-1 font-display text-lg font-semibold text-ink">₹1,249</p>
          <p className="text-[10px] text-ink-3">2 items · WhatsApp checkout</p>
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
              <p className="text-[11px] font-semibold text-ink">+3 new reviews</p>
              <Stars />
            </div>
          </div>
        </div>
      );
    case "automation":
    case "websites":
    default:
      return (
        <div className={cardShell}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink-3">Visitors this month</p>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-[#e7f8ef] px-1.5 py-0.5 text-[10px] font-semibold text-[#12b981]">
              <Icon name="arrow-up-right" size={10} strokeWidth={2.4} /> 128%
            </span>
          </div>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">3,248</p>
          <div className="mt-2 flex h-8 items-end gap-1">
            {[35, 50, 42, 65, 58, 78, 70, 92, 84, 100].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-accent/30 to-accent" style={{ height: `${h}%` }} />
            ))}
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
