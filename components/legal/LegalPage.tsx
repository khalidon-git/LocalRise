import type { LegalSection } from "@/lib/content";

type Props = {
  title: string;
  description: string;
  updated: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ title, description, updated, sections }: Props) {
  return (
    <main>
      <section className="section-pad pt-28 sm:pt-32">
        <div className="container-x mx-auto max-w-3xl">
          <p className="text-label font-semibold uppercase tracking-wider text-accent">LocalRise India</p>
          <h1 className="mt-3 font-display text-heading-1 font-semibold text-ink">{title}</h1>
          <p className="mt-4 text-body-lg text-ink-2">{description}</p>
          <p className="mt-3 text-body-sm text-ink-3">Last updated: {updated}</p>

          <div className="mt-10 space-y-9 sm:mt-12">
            {sections.map((section) => (
              <section key={section.heading} aria-labelledby={`legal-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <h2
                  id={`legal-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="font-display text-heading-3 font-semibold text-ink"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LegalPage;
