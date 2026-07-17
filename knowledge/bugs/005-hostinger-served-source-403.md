# BUG-005 — The site was a 403 for its entire existence

**Severity**: Critical · **Status**: Fixed (2026-07-17) · **Class**: deployment topology

## Symptoms

`https://localrise.in` returned **403 Forbidden**. It had never once served the
site. Meanwhile hPanel reported deployments as **"Completed"** — in ~3 seconds.

## Root cause

Hostinger's git integration was pointed at **`main`**, cloning it into
`public_html` and serving it verbatim. `main` holds source (`.tsx`), not HTML.
No `index.html` → Apache refuses to index the directory → 403.

**Hostinger shared hosting runs no build step.** The ~3-second "Completed" deploy
was the tell: it was a bare `git clone`, never `npm run build`.

## Why it happened

The repo was configured as if the host would build it — a reasonable assumption
from Vercel/Netlify, and wrong for shared hosting. "Deployment: Completed" was
truthful (the pull worked) and completely misleading (nothing servable landed).

> **Green does not mean working.** A deploy that reports success while the site
> 403s is worse than a failure, because nobody investigates.

## Fix

A GitHub Action builds on push to `main` and force-pushes `out/` to a generated
**`deploy`** branch. Hostinger tracks `deploy`; root stays `public_html`.

## Verification

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://localrise.in/   # 200
```

## Prevention

- **Never point the host at `main`.** It serves source and 403s.
- **Never hand-commit to `deploy`** — force-pushed every build.
- Verify a deploy by fetching the URL, never by reading the panel's status.

## Related

[deployment.md](../../docs/deployment.md) ·
[BUG-006](./006-build-artifacts-tracked.md) ·
[BUG-007](./007-sitemap-trailing-slash.md)
