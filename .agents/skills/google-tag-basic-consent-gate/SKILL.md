---
name: google-tag-basic-consent-gate
description: Implement or audit Basic Consent Mode v2 and consent-gated Google Ads or GA click conversion events when requirements include explicit opt-in, zero Google requests before consent, persistent choices, withdrawal, genuine-action tracking, and matching privacy disclosures. Do not use for configuring conversion actions inside Google Ads, GTM container design, server-side tagging, or legal advice.
---

# Google Tag Basic Consent Gate

Build a consent boundary whose observable network behavior matches the privacy promise. Treat a green build as necessary but insufficient.

## Inputs

- Confirm the framework, router, global layout, static/server output mode, and existing analytics architecture.
- Obtain only real, owner-provided tag IDs. Never invent conversion labels or measurement IDs.
- Search for existing Google loaders, `gtag` calls, GTM containers, consent storage, event emitters, and privacy wording before editing.
- Record the exact products authorized. Do not enable GA4, conversions, enhanced conversions, or remarketing merely because the code can support them.

## Implementation gate

1. Keep Basic Consent Mode strict: before opt-in, create only the local `dataLayer`/`gtag` queue and enqueue `consent default` with `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization` denied.
2. Do not render, preload, fetch, or configure Google's external script before consent. Do not send cookieless pings.
3. Store the choice under a versioned first-party key with only explicit `granted` or `denied` values. Access browser storage after hydration with failure guards.
4. Show an accessible, non-dismissible choice UI until Accept or Reject. Give both actions comparable clarity, keyboard access, and visible focus.
5. On Accept, persist granted, enqueue the four granted fields, then load the Google script and configure only authorized IDs. Protect script and config initialization independently from duplication.
6. On Reject, persist denied and leave the script absent. Preserve navigation, contact, phone, and messaging behavior.
7. Provide a persistent preference control. On withdrawal, enqueue denied, block future application events, and expire recognizable first-party Google advertising cookies for relevant host/domain/path combinations where browser rules allow. If Google's runtime already executed, hard-reload after saving denial; removing a script element does not unload its listeners, and leaving it active can degrade Basic into denied-state cookieless measurement.
8. Gate every application event at its shared emission boundary using the same stored-consent check. A consent-aware loader alone is insufficient.
9. Ensure client navigation neither remounts nor duplicates the loader. Keep metadata-exporting layouts server components when the framework requires it.

## Application conversion events

1. Map every genuine action and prove whether it converges on a shared execution seam. Search for direct destination URLs that bypass that seam.
2. Fire the conversion at the shared action boundary immediately before the real destination opens. Do not attach handlers separately to every visual button and do not track decorative icons or page loads.
3. Require stored granted consent, an enabled owner-supplied destination, and an existing `window.gtag`. A denied click must remain a tracking no-op and must not load Google.
4. Keep the event payload limited to the authorized fields. Do not invent labels, enhanced-conversion data, or message content.
5. Avoid `event_callback` when the external action can open synchronously. Catch measurement failures so tracking never delays or blocks navigation.
6. Guarantee one event per physical click at the central seam. If nested or bubbling callers are possible, use a same-browser-task guard that resets in a microtask; later user clicks must remain independently trackable.

## Disclosure integrity

- Update the existing privacy policy to name the active provider, purpose, exact tag ID, choice mechanism, withdrawal limitation, and provider privacy/cookie links.
- State that rejection does not disable ordinary site use.
- Do not claim GA4, conversion events, message-content access, automatic deletion of already transmitted data, or any capability not actually enabled.
- Keep implementation documentation synchronized with the active consent architecture.

## Verification

Run the repository's typecheck, lint, tests, production build, and whitespace checks when available. Then inspect the generated artifact and use a real browser with Google requests intercepted and counted.

Verify these states separately:

1. First visit: banner visible, zero Google requests, zero config calls, ordinary UI usable.
2. Reject and reload: stored denied, banner closed, zero Google requests.
3. Accept and reload: one script element/request and one authorized config call per document.
4. Client navigation: no additional script request or config call.
5. Granted to denied: stored denied, latest consent update denied, removable first-party Google ad cookies gone, application events blocked.
6. Denied to granted and re-grant: one loader/config initialization with no duplication.
7. Generated routes: no active Google loader or external Google origin in static HTML before hydration and consent.
8. Privacy route and exceptional chrome-free routes: preference access and wording match behavior.
9. Conversion surfaces: no-consent and denied clicks open the real destination with zero conversion calls; granted clicks emit the exact destination once and still open it. Exercise representative wrappers plus every distinct direct call path.

## Output

Report files changed, storage key, enabled IDs/products, browser scenario results, artifact scan, checks run, duplication result, disclosure changes, and any deployment or owner action still required.
