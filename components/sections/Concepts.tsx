import { concepts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ConceptCard } from "@/components/concepts/ConceptCard";

// Homepage teaser. Shows the first four concepts and sends people to the full
// listing at /concepts. Replaces the old Portfolio section — same honest intent,
// richer model.
export function Concepts() {
  return (
    <section id="concepts" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            title="Concept websites, built to show what's possible"
            description="We're a young studio, so instead of borrowed logos we design honest concepts — each one a different industry, with its own look and feel. The same care goes into your business."
          />
          <Reveal delay={0.1}>
            <span className="chip">
              <Icon name="spark" size={14} className="text-accent" />
              Your business could be next
            </span>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {concepts.slice(0, 4).map((c) => (
            <StaggerItem key={c.slug}>
              <ConceptCard concept={c} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Button href="/concepts" variant="secondary" size="lg" arrow>
            See all {concepts.length} concepts
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default Concepts;
