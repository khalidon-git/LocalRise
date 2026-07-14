import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/utils";

function ProjectPreview({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-line bg-bg-subtle">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      </div>
      <div className="p-3.5">
        {/* hero banner */}
        <div className={cx("relative flex h-[46%] min-h-[92px] items-end overflow-hidden rounded-lg bg-gradient-to-br p-3.5", accent)}>
          <div className="noise absolute inset-0 opacity-[0.12]" />
          <div className="relative">
            <div className="h-1.5 w-14 rounded-full bg-white/60" />
            <p className="mt-1.5 font-display text-sm font-semibold leading-tight text-white">{title}</p>
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-ink">Book now</span>
        </div>
        {/* content rows */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-line bg-white p-2">
              <div className="h-6 rounded bg-bg-muted" />
              <div className="mt-1.5 h-1 w-full rounded-full bg-line-2" />
              <div className="mt-1 h-1 w-2/3 rounded-full bg-line-2" />
            </div>
          ))}
        </div>
      </div>
      {/* floating phone (responsive hint) */}
      <div className="absolute bottom-3 right-3 w-[52px] overflow-hidden rounded-[10px] border-2 border-white bg-white shadow-lg">
        <div className={cx("h-9 bg-gradient-to-br", accent)} />
        <div className="space-y-1 p-1.5">
          <div className="h-1 w-full rounded-full bg-line-2" />
          <div className="h-1 w-3/4 rounded-full bg-line-2" />
          <div className="mt-1 h-3 rounded bg-[#25D366]/20" />
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title="Concept projects, crafted with care"
            description="We're a young studio, so instead of borrowed logos we show honest demo projects — the same quality we'll bring to your business."
          />
          <Reveal delay={0.1}>
            <span className="chip">
              <Icon name="spark" size={14} className="text-accent" />
              Your business could be next
            </span>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <article className="card card-hover group overflow-hidden p-3">
                <div className="relative">
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                    Demo Project
                  </span>
                  <div className="transition-transform duration-700 ease-premium group-hover:scale-[1.02]">
                    <ProjectPreview accent={p.accent} title={p.title} />
                  </div>
                </div>
                <div className="p-4 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-eyebrow uppercase text-accent">{p.category}</span>
                    <Icon name="arrow-up-right" size={18} className="text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-body-sm text-ink-2">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-bg-muted px-2.5 py-1 text-[12px] font-medium text-ink-2">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-line bg-bg-subtle p-6 text-center">
          <p className="text-body text-ink-2">
            Every project includes a full look — <span className="font-medium text-ink">desktop, tablet &amp; mobile</span>, logo,
            landing page, business cards and social media templates.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Portfolio;
