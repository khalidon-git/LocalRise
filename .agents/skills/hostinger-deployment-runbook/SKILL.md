---
name: hostinger-deployment-runbook
description: Run or review the LocalRise Hostinger deployment process. Use for deploy preparation, deployment troubleshooting, GitHub Action deploy-branch checks, Hostinger hPanel redeploy steps, production smoke tests, 403/source-serving issues, sitemap checks, or rollback planning. Do not use for local-only UI work unless it changes deployment assumptions.
---

# Hostinger Deployment Runbook

## Pre-Deploy Checks

1. Read `docs/deployment.md`, `knowledge/bugs/005-hostinger-served-source-403.md`, `knowledge/bugs/006-build-artifacts-tracked.md`, and `knowledge/bugs/007-sitemap-trailing-slash.md`.
2. Confirm the working tree does not unintentionally include `out/`, `.next/`, temp files, or source-only artifacts.
3. Run `npm run verify`.
4. Confirm `next.config.mjs` still uses static export and trailing slashes.
5. Confirm no new runtime server assumption was introduced.

## Deploy Sequence

1. Push the intended source state to `main`.
2. Confirm the GitHub Action builds and updates the `deploy` branch.
3. In Hostinger hPanel, run the manual redeploy for the site.
4. Verify the live site, not only the deploy status.

## Production Smoke Tests

- Homepage returns `200`.
- Important routes return `200` with trailing slash behavior intact.
- `sitemap.xml` contains final URLs that do not redirect.
- Hostinger serves built HTML/assets, not repository source files.
- Key media assets load from local files.
- Internal navigation works without full reload behavior.

## Rollback Plan

If production verification fails, stop further changes, identify whether the failure is source, GitHub Action, deploy branch, or Hostinger redeploy state, and restore the last known good source/deploy branch according to `docs/deployment.md`.

## Output

Report source commit/branch checked, build result, deploy status source, live smoke results, and any manual Hostinger action still required.
