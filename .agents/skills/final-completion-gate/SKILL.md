---
name: final-completion-gate
description: Verify LocalRise work before claiming completion. Use at the end of coding, content, UI, routing, deployment, skill-creation, or debugging tasks to confirm files changed, checks run, unverified items, skill updates, and remaining risks. Do not use for quick read-only answers where no project state changed.
---

# Final Completion Gate

## Workflow

1. Inspect `git status --short` and distinguish current-task changes from pre-existing user changes.
2. Review the diff for changed files and confirm no unrelated edits were made.
3. Run the smallest sufficient verification:
   - `npm run typecheck` for TypeScript-facing work.
   - `npm run build` for routes, metadata, config, content models, static export, or deploy-facing work.
   - Targeted source searches for invariant work, such as raw internal anchors or forbidden runtime features.
4. Confirm whether a skill should be created, updated, merged, or skipped under `AGENTS.md` Auto Skill Factory rules.
5. Do not claim completion if verification was skipped, blocked, or failed. State that clearly.

## Final Response Shape

For small tasks, report in concise prose. For larger tasks, include:

- What changed.
- Files changed.
- Checks run and results.
- What could not be verified.
- Manual verification steps, if needed.
- Skill created, updated, merged, or skipped.
- Remaining risks, if any.

## Risk Review

Before final response, explicitly check that the work did not weaken static export, navigation/audio continuity, content integrity, honest-content policy, deployment assumptions, or repo hygiene.

## Output

Produce a final answer that is evidence-based, not just status-based.
