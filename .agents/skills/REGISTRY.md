# LocalRise Skill Registry

Repo skills live under `.agents/skills/<skill-name>/SKILL.md`. Use this registry before creating or updating a skill.

| Skill | Purpose | Trigger phrases | When not to use it | Related skills | Last updated reason |
| --- | --- | --- | --- | --- | --- |
| `static-export-safety-gate` | Preserve Next.js 14 static export behavior and prevent runtime/server features. | static export, route, metadata, sitemap, robots, next.config, deployment, env, API route, server action | Pure copy or styling edits with no route/config impact | `hostinger-deployment-runbook`, `final-completion-gate` | Initial LocalRise safety setup |
| `localrise-content-integrity` | Keep shared content data synchronized and truthful. | content, services, packages, FAQs, concept sites, pricing, CTAs, metadata copy | Styling-only work that does not touch content data | `static-export-safety-gate`, `final-completion-gate` | Initial LocalRise safety setup |
| `smartlink-navigation-guardian` | Prevent raw internal anchors and protect audio continuity. | link, href, nav, CTA, button, SmartLink, footer, route path | External-only links outside shared link components | `static-export-safety-gate`, `final-completion-gate` | Initial LocalRise safety setup |
| `hostinger-deployment-runbook` | Make LocalRise deployment repeatable and artifact-verified. | deploy, Hostinger, hPanel, GitHub Action, deploy branch, live smoke, 403, sitemap redirect | Local-only work that does not affect deployment assumptions | `static-export-safety-gate`, `final-completion-gate` | Initial deployment runbook setup |
| `responsive-sizing-system-qa` | Audit, implement, and visually verify a coherent responsive sizing system across routes and components. | responsive sizing, spacing system, typography scale, card sizes, mobile reflow, viewport QA, horizontal overflow | Isolated styling tweaks or copy-only work | `final-completion-gate`, `static-export-safety-gate` | Added after the site-wide sizing refactor exposed reusable audit, migration, and viewport-verification steps |
| `final-completion-gate` | Close tasks with clear verification evidence and skill-update decision. | final check, completion, verified, tests run, done, before final | Quick read-only answers with no state change | All project skills | Initial completion reporting setup |
