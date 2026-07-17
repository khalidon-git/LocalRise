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
          eyebrow="Packages"
          title="Simple pricing. No surprises."
          description="Pick the package that fits where your business is today. One-time price, clearly explained — tap any feature to see what it means."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08} className="h-full">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
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
