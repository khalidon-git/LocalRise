import type { Concept } from "@/lib/content";
import { cx } from "@/lib/utils";

// Real desktop screenshot of a concept's live site (public/concepts-shots/),
// framed in the same browser-chrome language as ConceptMock — but the content
// is an actual captured image, not code-rendered markup. Browser chrome stays
// light regardless of the page's own theme (dark-themed sites included);
// that's how real OS/browser chrome behaves, so it reads as more authentic,
// not less. See knowledge/decisions/007-concept-live-sites.md and
// docs/concepts.md for why real images are used here.
export function ScreenshotMock({ concept, className }: { concept: Concept; className?: string }) {
  return (
    <div className={cx("relative overflow-hidden rounded-xl border border-line shadow-lg", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 truncate rounded bg-bg-subtle px-2 py-0.5 text-[10px] text-ink-3">
          {concept.preview.domain}
        </span>
      </div>
      <img
        src={`/concepts-shots/${concept.slug}-desktop.jpg`}
        alt={`${concept.name} website — real screenshot of the live concept site`}
        width={1120}
        height={720}
        loading="lazy"
        decoding="async"
        className="block w-full"
      />
    </div>
  );
}

export default ScreenshotMock;
