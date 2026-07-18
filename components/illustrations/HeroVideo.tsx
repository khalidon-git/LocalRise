"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

// Real hero visual: a short, looping isometric animation of a local shop
// growing into a small connected cityscape (no baked-in text/logos). Framed
// like a deliberate panel — rounded-3xl to match HeroScene's backdrop panel
// (rx="44") — rather than a bare <video> tag.
//
// `prefers-reduced-motion` visitors get the static poster frame only, never
// an autoplaying video. Detected client-side via matchMedia (this component
// is already "use client" via its parent, Hero.tsx) — motion is assumed
// allowed on first paint so the common case never flashes/swaps, and only
// reduced-motion visitors see a (near-instant, pre-decode) swap to the
// poster image.
const POSTER = "/hero-poster.jpg";
const VIDEO_LABEL =
  "Animated illustration: a local shop's storefront growing into a small, connected city skyline";

export function HeroVideo({ className }: { className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={cx("relative mx-auto w-full max-w-[560px]", className)}>
      {/* soft accent glow behind the panel, echoes HeroScene's colour blobs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[90px]" />

      <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-subtle shadow-float">
        {reduceMotion ? (
          <img
            src={POSTER}
            alt={VIDEO_LABEL}
            width={1280}
            height={720}
            className="block h-auto w-full"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            width={1280}
            height={720}
            aria-label={VIDEO_LABEL}
            className="block h-auto w-full"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default HeroVideo;
