import type { ConceptSite } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { LiveButton } from "@/components/live/LiveButton";
import { cx } from "@/lib/utils";

export function LivePricing({ site }: { site: ConceptSite }) {
  const pricing = site.pricing;
  if (!pricing) return null;
  const { theme } = site;

  return (
    <section id="pricing" className="lv-section">
      <div className="lv-container">
        <Reveal className="text-center">
          <h2 className={cx("text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
            {pricing.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-[var(--lv-ink-muted)]">{pricing.subheading}</p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={cx("relative flex h-full flex-col border p-7", theme.radius, tier.highlighted && "shadow-xl")}
                style={{
                  borderColor: tier.highlighted ? "var(--lv-brand)" : "var(--lv-line)",
                  background: tier.highlighted ? "var(--lv-brand-soft)" : "var(--lv-surface)",
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-3 left-7 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide"
                    style={{ background: "var(--lv-brand)", color: "var(--lv-brand-ink)" }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="text-[15px] font-semibold text-[var(--lv-ink)]">{tier.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className={cx("text-[2.1rem] font-semibold text-[var(--lv-ink)]", theme.headFont)}>{tier.price}</span>
                  {tier.period && <span className="text-[13px] text-[var(--lv-ink-muted)]">{tier.period}</span>}
                </p>
                <p className="mt-2 text-[13.5px] text-[var(--lv-ink-muted)]">{tier.description}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13.5px] text-[var(--lv-ink)]">
                      <Icon name="check" size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-[var(--lv-brand)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <LiveButton href="#contact" radius={theme.radius} variant={tier.highlighted ? "solid" : "outline"} className="mt-6 w-full">
                  Get started
                </LiveButton>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default LivePricing;
