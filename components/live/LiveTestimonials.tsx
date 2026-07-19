import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function LiveTestimonials({ site }: { site: ConceptSite }) {
  const { testimonials, theme } = site;
  return (
    <section id="testimonials" className="lv-section" style={{ background: "var(--lv-bg-alt)" }}>
      <div className="lv-container">
        <Reveal>
          <h2 className={cx("text-heading-2 font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {testimonials.heading}
          </h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t) => (
            <StaggerItem key={t.name}>
              <div className={cx("flex h-full flex-col border p-5 sm:p-6", theme.radius)} style={{ borderColor: "var(--lv-line)", background: "var(--lv-surface)" }}>
                <Icon name="quote" size={22} style={{ color: "var(--lv-brand)" }} />
                <p className="mt-3 flex-1 text-body-sm leading-relaxed text-[var(--lv-ink)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5">
                  <p className="text-body-sm font-semibold text-[var(--lv-ink)]">{t.name}</p>
                  <p className="text-sm text-[var(--lv-ink-muted)]">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default LiveTestimonials;
