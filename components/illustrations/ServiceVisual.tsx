import type { ServiceVisualKind } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";

// The banner visual for each individual-service card (components/sections/
// IndividualServices.tsx). "website" is a real captured screenshot of a
// concept live site (see docs/concepts.md). Six more kinds (maps, chat,
// brand, brandkit, automation, marketplace) use real supplied photos from
// public/services/ — see PHOTO_BY_KIND. "shop" and "reviews" have no source
// photo yet, so they keep a code-rendered illustrative mockup rather than
// showing nothing.
const PHOTO_BY_KIND: Partial<Record<ServiceVisualKind, { src: string; alt: string; width: number; height: number }>> = {
  maps: { src: "/services/google.jpg", alt: "Google Business Profile setup", width: 900, height: 673 },
  chat: { src: "/services/whatsapp.jpg", alt: "WhatsApp Business setup", width: 900, height: 506 },
  brand: { src: "/services/logo.jpg", alt: "Logo design", width: 900, height: 578 },
  brandkit: { src: "/services/brandkit.jpg", alt: "Business branding kit", width: 900, height: 544 },
  automation: { src: "/services/automation.jpg", alt: "Business automation", width: 900, height: 502 },
  marketplace: { src: "/services/marketplace.jpg", alt: "Marketplace registration", width: 900, height: 491 },
};

export function ServiceVisual({ kind, accent, className }: { kind: ServiceVisualKind; accent: string; className?: string }) {
  if (kind === "website") return <WebsiteVisual className={className} />;

  const photo = PHOTO_BY_KIND[kind];
  if (photo) return <PhotoVisual {...photo} className={className} />;

  return (
    <div className={cx("relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br", accent, className)}>
      <div className="noise absolute inset-0 opacity-[0.08]" />
      {kind === "shop" && <ShopVisual />}
      {kind === "reviews" && <ReviewsVisual />}
    </div>
  );
}

function PhotoVisual({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={cx("relative h-full w-full overflow-hidden bg-bg-subtle", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- output: export has no image loader */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
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

export default ServiceVisual;
