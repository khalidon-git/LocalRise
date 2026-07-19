import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function LiveServices({ site }: { site: ConceptSite }) {
  const { services, theme } = site;
  return (
    <section id="services" className="lv-section">
      <div className="lv-container">
        <Reveal>
          <h2 className={cx("text-heading-2 font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {services.heading}
          </h2>
          {services.subheading && <p className="mt-2 max-w-lg text-base text-[var(--lv-ink-muted)]">{services.subheading}</p>}
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className={cx("h-full border p-5 transition-transform duration-500 ease-premium hover:-translate-y-1 sm:p-6", theme.radius)} style={{ borderColor: "var(--lv-line)", background: "var(--lv-surface)" }}>
                <span
                  className={cx("grid h-11 w-11 place-items-center", theme.radius === "rounded-none" ? "rounded-none" : "rounded-full")}
                  style={{ background: "var(--lv-brand-soft)", color: "var(--lv-brand)" }}
                >
                  <Icon name={item.icon} size={20} strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--lv-ink)]">{item.title}</h3>
                <p className="mt-1.5 text-body-sm leading-relaxed text-[var(--lv-ink-muted)]">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default LiveServices;
