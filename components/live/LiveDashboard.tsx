import type { ConceptSite } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

// Code-rendered product dashboard for the SaaS concept (Flowstack) — the brief
// asks for "modern dashboard illustrations and product mockups" rather than
// photography for a SaaS vertical, and a real stock photo of a "dashboard"
// reads as fake in a way that code-rendered UI, done well, doesn't. Same
// philosophy as components/concepts/ConceptMock.tsx: pure markup, no image
// bytes, safe in a server component.
export function LiveDashboardPanel({ site }: { site: ConceptSite }) {
  const d = site.dashboard;
  if (!d) return null;
  const max = Math.max(...d.chartValues);

  return (
    <div className={cx("overflow-hidden border shadow-2xl", site.theme.radius)} style={{ borderColor: "var(--lv-line)" }}>
      {/* chrome bar */}
      <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: "var(--lv-line)", background: "var(--lv-bg-alt)" }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 rounded px-2 py-0.5 text-[11px] text-[var(--lv-ink-muted)]" style={{ background: "var(--lv-surface)" }}>
          app.{site.domain}
        </span>
      </div>

      <div className="grid gap-px sm:grid-cols-[180px_1fr]" style={{ background: "var(--lv-line)" }}>
        {/* sidebar */}
        <div className="hidden flex-col gap-1 p-4 sm:flex" style={{ background: "var(--lv-bg-alt)" }}>
          {["Dashboard", "Workflows", "Integrations", "Settings"].map((label, i) => (
            <div
              key={label}
              className={cx("rounded-lg px-3 py-2 text-[12.5px] font-medium", i === 0 ? "text-[var(--lv-brand-ink)]" : "text-[var(--lv-ink-muted)]")}
              style={i === 0 ? { background: "var(--lv-brand)" } : undefined}
            >
              {label}
            </div>
          ))}
        </div>

        {/* main */}
        <div className="p-5 sm:p-6" style={{ background: "var(--lv-surface)" }}>
          <div className="grid gap-3 sm:grid-cols-3">
            {d.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border p-3.5" style={{ borderColor: "var(--lv-line)" }}>
                <p className="text-[11px] text-[var(--lv-ink-muted)]">{m.label}</p>
                <p className="mt-1 text-[20px] font-semibold text-[var(--lv-ink)]">{m.value}</p>
                <p className={cx("mt-0.5 text-[11px] font-medium", m.up ? "text-emerald-500" : "text-[var(--lv-brand)]")}>{m.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--lv-line)" }}>
            <p className="text-[11.5px] font-medium text-[var(--lv-ink-muted)]">{d.chartLabel}</p>
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {d.chartValues.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ height: `${(v / max) * 100}%`, background: "var(--lv-brand)", opacity: 0.4 + (i / d.chartValues.length) * 0.6 }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border" style={{ borderColor: "var(--lv-line)" }}>
            <p className="border-b px-4 py-2.5 text-[11.5px] font-medium text-[var(--lv-ink-muted)]" style={{ borderColor: "var(--lv-line)" }}>
              {d.panelTitle}
            </p>
            {d.panelRows.map((row) => (
              <div key={row.name} className="flex items-center justify-between border-b px-4 py-2.5 text-[12.5px] last:border-0" style={{ borderColor: "var(--lv-line)" }}>
                <span className="text-[var(--lv-ink)]">{row.name}</span>
                <span className="flex items-center gap-2">
                  <StatusPill status={row.status} />
                  <span className="text-[var(--lv-ink-muted)]">{row.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "On track" ? "bg-emerald-500/15 text-emerald-500" : status === "At risk" ? "bg-amber-500/15 text-amber-500" : "bg-red-500/15 text-red-500";
  return <span className={cx("rounded-full px-2 py-0.5 text-[10.5px] font-medium", tone)}>{status}</span>;
}

/** Full "#work" section for SaaS: heading + the dashboard panel, mirrors LiveShowcase's slot. */
export function LiveDashboardSection({ site }: { site: ConceptSite }) {
  const d = site.dashboard;
  if (!d) return null;
  return (
    <section id="work" className="lv-section">
      <div className="lv-container">
        <Reveal>
          <h2 className={cx("text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold text-[var(--lv-ink)]", site.theme.headFont, site.theme.tracking)}>
            {d.heading}
          </h2>
          <p className="mt-2 max-w-lg text-[15px] text-[var(--lv-ink-muted)]">{d.subheading}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <LiveDashboardPanel site={site} />
        </Reveal>
      </div>
    </section>
  );
}

export default LiveDashboardPanel;
