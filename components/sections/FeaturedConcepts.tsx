"use client";

import type { Concept } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConceptCard } from "@/components/concepts/ConceptCard";
import { RunningCarousel } from "@/components/ui/RunningCarousel";

export function FeaturedConcepts({ concepts }: { concepts: Concept[] }) {
  return (
    <section id="concepts" className="section-pad overflow-hidden bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built for your business."
          description="Real concepts across ten different industries — each a distinct look and feel."
        />

        <div className="mt-8 sm:mt-10">
          <RunningCarousel
            items={concepts}
            getKey={(concept) => concept.slug}
            variant="concept"
            renderItem={(concept) => <ConceptCard concept={concept} />}
          />
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center sm:mt-12">
          <Button href="/concepts/" variant="secondary" size="lg" arrow>
            See every concept in detail
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default FeaturedConcepts;
