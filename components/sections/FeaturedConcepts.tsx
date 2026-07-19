"use client";

import type { Concept } from "@/lib/content";
import { useMarquee } from "@/hooks/useMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConceptCard } from "@/components/concepts/ConceptCard";

// Homepage concept showcase — all ten concepts in one continuously drifting
// marquee (see useMarquee), not the discrete-snap useCarousel. Reuses the same
// ConceptCard the /concepts listing uses, unchanged, so the two surfaces stay
// in sync.
//
// "use client" (the marquee needs effects/refs), but the `concepts` array is
// passed in from the server page rather than imported here, so the ten
// concepts' prose travels in the RSC payload and never bloats the homepage's
// client JS bundle.
//
// The set is rendered twice back-to-back: useMarquee wraps by exactly one
// period, so the loop reset lands on pixel-identical content and is invisible.
export function FeaturedConcepts({ concepts }: { concepts: Concept[] }) {
  // Roughly two cards on desktop, one-and-a-peek on mobile (basis below).
  const { containerRef } = useMarquee<HTMLDivElement>({ speed: 28, itemCount: concepts.length });

  return (
    <section id="concepts" className="section-pad overflow-hidden bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built for your business."
          description="Real concepts across ten different industries — each a distinct look and feel."
        />

        {/* Continuous marquee track: native touch-swipe + trackpad scroll, mouse
            drag from useMarquee, autoplay paused on hover/focus. pb-6/pt-2 give
            the card shadow and the phone-mockup overhang room so nothing clips. */}
        <div
          ref={containerRef}
          className="no-scrollbar mt-8 flex cursor-grab select-none gap-4 overflow-x-auto px-1 pb-6 pt-2 sm:mt-10 sm:gap-5 lg:gap-6"
          role="group"
          aria-label="Concept websites — drag or swipe to explore"
        >
          {[0, 1].map((copy) =>
            concepts.map((concept) => (
              <div
                key={`${concept.slug}-${copy}`}
                className="shrink-0 basis-[85%] sm:basis-[55%] lg:basis-[47%]"
                aria-hidden={copy === 1 || undefined}
              >
                <ConceptCard concept={concept} />
              </div>
            )),
          )}
        </div>

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
