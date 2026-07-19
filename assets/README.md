# assets/

Committed **source** files that a processed, optimized copy is derived from —
the raw materials, not what the site actually serves.

| Folder | Holds | Processed into |
| --- | --- | --- |
| `originals/` | Pre-compression photos and video as supplied (full-resolution JPEGs, the unencoded hero video) | `public/services/*.jpg`, `public/logo.png`, `public/hero.mp4` / `public/hero.webm` |

## Why this exists, separate from `public/`

`public/` is served as-is by the static export — everything there ships to
every visitor, so it stays lean (resized, compressed, web-ready). `assets/`
is **not served**; it's provenance. If a photo needs to be re-cropped, the
hero video needs a different encode, or the logo needs a new background
treatment, the full-quality source is here instead of having to re-request
it from whoever supplied it.

## Reprocessing a file

There's no build-time pipeline for this — each asset was processed by hand
with `ffmpeg`/PIL for the resize/compress/crop step, matching the pattern
`scripts/capture-concept-screenshots.mjs` uses for on-demand tooling (install
what you need, run it, remove it — see `docs/deployment.md`'s `ffmpeg-static`
note). If you regenerate a `public/` asset from one of these originals, keep
the same target filename so nothing in `lib/content` needs to change.

## Adding a new source file

New raw assets land in `temp/` first (see `temp/README.md`), get processed
into `public/`, and only then move here — `temp/` is intake, this is
long-term storage for files worth keeping around.
