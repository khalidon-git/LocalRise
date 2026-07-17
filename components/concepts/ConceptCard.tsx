import Link from "next/link";
import type { Concept } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ConceptMock } from "@/components/concepts/ConceptMock";

// Listing card. The whole card is the link — one target, bigger tap area on
// mobile, and no nested interactive elements for screen readers to trip over.
export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article className="card card-hover group overflow-hidden p-3">
      <Link href={`/concepts/${concept.slug}`} className="block focus-visible:outline-none">
        <div className="relative">
          {/* Honest badge: these are design concepts, never client work. */}
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            Design Concept
          </span>
          <div className="transition-transform duration-700 ease-premium group-hover:scale-[1.02]">
            <ConceptMock concept={concept} />
          </div>
        </div>

        <div className="p-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-eyebrow uppercase text-accent">{concept.industry}</span>
            <Icon
              name="arrow-up-right"
              size={18}
              className="shrink-0 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{concept.name}</h3>
          <p className="mt-1.5 text-body-sm text-ink-2">{concept.summary}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-bg-muted px-2.5 py-1 text-[12px] font-medium text-ink-2">
            <Icon name="palette" size={13} />
            {concept.designStyle}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default ConceptCard;
