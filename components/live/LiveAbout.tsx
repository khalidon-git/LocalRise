import type { ConceptSite } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";
import { responsiveImageProps } from "@/components/live/liveTheme";

export function LiveAbout({ site }: { site: ConceptSite }) {
  const { about, theme } = site;
  return (
    <section id="story" className="lv-section" style={{ background: "var(--lv-bg-alt)" }}>
      <div className="lv-container">
        <div className={cx("grid gap-8 md:gap-10 lg:gap-16", about.image ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : "")}>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--lv-brand)]">{about.eyebrow}</p>
            <h2 className={cx("mt-3 text-heading-1 font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
              {about.title}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {about.body.map((p) => (
                <p key={p} className="max-w-lg text-base leading-relaxed text-[var(--lv-ink-muted)]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:flex-wrap">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <p className={cx("text-[1.9rem] font-semibold text-[var(--lv-ink)]", theme.headFont)}>{s.value}</p>
                  <p className="mt-0.5 text-sm text-[var(--lv-ink-muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {about.image && (
            <Reveal delay={0.1}>
              <div className={cx("aspect-[4/5] w-full overflow-hidden", theme.radius)}>
                <img
                  src={about.image.src}
                  alt={about.image.alt}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  {...responsiveImageProps(about.image.src, "(min-width: 1024px) 48vw, 100vw")}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default LiveAbout;
