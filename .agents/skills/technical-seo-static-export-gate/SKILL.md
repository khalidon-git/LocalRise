---
name: technical-seo-static-export-gate
description: Audit and verify technical SEO for statically exported sites, especially LocalRise changes involving metadata, canonicals, JSON-LD, headings, sitemap, robots.txt, llms.txt, redirects, crawlability, indexability, social previews, legal routes, or generated HTML. Use before and after SEO-facing code or deployment changes. Do not use for copy-only edits that cannot affect search output or for server-rendered SEO systems without adapting the artifact checks.
---

# Technical SEO Static Export Gate

## Workflow

1. Read the repository architecture, SEO, navigation, content and deployment documentation before editing.
2. Confirm the real framework/version, route set, rendering mode, canonical origin, trailing-slash policy and hosting topology.
3. Inspect both source and the last generated artifact for:
   - index/noindex intent and sitemap inclusion;
   - unique titles, descriptions and one meaningful H1;
   - page-specific canonical, Open Graph and Twitter URLs/images;
   - factual, page-scoped schema with stable absolute IDs;
   - robots, sitemap, llms.txt, manifest and 404 outputs;
   - redirecting internal URLs, raw internal anchors and placeholder domains;
   - localhost, staging, verification-token or secret leakage.
4. Preserve static-export constraints. Do not add route handlers, server actions, ISR, runtime secrets or page-view IndexNow calls.
5. Keep entity/schema claims supported by visible content. Never invent addresses, reviews, rankings, approvals, metrics, social profiles or client results.
6. Centralize canonical URL and metadata generation. Serialize JSON-LD with empty-value removal and script-safe escaping.
7. Keep sitemap URLs byte-for-byte aligned with canonicals. Omit noindex, preview, error and redirecting routes. Do not assign current build time as every page's `lastmod`.
8. Use `SmartLink` or `Button href` for LocalRise internal navigation and target final trailing-slash routes.

## Verification

For LocalRise, run:

```bash
npm run typecheck
npm run build
npm run seo:verify
```

For an explicitly read-only audit, do not rebuild or mutate state. Inspect an
existing artifact only when it is demonstrably newer than the relevant source,
and state that no fresh build was run.

Then inspect `out/robots.txt`, `out/sitemap.xml`, `out/llms.txt`, representative HTML and `out/404.html`. Confirm `out/` remains ignored and untracked.

After deployment, verify real HTTP behavior: apex/www/scheme redirects, 200 primary routes, a genuine 404, crawl-file content types, canonical/social preview output, schema validators, Search Console, Bing and PageSpeed. Do not claim these live checks passed when only local artifacts were tested.

## Stop Conditions

Stop and report before implementing any SEO request that requires fabricated facts, exposes a secret, weakens public-route security, changes auth/API contracts, or introduces a runtime backend into a static-export site.

## Output

Report problems found, files changed, source and artifact checks, live checks not run, owner/deployment actions and remaining ranking/indexing uncertainty. Search visibility is never guaranteed.
