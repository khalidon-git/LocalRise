import type { ConceptSite } from "@/lib/content";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { LiveButton } from "@/components/live/LiveButton";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

// The one place on a live site that breaks the illusion on purpose: a small,
// permanent "Design Concept by LocalRise" disclosure and a CTA back to the
// real agency. Never optional, never hidden further down the page — see
// knowledge/decisions/004-honest-content-policy.md and 007-concept-live-sites.md.
export function LiveFooter({ site }: { site: ConceptSite }) {
  const { theme } = site;

  return (
    <footer className="border-t" style={{ borderColor: "var(--lv-line)" }}>
      {/* Back-to-LocalRise CTA band */}
      <div className="lv-section !pb-16 !pt-16">
        <div className="lv-container">
          <Reveal>
            <div
              className={cx("flex flex-col items-center gap-5 border p-10 text-center sm:p-14", theme.radius)}
              style={{ borderColor: "var(--lv-line)", background: "var(--lv-brand-soft)" }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                style={{ background: "var(--lv-ink)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--lv-brand)" }} />
                Design Concept by LocalRise
              </span>
              <h2 className={cx("max-w-lg text-[clamp(1.5rem,3vw,2.1rem)] font-semibold text-[var(--lv-ink)]", theme.headFont, theme.tracking)}>
                Love this style? Build something similar.
              </h2>
              <p className="max-w-md text-[14.5px] text-[var(--lv-ink-muted)]">
                {site.brandName} is a fictional business — a design concept built by LocalRise to show what your
                website could become. Tell us about your business and we&apos;ll design a look that fits it.
              </p>
              <div className="mt-1 flex flex-wrap justify-center gap-3">
                <LiveButton href="/#contact" radius={theme.radius} arrow>Build something similar</LiveButton>
                <LiveButton href={`/concepts/${site.slug}`} radius={theme.radius} variant="outline">About this concept</LiveButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Standard site footer */}
      <div className="lv-container flex flex-col items-center justify-between gap-4 border-t py-8 sm:flex-row" style={{ borderColor: "var(--lv-line)" }}>
        <p className="text-[13px] text-[var(--lv-ink-muted)]">
          © {new Date().getFullYear()} {site.brandName} — a fictional Design Concept, not a real business.
        </p>
        <SmartLink href="/concepts" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--lv-ink-muted)] hover:text-[var(--lv-ink)]">
          <Icon name="arrow-right" size={13} className="rotate-180" />
          All concept websites
        </SmartLink>
      </div>
    </footer>
  );
}

export default LiveFooter;
