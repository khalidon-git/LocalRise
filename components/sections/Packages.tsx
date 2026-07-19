import { packages } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PackageCard } from "./PackageCard";
import { Icon } from "@/components/ui/Icon";

const guarantees = ["No hidden charges", "Free consultation first", "Friendly ongoing support"];

export function Packages() {
  return (
    <section id="packages" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Simple pricing."
          description="Clear packages. One-time prices."
        />

        <div className="mt-6 grid items-stretch gap-[var(--card-gap)] sm:mt-8 lg:grid-cols-3 lg:mt-10">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08} className="h-full">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-10">
          {guarantees.map((g) => (
            <span key={g} className="inline-flex items-center gap-2 text-body-sm font-medium text-ink-2">
              <Icon name="shield" size={16} className="text-accent" />
              {g}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default Packages;
