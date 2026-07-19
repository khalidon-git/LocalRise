import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

// Contact info renders as plain text, never as functional tel:/mailto: links —
// this is a fictional business, so nothing here should imply a live channel.
// See knowledge/decisions/007-concept-live-sites.md.
export function LiveContact({ site }: { site: ConceptSite }) {
  const { contact, theme } = site;
  const rows: { icon: "mail" | "phone" | "clock" | "pin"; label: string; value: string }[] = [
    { icon: "mail", label: "Email", value: contact.email },
    { icon: "phone", label: "Phone", value: contact.phone },
    { icon: "clock", label: "Hours", value: contact.hours },
    { icon: "pin", label: "Location", value: contact.location },
  ];

  return (
    <section id="contact" className="lv-section" style={{ background: "var(--lv-bg-alt)" }}>
      <div className="lv-container">
        <div className={cx("overflow-hidden border", theme.radius)} style={{ borderColor: "var(--lv-line)", background: "var(--lv-surface)" }}>
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-10 xl:gap-16 xl:p-12">
            <Reveal>
              <h2 className={cx("text-heading-2 font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
                {contact.heading}
              </h2>
              <p className="mt-3 max-w-sm text-body leading-relaxed text-[var(--lv-ink-muted)]">{contact.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid gap-4 sm:grid-cols-2">
                {rows.map((r) => (
                  <div key={r.label} className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "var(--lv-brand-soft)", color: "var(--lv-brand)" }}>
                      <Icon name={r.icon} size={16} strokeWidth={1.8} />
                    </span>
                    <div>
                      <dt className="text-sm uppercase tracking-wide text-[var(--lv-ink-muted)]">{r.label}</dt>
                      <dd className="mt-0.5 break-words text-body-sm font-medium text-[var(--lv-ink)]">{r.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LiveContact;
