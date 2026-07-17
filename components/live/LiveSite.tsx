import type { ConceptSite } from "@/lib/content";
import { LiveNav } from "@/components/live/LiveNav";
import { themeVars } from "@/components/live/liveTheme";
import { LiveHero } from "@/components/live/LiveHero";
import { LiveAbout } from "@/components/live/LiveAbout";
import { LiveServices } from "@/components/live/LiveServices";
import { LiveShowcase } from "@/components/live/LiveShowcase";
import { LiveDashboardSection } from "@/components/live/LiveDashboard";
import { LivePricing } from "@/components/live/LivePricing";
import { LiveGallery } from "@/components/live/LiveGallery";
import { LiveTestimonials } from "@/components/live/LiveTestimonials";
import { LiveFaq } from "@/components/live/LiveFaq";
import { LiveContact } from "@/components/live/LiveContact";
import { LiveFooter } from "@/components/live/LiveFooter";
import { cx } from "@/lib/utils";

// Composes one fictional brand's full site from its ConceptSite data. This is
// the entire "engine" — concept #11 needs a new data object, not a new
// component, unless it needs a genuinely new section shape (then extend one
// of these, the same way ConceptMock grows a new layout variant).
export function LiveSite({ site }: { site: ConceptSite }) {
  const isSaas = Boolean(site.dashboard);

  return (
    <div className={cx("lv-root", site.theme.font)} style={themeVars(site)}>
      <LiveNav site={site} />
      <main>
        <LiveHero site={site} />
        <LiveAbout site={site} />
        <LiveServices site={site} />
        {isSaas ? (
          <>
            <LiveDashboardSection site={site} />
            <LivePricing site={site} />
          </>
        ) : (
          <LiveShowcase site={site} />
        )}
        <LiveGallery site={site} />
        <LiveTestimonials site={site} />
        <LiveFaq site={site} />
        <LiveContact site={site} />
      </main>
      <LiveFooter site={site} />
    </div>
  );
}

export default LiveSite;
