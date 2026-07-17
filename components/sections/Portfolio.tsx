import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { BrowserMock } from "@/components/BrowserMock";

export function Portfolio() {
  return (
    <section id="portfolio" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
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
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.title} — ${p.category}`}
                        width={1600}
                        height={1100}
                        loading="lazy"
                        className="aspect-[16/11] w-full rounded-xl border border-line object-cover object-top"
                      />
                    ) : (
                      <BrowserMock accent={p.accent} title={p.title} />
                    )}
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
