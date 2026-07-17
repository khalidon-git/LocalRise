import Link from "next/link";
import type { Concept } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ConceptMock } from "@/components/concepts/ConceptMock";
import { ConceptPhone } from "@/components/concepts/ConceptPhone";

// Listing card. Two explicit CTAs (Live Preview / Build Something Similar) —
// not a single whole-card link — because a real "Live Preview" now exists to
// send people to (see docs/concepts.md, knowledge/decisions/007). Only the
// preview image and heading link to the detail page, so there's no nested
// <a>-in-<a>; the two buttons are siblings, both reachable by keyboard.
export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden p-3">
      <Link href={`/concepts/${concept.slug}`} className="relative block rounded-2xl focus-visible:outline-none">
        {/* Honest badge: these are design concepts, never client work. */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
          Design Concept
        </span>
        <div className="relative transition-transform duration-700 ease-premium group-hover:scale-[1.015]">
          <ConceptMock concept={concept} />
          <ConceptPhone
            concept={concept}
            className="absolute -bottom-4 -right-2 hidden w-[72px] shrink-0 sm:block"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-eyebrow uppercase text-accent">{concept.industry}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-2">
            <Icon name="palette" size={12} />
            {concept.designStyle}
          </span>
        </div>
        <Link href={`/concepts/${concept.slug}`} className="mt-2 focus-visible:outline-none">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {concept.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-body-sm text-ink-2">{concept.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {concept.features.slice(0, 3).map((f) => (
            <li key={f} className="inline-flex items-center gap-1.5 text-[12px] text-ink-3">
              <Icon name="check" size={12} strokeWidth={2.4} className="text-accent" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2.5 pt-1">
          <Button href={`/concepts/${concept.slug}/live`} size="md" variant="dark" icon="browser" className="flex-1">
            Live Preview
          </Button>
          <Button href="/#contact" size="md" variant="secondary" className="flex-1">
            Build Something Similar
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ConceptCard;
