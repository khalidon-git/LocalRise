# Engineering knowledge base

Long-term project memory. Where `docs/` explains **how the systems work today**,
this records **why they are that way** and **what already went wrong**.

Read this before changing anything subtle. Most entries exist because something
broke in a way that wasn't obvious from the code.

| | |
| --- | --- |
| [bugs/](./bugs/) | Post-mortems: root cause, why it happened, prevention |
| [decisions/](./decisions/) | ADRs: what was chosen, what was rejected, trade-offs |
| [tech-debt.md](./tech-debt.md) | Known-but-unfixed, worst first, each with a reason |

## Bugs

| | Title | Class |
| --- | --- | --- |
| [001](./bugs/001-raw-anchor-destroys-audio.md) | A raw `<a href="/…">` destroys the audio engine | architectural invariant |
| [002](./bugs/002-gesture-fallback-self-disabling.md) | The autoplay gesture fallback disabled itself | async/lifecycle |
| [003](./bugs/003-scroll-lock-conflict.md) | Two components fought over `body.style.overflow` | shared global state |
| [004](./bugs/004-gesture-fallback-hijacked-browse-silently.md) | "Browse on My Own" would have started the audio | feature interaction |
| [005](./bugs/005-hostinger-served-source-403.md) | The site was a 403 for its entire existence | deployment topology |
| [006](./bugs/006-build-artifacts-tracked.md) | 163 build artifacts were tracked in git | repo hygiene |
| [007](./bugs/007-sitemap-trailing-slash.md) | Every sitemap URL 301-redirected | config mismatch |
| [008](./bugs/008-toggle-started-audio-muted.md) | The sound button started the audio muted | state-machine gap |

## Decisions

| | Title |
| --- | --- |
| [001](./decisions/001-right-sized-architecture.md) | Right-sized structure over enterprise scaffolding |
| [002](./decisions/002-audio-engine-architecture.md) | Declarative `<audio>` in the root layout, not a singleton |
| [003](./decisions/003-colocate-context-hooks.md) | Context hooks live with their provider |
| [004](./decisions/004-honest-content-policy.md) | Never fabricate social proof, results, or business facts |
| [005](./decisions/005-no-live-demo-button.md) | No "Live Demo" button; the detail page *is* the demo |
| [006](./decisions/006-docs-structure.md) | Flat `docs/` + minimal `knowledge/` |
| [007](./decisions/007-concept-live-sites.md) | Concept Websites get real, browsable "live" sites — supersedes 005 |

---

## The four lessons that generalise

Distilled from the bugs above. If you internalise nothing else:

1. **The fix often isn't where the symptom is.** Audio restarted on navigation;
   the bug was in `Button`. No amount of audio architecture would have fixed it
   ([BUG-001](./bugs/001-raw-anchor-destroys-audio.md)).
2. **Green doesn't mean working.** Hostinger reported "Completed" deploys for a
   site that had never once returned a 200
   ([BUG-005](./bugs/005-hostinger-served-source-403.md)). Verify the artifact,
   not the status.
3. **New features silently invalidate old assumptions.** The welcome modal broke
   an audio fallback that referenced nothing about it
   ([BUG-004](./bugs/004-gesture-fallback-hijacked-browse-silently.md),
   [BUG-008](./bugs/008-toggle-started-audio-muted.md)). Grep finds symbols, not
   assumptions.
4. **A warning is not an instruction.** Validators demanded a `LocalBusiness`
   address; supplying one would have fabricated a business fact
   ([ADR-004](./decisions/004-honest-content-policy.md)). Tools measure markup;
   they can't measure truth.

## Adding an entry

**Bug** → next number, `NNN-kebab-title.md`. Cover: symptoms, root cause, **why it
happened** (the interesting part), files, fix, verification, prevention. Write it
so the *class* of bug can't recur — not just this instance.

**Decision** → next ADR number. Cover: context, decision, why, alternatives
rejected, trade-offs, implications. Record what you *rejected* — that's the part
future readers can't reconstruct.

Then link it from this index and, if it changes a rule, from the relevant
`docs/` file.
