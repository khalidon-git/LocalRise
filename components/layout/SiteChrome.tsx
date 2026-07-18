"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";

// Two families of routes render chrome-free:
//   • Concept "live" sites (/concepts/<slug>/live) — standalone fictional
//     brands, so the visitor feels they're on a real company's website.
//   • Ads landing pages (/lp/<slug>) — single-objective paid-traffic pages
//     where nav/footer/cart are conversion distractions (see marketing/
//     ads-strategy.md §5). Matching the whole /lp/ family (not one slug) means
//     every future landing page gets the bare treatment automatically.
// LocalRise chrome (nav, footer, floating buttons, welcome modal) is suppressed
// for both.
//
// Detecting the route in a small CLIENT component keeps app/layout.tsx a SERVER
// component, which it must stay to export `metadata` (see docs/seo.md). The
// providers still wrap everything, so the audio engine survives navigation.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname ?? "";
  const bare = /^\/concepts\/[^/]+\/live\/?$/.test(path) || /^\/lp\/[^/]+\/?$/.test(path);

  if (bare) return <>{children}</>;

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <WhatsAppButton />
      <AudioToggle />
      <CartDrawer />
      <WelcomeModal />
    </>
  );
}

export default SiteChrome;
