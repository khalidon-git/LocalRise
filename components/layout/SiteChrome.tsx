"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";

// Concept "live" sites (/concepts/<slug>/live) render as standalone fictional
// brands — the LocalRise chrome (nav, footer, floating buttons, welcome modal)
// is suppressed so the visitor feels they're on a real company's website.
//
// Detecting the route in a small CLIENT component keeps app/layout.tsx a SERVER
// component, which it must stay to export `metadata` (see docs/seo.md). The
// providers still wrap everything, so the audio engine survives navigation.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = /^\/concepts\/[^/]+\/live\/?$/.test(pathname ?? "");

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
