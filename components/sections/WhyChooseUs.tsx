import { whyChooseUs, stats } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { gradient } from "@/lib/palette";
import { cx } from "@/lib/utils";

export function WhyChooseUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-bg-inverse section-pad text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 sm:h-96 [background:radial-gradient(60%_100%_at_50%_0%,rgba(47,91,255,0.22),transparent_70%)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={0.05}>
            <h2 className="font-display text-heading-1 font-semibold text-white">
              The reasons businesses stay with us
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-ink-inverse-2">
              Not years of buzzwords — just the things that actually matter when you&apos;re trusting someone with your business.
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <Stagger className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-12 sm:gap-6 sm:p-6 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{s.value}</p>
              <p className="mt-1.5 text-body-sm text-ink-inverse-2">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* reasons */}
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((r, i) => {
            const feature = i === 0;
            return (
              <StaggerItem key={r.title} className={cx(feature && "sm:col-span-2 lg:col-span-2")}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] sm:p-6">
                  <span className={cx("grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", gradient(i))}>
                    <Icon name={r.icon as IconName} size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className={cx("mt-5 font-display font-semibold tracking-tight text-white", feature ? "text-2xl" : "text-lg")}>
                    {r.title}
                  </h3>
                  <p className={cx("mt-2 text-ink-inverse-2", feature ? "text-body max-w-md" : "text-body-sm")}>{r.desc}</p>
                </div>
              </StaggerItem>
            );
          })}

          {/* CTA tile fills the grid */}
          <StaggerItem>
            <SmartLink
              href="/contact/"
              className="group flex min-h-48 h-full flex-col justify-between rounded-2xl accent-gradient p-5 text-white shadow-glow transition-transform duration-500 ease-premium hover:-translate-y-0.5 sm:p-6"
            >
              <div>
                <p className="font-display text-xl font-semibold">Ready to grow?</p>
                <p className="mt-2 text-body-sm text-white/85">Book a free consultation and get a clear plan for your business.</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold">
                Let&apos;s talk
                <Icon name="arrow-right" size={18} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1" />
              </span>
            </SmartLink>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

export default WhyChooseUs;
