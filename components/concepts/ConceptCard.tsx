import type { Concept } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { ScreenshotMock } from "@/components/concepts/ScreenshotMock";
import { ScreenshotPhone } from "@/components/concepts/ScreenshotPhone";
import { SmartLink } from "@/components/ui/SmartLink";

// Listing card. Two explicit CTAs (Live Preview / Build Something Similar) —
// not a single whole-card link — because a real "Live Preview" now exists to
// send people to (see docs/concepts.md, knowledge/decisions/007). Only the
// preview image and heading link to the detail page, so there's no nested
// <a>-in-<a>; the two buttons are siblings, both reachable by keyboard.
export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden p-2.5 sm:p-3">
      <SmartLink href={`/concepts/${concept.slug}`} className="relative block overflow-hidden rounded-xl sm:rounded-2xl">
        {/* Honest badge: these are design concepts, never client work. */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-label font-semibold text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
          Design Concept
        </span>
        <div className="relative transition-transform duration-700 ease-premium group-hover:scale-[1.015]">
          <ScreenshotMock concept={concept} />
          <ScreenshotPhone
            concept={concept}
            className="absolute -bottom-4 -right-2 hidden w-20 shrink-0 sm:block"
          />
        </div>
      </SmartLink>

      <div className="flex flex-1 flex-col p-3 pt-5 sm:p-4 sm:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-label font-semibold uppercase tracking-wider text-accent">{concept.industry}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-muted px-2.5 py-1 text-label font-medium text-ink-2">
            <Icon name="palette" size={12} />
            {concept.designStyle}
          </span>
        </div>
        <SmartLink href={`/concepts/${concept.slug}`} className="mt-2">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {concept.name}
          </h3>
        </SmartLink>
        <p className="mt-1.5 text-body-sm text-ink-2">{concept.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {concept.features.slice(0, 3).map((f) => (
            <li key={f} className="inline-flex items-center gap-1.5 text-label text-ink-3">
              <Icon name="check" size={12} strokeWidth={2.4} className="text-accent" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-2.5 pt-1 sm:grid-cols-2">
          <Button href={`/concepts/${concept.slug}/live`} size="md" variant="dark" icon="browser" className="w-full">
            Live Preview
          </Button>
          <ConversationButton
            start={{ channel: "whatsapp", type: "concept", conceptName: concept.name, meta: { section: "concept-card", button: concept.slug } }}
            size="md"
            variant="secondary"
            className="w-full"
          >
            Build Something Similar
          </ConversationButton>
        </div>
      </div>
    </article>
  );
}

export default ConceptCard;
