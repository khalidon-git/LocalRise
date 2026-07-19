# ADR-009 — Hero video stays 1280×720; no further sharpening

**Date**: 2026-07-18 · **Status**: Accepted

## Context

The homepage hero (`components/illustrations/HeroVideo.tsx`) renders a
looping background video full-bleed behind the headline, via CSS
`object-fit: cover`. The source (`assets/originals/hero.mp4`, H.264,
**1280×720**, 24fps, ~10s loop) is a 3D-rendered isometric animation.
Already re-encoded to `public/hero.mp4` (~1.5MB, CRF 23, x264, with an
`unsharp=5:5:0.8:5:5:0.0` filter applied) and `public/hero.webm` (VP9,
~1.4MB) — both about as compressed/sharpened as this source resolution
supports.

`object-fit: cover` stretches the video to fill the hero section's full
width, commonly **1400–1920 CSS pixels** on desktop and up to ~2x that in
real device pixels on a high-DPI display — so up to ~3840px of physical
width is covered by only 1280px of real source detail. The result reads as
slightly soft/blurry at large viewport widths.

## Decision

Keep the video at its current source resolution and encode. Don't chase
further sharpness through encoder/filter tuning — accept the softness until
a higher-resolution source export is available.

## Why

The softness is an information-theoretic limit, not a compression problem:
no encoder setting, filter, or bitrate increase can recover detail that was
never captured in the original 1280×720 render. Sharpening filters (already
applied) improve perceptual edge contrast, but over-applying them causes
visible ringing/halo artifacts — a worse look than mild softness.

## Alternatives rejected

| Option | Why not (yet) |
| --- | --- |
| Increase bitrate / switch codec (AV1, HEVC) | Only affects compression efficiency for a given quality, not the underlying source resolution — cannot add detail |
| Push sharpening further | Already near the point of visible ringing/halo artifacts on this content |
| Cap the video's displayed width instead of full-bleed | Fights the "background behind the whole hero" design goal directly — a real trade-off, not a pure win, so not taken pre-emptively |

## What would actually fix it, in order of how "real" the fix is

1. **A higher-resolution export of the source animation** (1920×1080+) from
   whoever produced it — the only option that adds real detail.
2. **AI video super-resolution** (e.g. Topaz Video AI) to synthesize
   plausible extra detail. Worth exploring — this is a smooth, low-texture
   3D render (clean geometric surfaces and gradients, little fine texture),
   which is a comparatively favorable case for these tools.
3. **Reduce displayed size** (cap width, crop/zoom less) as a free, immediate
   lever if a new source isn't available soon — the trade-off noted above.

## Future

Revisit if a higher-resolution source becomes available, or if AI upscaling
is tried — replace `assets/originals/hero.mp4` and re-run the encode/filter
step described above, keeping the same `public/hero.mp4` / `public/hero.webm`
filenames so `HeroVideo.tsx` needs no changes.
