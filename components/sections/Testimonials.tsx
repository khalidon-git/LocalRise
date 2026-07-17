import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const perks = [
  "Priority delivery slot",
  "Special founding-partner price",
  "Extra hands-on support",
  "A real say in what we build",
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          eyebrow="Early days, honestly"
          title="We'd rather earn real reviews than invent them"
          description="We're a young studio, so you won't find stock photos and made-up five-star quotes here. Instead, be one of our first partners and get founder-level care."
        />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Founding partner offer */}
          <StaggerItem className="lg:col-span-1">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/30 bg-white p-7 shadow-lg ring-1 ring-accent/10">
              <div className="absolute inset-x-0 top-0 h-1 accent-gradient" />
              <span className="chip w-fit !border-accent/20 !bg-accent-tint !text-accent">
                <Icon name="spark" size={14} /> Founding Partner
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                Be one of our first 10 businesses
              </h3>
              <p className="mt-2 text-body-sm text-ink-2">
                Come on board early and we&apos;ll go above and beyond to make your launch a success story worth sharing.
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-body-sm font-medium text-ink">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-tint text-accent">
                      <Icon name="check" size={12} strokeWidth={2.6} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button href="#contact" arrow className="w-full">
                  Become a partner
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Coming soon placeholders */}
          {[0, 1].map((i) => (
            <StaggerItem key={i}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-line-2 bg-white/60 p-7">
                <Icon name="quote" size={30} className="text-line-2" />
                <div className="mt-4 space-y-2.5">
                  <div className="h-2.5 w-full rounded-full bg-line" />
                  <div className="h-2.5 w-11/12 rounded-full bg-line" />
                  <div className="h-2.5 w-4/5 rounded-full bg-line" />
                  <div className="h-2.5 w-2/3 rounded-full bg-line" />
                </div>
                <div className="mt-auto flex items-center gap-3 pt-8">
                  <div className="h-11 w-11 rounded-full bg-line" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-28 rounded-full bg-line" />
                    <div className="h-2 w-20 rounded-full bg-line-2" />
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-bg-muted px-3 py-1 text-[11px] font-medium text-ink-3">
                    <Icon name="clock" size={12} /> Coming soon
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-6 text-center text-body-sm text-ink-3">
          No paid reviews. No stock testimonials. Just honest work — and space here for your story.
        </Reveal>
      </div>
    </section>
  );
}

export default Testimonials;
