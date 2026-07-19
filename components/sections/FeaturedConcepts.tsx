import { concepts } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { ScreenshotMock } from "@/components/concepts/ScreenshotMock";
import { ScreenshotPhone } from "@/components/concepts/ScreenshotPhone";
import { SmartLink } from "@/components/ui/SmartLink";
import { cx } from "@/lib/utils";

// Curated homepage teaser — two real concepts, not the full ten. The complete
// library lives at /concepts/ (ConceptCard grid); this section's only job is
// to prove the craft fast and point people there. Replaces the old
// industry-selector panel (Industries.tsx), which put all ten behind a tab UI.
const featuredSlugs = ["noir-and-vine", "meridian-dental"] as const;

const iconBySlug: Record<string, IconName> = {
  "noir-and-vine": "utensils",
  "meridian-dental": "stethoscope",
};

export function FeaturedConcepts() {
  const featured = featuredSlugs
    .map((slug) => concepts.find((c) => c.slug === slug))
    .filter((c): c is (typeof concepts)[number] => Boolean(c));

  return (
    <section id="concepts" className="section-pad bg-bg-subtle">
      <div className="container-x">
        <SectionHeading
          title="Built for your business."
          description="Real concepts for different industries."
        />

        <Stagger amount={0.15} className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2 lg:gap-8 lg:mt-10">
          {featured.map((concept) => {
            const liveHref = `/concepts/${concept.slug}/live`;
            const icon = iconBySlug[concept.slug];

            return (
              <StaggerItem key={concept.slug}>
                {/* No overflow-hidden on the card or the screenshot link: the
                    phone mockup deliberately overhangs the screenshot's
                    corner, and clipping it here was cutting it off. Rounding/
                    clipping for the screenshot image itself lives inside
                    ScreenshotMock, which is the actual media frame. */}
                <article className="card group flex h-full flex-col p-3 sm:p-4">
                  <SmartLink href={liveHref} className="relative block" aria-label={`Open the ${concept.name} live preview`}>
                    <div className="relative transition-transform duration-700 ease-premium group-hover:scale-[1.015]">
                      <ScreenshotMock concept={concept} />
                      <ScreenshotPhone
                        concept={concept}
                        className="absolute -bottom-5 -right-3 hidden w-24 shrink-0 sm:block lg:w-28"
                      />
                    </div>
                  </SmartLink>

                  <div className="flex flex-1 flex-col p-3 pt-6 sm:p-4 sm:pt-7">
                    <div className="flex items-center gap-3">
                      <span className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md", concept.identity.gradient)}>
                        <Icon name={icon} size={20} strokeWidth={1.7} />
                      </span>
                      <span className="text-label font-semibold uppercase tracking-wider text-accent">
                        {concept.industry}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-heading-3 font-semibold text-ink">{concept.name}</h3>
                    <p className="mt-2 text-body text-ink-2">{concept.summary}</p>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      <Button href={liveHref} size="md" variant="dark" icon="browser" className="w-full">
                        Live Preview
                      </Button>
                      <ConversationButton
                        start={{
                          channel: "whatsapp",
                          type: "concept",
                          conceptName: concept.name,
                          meta: { section: "featured-concepts", button: concept.slug },
                        }}
                        size="md"
                        variant="secondary"
                        className="w-full"
                      >
                        Build Something Similar
                      </ConversationButton>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex justify-center sm:mt-12">
          <Button href="/concepts" variant="secondary" size="lg" arrow>
            Explore All 10 Concepts
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default FeaturedConcepts;
