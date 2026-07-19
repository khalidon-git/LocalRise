import type { Concept } from "@/lib/content";
import { cx } from "@/lib/utils";

// Real mobile screenshot, framed like ConceptPhone's phone bezel. Pairs with
// ScreenshotMock — see that file for why these are real captures, not
// code-rendered mocks.
export function ScreenshotPhone({
  concept,
  className,
  priority = false,
}: {
  concept: Concept;
  className?: string;
  /** Skip the lazy-load deferral for a slide that's already visible on mount
   * (e.g. the first slide of a carousel) — everything else stays lazy. */
  priority?: boolean;
}) {
  return (
    <div className={cx("overflow-hidden rounded-[18px] border-[3px] border-ink bg-white shadow-xl", className)}>
      <div className="flex justify-center bg-ink py-1">
        <span className="h-1 w-8 rounded-full bg-white/30" />
      </div>
      <img
        src={`/concepts-shots/${concept.slug}-mobile.jpg`}
        alt={`${concept.name} website on mobile — real screenshot of the live concept site`}
        width={390}
        height={780}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block w-full"
      />
    </div>
  );
}

export default ScreenshotPhone;
