# ADR-006 — Flat `docs/` + minimal `knowledge/`, not the full LEOS tree

**Date**: 2026-07-17 · **Status**: Accepted (open to reversal)

## Context

The LEOS operating model proposed:

```
docs/{architecture,features,components,providers,hooks,services,deployment,seo,testing}/ + changelog.md
knowledge/{bugs,decisions,patterns,anti-patterns,lessons,playbooks}/
```

**16 directories.** The codebase is ~50 files across 2½ routes.

## Decision

Adopt the **intent** — durable bug memory, decision log, changelog, tech-debt
backlog — with a right-sized layout:

```
docs/            13 focused files, flat, incl. changelog.md
knowledge/
  bugs/          BUG-001…008
  decisions/     ADR-001…006
  tech-debt.md
```

**Created**: `knowledge/bugs/`, `knowledge/decisions/`, `changelog.md`,
`tech-debt.md` — all genuinely missing and high-value.

**Not created**: `docs/{architecture,features,components,providers,hooks,services,testing}/`,
`knowledge/{patterns,anti-patterns,lessons,playbooks}/`.

## Why

- **`docs/` already covers those topics** — `architecture.md`, `providers.md`,
  `hooks.md`, `deployment.md`, `seo.md` exist and are findable. Nesting each into
  its own folder adds path depth without adding findability.
- **`services/` would be empty by definition.** Static export; there is no
  backend ([ADR-001](./001-right-sized-architecture.md)).
- **`testing/` would document nothing** — there are no tests. That's real debt,
  recorded in `tech-debt.md`, not a folder to create.
- **`patterns` / `anti-patterns` / `lessons` / `playbooks` collapse into one
  another here.** "Never write a raw `<a href='/'>`" is simultaneously an
  anti-pattern, a lesson, and a prevention strategy. Splitting it four ways
  guarantees three stale copies. It lives once, in
  [BUG-001](../bugs/001-raw-anchor-destroys-audio.md), linked from
  [navigation.md](../../docs/navigation.md).

> **Documentation has a maintenance cost.** Sixteen folders for fifty files
> produces stale docs, and stale docs are worse than none — they're confidently
> wrong. The failure mode is duplication, not absence.

This mirrors [ADR-001](./001-right-sized-architecture.md): structure should track
real complexity.

## Alternatives

| Option | Why not |
| --- | --- |
| Full LEOS tree | ~10 near-empty folders; four overlapping knowledge categories |
| Keep everything in `docs/` | Bug/decision records are a distinct genre — dated, immutable, append-only. Mixing them with living guides means neither reads well. |

## Trade-offs

- **Cost**: diverges from the requested layout. If the project grows a backend or
  a second team, nesting will pay off.
- **Benefit**: every file has a reader and a reason today.

## Implications

Add a folder when a category has **3+ real documents**. If `patterns/` genuinely
accumulates, promote it then — the cost of moving files later is trivial compared
to maintaining empty ceremony now.
