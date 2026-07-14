import { individualServices } from "@/lib/data";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";

export function IndividualServices() {
  return (
    <section id="individual-services" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="À la carte"
          title="Need just one thing? Pick a service."
          description="Every service is a clear, fixed offer — you always see the price, the delivery time and exactly what's included before you decide."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {individualServices.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <article className="card card-hover group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white text-accent shadow-xs transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-glow">
                    <Icon name={s.icon as IconName} size={22} strokeWidth={1.7} />
                  </span>
                  <div className="text-right">
                    <div className="font-display text-lg font-semibold text-ink">
                      {s.priceNote === "starting" && (
                        <span className="mr-1 text-[12px] font-normal text-ink-3">from</span>
                      )}
                      {formatINR(s.price)}
                    </div>
                    <span className="mt-1 inline-flex items-center gap-1 text-[12px] text-ink-3">
                      <Icon name="clock" size={12} /> {s.delivery}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-1.5 text-body-sm text-ink-2">{s.desc}</p>

                <div className="my-5 h-px bg-line" />

                <ul className="mb-6 flex flex-1 flex-col gap-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2.5 text-body-sm text-ink-2">
                      <Icon name="check" size={15} strokeWidth={2.2} className="shrink-0 text-accent" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <Button href="#contact" variant="secondary" arrow className="w-full group-hover:border-accent/40 group-hover:text-accent">
                  Book Now
                </Button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default IndividualServices;
