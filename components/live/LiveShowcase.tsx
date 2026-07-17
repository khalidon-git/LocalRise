import type { ConceptSite } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

// Renders the industry-specific section for the nine photography-led concepts
// (menu/treatments/rooms/listings/programs/lookbook/projects/packages) — one
// card grid, price/meta styled the same way regardless of `kind`, because the
// real differentiation already comes from theme + copy + imagery, not a
// different grid shape per industry. SaaS uses LiveDashboardSection +
// LivePricing instead (see LiveSite.tsx).
export function LiveShowcase({ site }: { site: ConceptSite }) {
  const showcase = site.showcase;
  if (!showcase) return null;
  const { theme } = site;

  return (
    <section id="work" className="lv-section" style={{ background: "var(--lv-bg-alt)" }}>
      <div className="lv-container">
        <Reveal>
          <h2 className={cx("text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {showcase.heading}
          </h2>
          {showcase.subheading && <p className="mt-2 max-w-lg text-[15px] text-[var(--lv-ink-muted)]">{showcase.subheading}</p>}
        </Reveal>

        <Stagger className={cx("mt-10 grid gap-6", showcase.items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
          {showcase.items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="group h-full">
                <div className={cx("aspect-[4/5] w-full overflow-hidden", theme.radius)}>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={900}
                    height={1125}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-[var(--lv-ink)]">{item.title}</h3>
                    <p className="mt-0.5 text-[12.5px] text-[var(--lv-ink-muted)]">{item.meta}</p>
                  </div>
                  {item.price && <span className="shrink-0 text-[13px] font-semibold text-[var(--lv-brand)]">{item.price}</span>}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default LiveShowcase;
