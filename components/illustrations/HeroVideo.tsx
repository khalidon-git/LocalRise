"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";

// Real hero visual: a short, looping isometric animation of a local shop
// growing into a small connected cityscape (no baked-in text/logos).
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

// "lg" is the (legacy) contained hero panel. "sm" is a small, de-emphasised
// badge (used on /contact, next to the heading) — same clip, quieter frame:
// no float shadow, a much softer glow, tighter radius. "bg" is a full-bleed
// background layer (homepage hero) — no panel/glow at all, just the media
// filling its container plus a legibility scrim for text overlaid on top.
// Literal class strings per Tailwind JIT (see docs/content.md) — never
// interpolate the size.
const FRAME = {
  lg: { wrap: "max-w-[560px]", glow: "h-72 w-72 blur-[90px]", panel: "rounded-3xl shadow-float" },
  sm: { wrap: "max-w-[260px]", glow: "h-28 w-28 blur-[50px]", panel: "rounded-2xl shadow-sm" },
} as const;

type Size = "lg" | "sm" | "bg";

export function HeroVideo({
  className,
  size = "lg",
}: {
  className?: string;
  size?: Size;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    // Belt-and-braces autoplay fix: React's `muted` JSX attribute doesn't
    // always land on the DOM `muted` *property* before the browser evaluates
    // its autoplay-requires-muted policy, so the `autoPlay` attribute alone
    // can get silently rejected in some browsers/versions — the video just
    // sits on its poster frame forever with no visible error. Setting the
    // property imperatively and calling `.play()` ourselves sidesteps that.
    el.muted = true;
    const playPromise = el.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch((err) => {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("HeroVideo: autoplay was rejected", err);
        }
      });
    }
  }, [reduceMotion]);

  // In "bg" mode the video is decorative wallpaper behind a real <h1> that
  // already carries the message — hide it from screen readers rather than
  // announcing a redundant description. The "lg"/"sm" panel modes are the
  // primary visual content in their spot, so they keep the descriptive label.
  const decorative = size === "bg";

  const media = reduceMotion ? (
    <img
      src={POSTER}
      alt={decorative ? "" : VIDEO_LABEL}
      aria-hidden={decorative || undefined}
      width={1280}
      height={720}
      className={size === "bg" ? "block h-full w-full object-cover" : "block h-auto w-full"}
    />
  ) : (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload={size === "bg" ? "auto" : "metadata"}
      poster={POSTER}
      width={1280}
      height={720}
      aria-label={decorative ? undefined : VIDEO_LABEL}
      aria-hidden={decorative || undefined}
      className={size === "bg" ? "block h-full w-full object-cover" : "block h-auto w-full"}
    >
      {/* WebM (VP9) first — smaller at equal quality on browsers that
          support it; MP4 (H.264) fallback for the rest. Both stripped
          of the unused audio track (video is always muted). */}
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );

  if (size === "bg") {
    return (
      <div className={cx("absolute inset-0", className)}>
        {media}
        {/* Legibility scrim: the clip is light/monochrome with occasional
            blue glow accents, and now sits directly behind the headline
            instead of beside it. Two stacked linear gradients (own layer,
            not a Tailwind class — see docs/content.md on literal-only JIT
            classes): one fades from opaque near the top so the transparent
            floating Nav pill (see components/layout/Nav.tsx) stays readable
            pre-scroll, the other fades from opaque on the left — where the
            heading/copy/CTAs live — down to nearly transparent on the right
            so the video is still clearly visible and in motion there. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.55) 16%, rgba(255,255,255,0.16) 30%, rgba(255,255,255,0) 44%), " +
              "linear-gradient(100deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.86) 32%, rgba(255,255,255,0.5) 54%, rgba(255,255,255,0.12) 76%, rgba(255,255,255,0) 94%)",
          }}
        />
      </div>
    );
  }

  const frame = FRAME[size];

  return (
    <div className={cx("relative mx-auto w-full", frame.wrap, className)}>
      {/* soft accent glow behind the panel, echoing the coloured blobs of the
          illustrated hero this replaced */}
      <div
        className={cx(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20",
          frame.glow,
        )}
      />

      <div className={cx("relative overflow-hidden border border-line bg-bg-subtle", frame.panel)}>
        {media}
      </div>
    </div>
  );
}

export default HeroVideo;
