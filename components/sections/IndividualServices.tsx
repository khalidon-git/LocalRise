"use client";

import { homepageServices } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RunningCarousel } from "@/components/ui/RunningCarousel";
import { ServiceCard } from "@/components/sections/ServiceCard";

export function IndividualServices() {
  return (
    <section id="services" className="section-pad overflow-hidden">
      <div className="container-x">
        <SectionHeading title="Everything your business needs online." />

        <div className="mt-6 sm:mt-8 lg:mt-10">
          <RunningCarousel
            items={homepageServices}
            getKey={(s) => s.title}
            variant="service"
            renderItem={(s) => <ServiceCard service={s} />}
          />
        </div>

        {/* Below the carousel (never inside the track) — secondary to each
            card's Book Now, links to the full /services/ grid. */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button href="/services/" variant="secondary" size="lg" arrow>
            See All Services
          </Button>
        </div>
      </div>
    </section>
  );
}

export default IndividualServices;
