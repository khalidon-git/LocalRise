# BUG-007 — Every sitemap URL 301-redirected

**Severity**: Medium · **Status**: Fixed (`8ff5dc4`) · **Class**: config mismatch

## Symptoms

`sitemap.xml` listed `https://localrise.in/services/websites`, but the canonical
tag on that page said `…/websites/`. Every URL in the sitemap was a redirect hop.

## Root cause

`next.config.mjs` sets `trailingSlash: true`, so the real URL carries a slash.

**Next normalises canonicals but *not* sitemap entries.** `app/sitemap.ts` built
URLs by string concatenation, so they silently disagreed with the canonicals Next
generated three lines away.

## Why it happened

A partial abstraction. Next handles trailing slashes for *some* outputs
(canonical, `<Link>`) and not others (`sitemap.ts`, hand-written strings). Because
it's right most of the time, the gap is invisible.

> **Rule of thumb**: where a framework normalises URLs for you, find out exactly
> *which* outputs it covers. Assume the rest is yours.

## Files involved

`app/sitemap.ts`

## Fix

Emit the trailing slash explicitly, with a comment recording *why* so it isn't
"tidied away" later:

```ts
{ url: `${siteUrl}/services/${s.id}/`, … }
```

## Verification

```bash
curl -s https://localrise.in/sitemap.xml | grep -o "<loc>[^<]*</loc>"
# every loc must end in "/" — and none may return 301
```

## Prevention

Any new route added to `sitemap.ts` needs the trailing slash. Cross-check
sitemap entries against the canonical of the same page — they must match byte
for byte.

## Related

[seo-audit.md](../../docs/seo-audit.md) · [seo.md](../../docs/seo.md)
