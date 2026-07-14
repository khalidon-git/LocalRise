import { process } from "@/lib/data";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="A clear path from idea to launch"
          description="No confusion, no jargon. You always know exactly what's happening and what comes next."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* connector line */}
          <div
            className="absolute bottom-6 left-[27px] top-4 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent sm:left-[31px]"
            aria-hidden="true"
          />
          <ol className="space-y-4">
            {process.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 0.05}>
                  <div className="group relative flex items-start gap-5 sm:gap-6">
                    {/* node */}
                    <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-white shadow-sm transition-all duration-500 ease-premium group-hover:border-accent/40 group-hover:shadow-glow sm:h-16 sm:w-16">
                      <Icon name={step.icon as IconName} size={24} strokeWidth={1.7} className="text-accent" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">
                        {step.n}
                      </span>
                    </div>
                    {/* content */}
                    <div className="flex-1 rounded-2xl border border-line bg-white p-5 shadow-xs transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:shadow-md sm:p-6">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-body-sm text-ink-2">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Process;
