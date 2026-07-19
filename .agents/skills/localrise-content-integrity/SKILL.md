---
name: localrise-content-integrity
description: Audit and update LocalRise content safely. Use when editing `lib/content`, service pages, packages, FAQs, concept sites, WhatsApp messages, pricing, CTAs, metadata copy, or any UI that consumes shared content. Ensure coupled ids, FAQ indices, package references, and honest-content rules stay valid. Do not use for styling-only edits that do not change content data.
---

# LocalRise Content Integrity

## Workflow

1. Read `docs/content.md` and `knowledge/decisions/004-honest-content-policy.md`.
2. Inspect the touched content files and the components/routes that consume them.
3. Preserve coupled content contracts:
   - `services[].id` must match `serviceDetails[id]`.
   - `serviceDetails.faqPicks` must index existing `faqs`.
   - `relatedPackageId` must match `packages[].id`.
   - Concept sites must remain clearly labelled as design concepts.
4. Keep copy in `lib/content` and import through `@/lib/content`; do not hard-code reusable copy, prices, services, or contact details in components.
5. Do not fabricate testimonials, client logos, ratings, addresses, case-study results, revenue claims, or metrics.
6. Run `npm run typecheck`; run `npm run build` when changed content affects routes, generated metadata, JSON-LD, sitemap output, or static params.

## Review Checklist

- Confirm every new or changed id has all required matching records.
- Confirm user-facing claims are supported by existing project facts.
- Confirm WhatsApp and CTA text still routes to the existing communication helpers.
- Confirm Tailwind classes stored in content are complete literal class names, not dynamically assembled fragments.

## Output

Report content contracts checked, claims reviewed, verification run, and any content assumptions that still need the owner to confirm.
