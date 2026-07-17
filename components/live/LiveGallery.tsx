import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function LiveGallery({ site }: { site: ConceptSite }) {
  const { gallery, theme } = site;

  return (
    <section id="gallery" className="lv-section">
      <div className="lv-container">
        <Reveal>
          <h2 className={cx("text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {gallery.heading}
          </h2>
          {gallery.subheading && <p className="mt-2 max-w-lg text-[15px] text-[var(--lv-ink-muted)]">{gallery.subheading}</p>}
        </Reveal>

        {gallery.variant === "device" ? (
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
            {(gallery.deviceLabels ?? []).map((label) => (
              <StaggerItem key={label}>
                <div className={cx("flex aspect-[4/3] flex-col items-center justify-center gap-3 border", theme.radius)} style={{ borderColor: "var(--lv-line)", background: "var(--lv-surface)" }}>
                  <span className="grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--lv-brand-soft)", color: "var(--lv-brand)" }}>
                    <Icon name="layers" size={22} strokeWidth={1.6} />
                  </span>
                  <span className="text-[13.5px] font-medium text-[var(--lv-ink)]">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.images.map((image, i) => (
              <StaggerItem key={image.src + i} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <div className={cx("h-full w-full overflow-hidden", i === 0 ? "aspect-square lg:aspect-auto" : "aspect-square", theme.radius)}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={1000}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium hover:scale-[1.04]"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}

export default LiveGallery;
