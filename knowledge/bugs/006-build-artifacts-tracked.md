# BUG-006 — 163 build artifacts were tracked in git

**Severity**: Medium · **Status**: Fixed (2026-07-16) · **Class**: repo hygiene

## Symptoms

Every commit swept in 160+ changed files — the whole `.next/` cache including
multi-MB webpack packs (one 24 MB). Commits were enormous and unreviewable.

## Root cause

Two compounding causes:

1. `.next/` and `out/` were committed **before** `.gitignore` existed.
   **gitignore does not apply to already-tracked files** — the rules were there
   and did nothing.
2. `.gitignore` had at some point been truncated to a single `node_modules` line,
   losing every Next.js rule.

## Why it happened

The failure is silent and counter-intuitive: the ignore rule is *right there in
the file*, so it looks handled. `git check-ignore` reports the truth; reading
`.gitignore` does not.

## Fix

```bash
git rm -r --cached .next out     # untrack, keep on disk
```
plus restoring the full `.gitignore`. Tracked files went 206 → 43.

## Verification

```bash
git ls-files | grep -cE '^\.next/|^out/'      # 0
git check-ignore .next/BUILD_ID out/index.html   # both listed → ignored
```

## Prevention

- **Trust `git check-ignore`, not the contents of `.gitignore`.**
- After adding an ignore rule, confirm the path isn't already tracked.
- Be wary of `git add -A` when the tree state is unknown — it's how the truncated
  `.gitignore` got committed in the first place.

## Related

[deployment.md](../../docs/deployment.md#repo-hygiene)
