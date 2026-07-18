# Navigation & routing

## Purpose

Move between pages **without ever reloading the document**. This is not only a
speed concern: a full page load destroys the audio engine and every provider.

## Key files

| File | Role |
| --- | --- |
| `components/ui/SmartLink.tsx` | Decides `next/link` vs plain `<a>` |
| `lib/navigation.ts` | `isInternalHref()` |
| `components/ui/Button.tsx` | Renders through `SmartLink` when given `href` |
| `lib/content/brand.ts` | The `nav` array |

## Routes

| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | Homepage; conversion-focused sections only |
| `/why-us/` | `app/why-us/page.tsx` | Process, WhyChooseUs (`#why`) and FAQ — moved off the homepage, see the file header |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | 7 pages via `generateStaticParams` |
| `/concepts/`, `/concepts/[slug]/` | `app/concepts/**` | See `docs/concepts.md` |
| `/concepts/[slug]/live/` | `app/concepts/[slug]/live/page.tsx` | Chrome-free; `noindex` — see `docs/concepts.md` |

Slugs come from `services` in `lib/content/services.ts`, with page content from
`serviceDetails` (keyed by the same id). Adding a service to both automatically
creates its page.

`trailingSlash: true`, so built URLs are `/services/websites/`.

## The one rule

> **Never write a raw `<a href="/...">` for an internal link. Use `SmartLink`.**

A plain anchor to an app route triggers a full document load. That:

- tears down the React tree and every provider,
- **restarts the narration from 0** (see [audio.md](./audio.md)),
- throws away the SPA's instant navigation.

This was a real bug: `Button`, `Nav`, `Footer` and the service page all used raw
anchors, which is why audio appeared to "only start after navigating".

## How `SmartLink` decides

```ts
isInternalHref(href) === href.startsWith("/")
```

| href | Renders | Why |
| --- | --- | --- |
| `/#contact`, `/services/websites/` | `next/link` | App route → client-side |
| `#contact` | `<a>` | Same-page hash → native scroll, no navigation |
| `https://…`, `tel:`, `mailto:`, `wa.me` | `<a>` | External / protocol |

## Anchors must be root-relative

`nav` in `lib/content/brand.ts` uses `/#services`, **not** `#services`.

`Nav` and `Footer` render on *every* page via the root layout. A bare `#services`
on `/services/websites/` points at an element that doesn't exist there — the link
does nothing. `/#services` works from anywhere: on the homepage it's a same-path
hash change; from a sub-page it soft-navigates home, then scrolls.

Bare hashes are still correct **inside homepage-only sections** (e.g. Hero → 
`#packages`), because those components never render elsewhere.

## Data flow

```
lib/content/brand.ts  (nav: "/#services", …)
        │
        ├──► components/layout/Nav.tsx     ─┐
        └──► components/layout/Footer.tsx  ─┼──► SmartLink ──► isInternalHref()
                                            │                      │
             components/ui/Button.tsx ──────┘            ┌─────────┴─────────┐
                                                    next/link            <a>
                                                  (layout + audio      (scroll /
                                                     survive)          external)
```

## Extending

**New internal link** → `SmartLink` or `Button href="/..."`. Nothing else needed.

**New nav item** → add to `nav` in `lib/content/brand.ts` with a `/#anchor` href,
and ensure the target section has that `id`. `Nav` and `Footer` both pick it up.

**Programmatic navigation** → `useRouter()` from `next/navigation` (App Router),
in a client component. Never `window.location = "/..."` — same reload problem.

**Auditing** — this must return nothing:

```bash
grep -rn '<a ' --include="*.tsx" components app | grep 'href="/'
```
