import { Icon, type IconName } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// A vivid, colourful illustrated tile for each industry: the industry's icon on
// a branded gradient with decorative shapes and little floating badges (review,
// location, chat) that hint at "found, trusted, contacted". Pure CSS + inline
// SVG icons — colour comes from the per-industry `accent` gradient.
export function IndustryVisual({ icon, accent }: { icon: IconName; accent: string }) {
  return (
    <div className={cx("relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg", accent)}>
      <div className="noise absolute inset-0 opacity-[0.12]" />
      {/* decorative shapes */}
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/15" />
      <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-black/5" />
      <div className="absolute right-10 bottom-8 h-14 w-14 rotate-12 rounded-2xl bg-white/15" />
      <div className="absolute left-8 top-10 h-3 w-3 rounded-full bg-white/50" />
      <div className="absolute right-24 top-16 h-2 w-2 rounded-full bg-white/50" />

      {/* centre emblem */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-24 w-24 place-items-center rounded-[1.75rem] bg-white shadow-xl">
          <Icon name={icon} size={44} strokeWidth={1.6} className="text-ink" />
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md">
        <Icon name="star" size={13} strokeWidth={0} className="fill-current text-[#FFB020]" />
        <span className="text-[11px] font-semibold text-ink">4.9</span>
      </div>
      <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md">
        <Icon name="pin" size={17} className="text-accent" />
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-md">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#25D366] text-[#06240f]">
          <Icon name="whatsapp" size={11} />
        </span>
        <span className="text-[11px] font-semibold text-ink">Chat</span>
      </div>
    </div>
  );
}

export default IndustryVisual;
