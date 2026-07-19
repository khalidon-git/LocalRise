# Problem: hero background video looks blurry/soft

## Setup
- Website hero section (localrise.in homepage) uses a looping video as a
  full-bleed background behind the headline text.
- Source file: `hero.mp4`, H.264, **1280×720**, 24fps, ~10 second loop.
  Original file was 2.65MB; already re-encoded to ~1.5MB (CRF 23, x264,
  `unsharp=5:5:0.8:5:5:0.0` sharpening filter applied) and a VP9 WebM
  (~1.4MB) — both already about as compressed/sharpened as this source
  resolution supports.
- CSS renders it `object-fit: cover`, filling the entire hero section width
  — which on a normal desktop browser window is commonly **1400–1920 CSS
  pixels wide**, and on a high-DPI/Retina display effectively **2x that in
  real device pixels** (so up to ~3840px of physical width needing to be
  covered by 1280px of real source detail).

## Root cause
The video is being stretched **1.5–3x beyond its native resolution**. This
is a real information-theoretic limit: no video encoder setting, filter, or
compression tuning can add detail that was never captured in the original
1280×720 render. Sharpening filters (already applied) can improve *edge
contrast* slightly to make it perceptually crisper, but they cannot recover
genuine missing resolution — over-applying them causes visible ringing/halo
artifacts around edges, which is a worse look than mild softness.

## What would actually fix it (in order of how "real" the fix is)
1. **Get a higher-resolution export of the source animation.** This is a
   3D-rendered isometric animation (looks like it was made in Blender,
   Cinema 4D, or similar, or purchased/generated as a stock motion asset).
   Whoever produced it should be able to re-render/re-export at 1920×1080
   or higher — this is the only fix that adds real detail.
2. **AI video super-resolution / upscaling** (e.g., Topaz Video AI, or
   similar ML-based upscalers) can synthesize plausible extra detail from
   the existing 1280×720 source. This is a real option worth exploring —
   results vary by tool and content type; a smooth, low-texture 3D render
   like this one (few fine textures, mostly clean geometric surfaces and
   gradients) is actually a *favorable* case for these tools, since they
   don't have to invent complex texture detail, just cleaner edges/gradients.
3. **Reduce how large the video renders on screen** — e.g., cap its
   displayed width instead of true full-bleed edge-to-edge, or crop/zoom in
   less. This directly fights the "put it in the background of the whole
   section" design goal, so it's a trade-off, not a pure win — but it's a
   free, immediate lever if a new source file isn't available soon.

## What NOT to expect
Any suggestion involving "just increase the bitrate" or "use a different
codec" (AV1, HEVC, etc.) will **not** fix this — codec/bitrate changes only
affect *compression efficiency* (how small the file is for a given quality),
not the underlying source resolution. The video is already efficiently
encoded at a size well below the original file; more bits spent on the same
1280×720 source cannot recover detail that isn't there.
