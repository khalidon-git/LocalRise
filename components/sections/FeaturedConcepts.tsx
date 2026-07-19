import { concepts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConceptCard } from "@/components/concepts/ConceptCard";

// Homepage concept showcase — the full set of ten concepts in a compact
// two-up grid (one per row on mobile), reusing the same ConceptCard the
// /concepts listing uses so the two surfaces stay in sync.
//
// This is a plain *server* component: a static grid, no carousel, so there's
// nothing client-side to hydrate. That also means importing the full `concepts`
// array here is free — its prose never reaches the client bundle. (The previous
// version was a "use client" autoplay carousel, which is why it took a hand-
// picked `featured` subset as a prop to keep those ten concepts' text out of
// the homepage's client JS; a server component has no such constraint.)
//
// The grid is capped at max-w-[1080px] and centred so each card lands around
// ~520px on desktop — comfortably two per row without the screenshots growing
// oversized. ConceptCard owns its own responsive padding and the phone-mockup
// overhang, so no clipping/overflow handling is needed here (see /concepts).
export function FeaturedConcepts() {
  return (
    <section id="concepts" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built for your business."
          description="Real concepts across ten different industries — each a distinct look and feel."
        />

        <Stagger amount={0.03} className="mx-auto mt-8 grid max-w-[1080px] gap-5 sm:mt-10 sm:grid-cols-2 lg:gap-6">
          {concepts.map((concept) => (
            <StaggerItem key={concept.slug}>
              <ConceptCard concept={concept} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex justify-center sm:mt-12">
          <Button href="/concepts" variant="secondary" size="lg" arrow>
            See every concept in detail
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default FeaturedConcepts;
