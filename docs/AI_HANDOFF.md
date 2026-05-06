# MOSCATELLI Studio — AI Handoff Notes

Version: v88  
Last updated: 06 May 2026, 12:30 CEST  
Status: Internal founder command surface / private operating archive

---

## 1. Purpose

MOSCATELLI Studio is not a public website, portfolio, investor presentation, or decorative landing page.

It is intended to become the internal command centre for MOSCATELLI: a controlled surface for doctrine, product development, launch readiness, decisions, supplier structure, financial access, visual references, and private operational links.

The correct standard is not “more impressive UI”. The correct standard is controlled usefulness: sober navigation, founder clarity, disciplined structure, and no invented operational facts.

---

## 2. Current Architecture

Core runtime files:

- `index.html` — main document, section structure, PWA metadata links, visible content containers.
- `style.css` — full visual system, responsive behaviour, dashboard modules, modals, directory layouts.
- `script.js` — gate, navigation, language system, details, modals, cards, interactive behaviours.
- `manifest.webmanifest` — PWA identity, app name, display mode, icons.
- `sw.js` — service worker, cache version, offline shell and runtime asset caching.
- `assets/` — icons, startup images, product/packaging/link imagery.
- `docs/AI_HANDOFF.md` — internal continuity documentation for future AI/developer work.

Current primary sections:

1. Dashboard
2. Mandate
3. Atlas
4. Codex
5. Decision Register
6. Lotto (I - II - III)
7. Manufattura
8. Circuit
9. Links

Important structural choices:

- Supplier Desk lives inside Manufattura, not in the main navigation.
- Launch Readiness lives inside Dashboard.
- Private Links are grouped in the Links section.
- Decision Register is visible as a core internal ledger.
- Lotto I is active; Lotto II and Lotto III are deliberately reserved.
- No visible Version History panel exists yet. Version history belongs in this documentation until the app becomes complex enough to justify a user-facing changelog.

---

## 3. Patch Sequence

### v64 — App identity cleanup

- Clarified MOSCATELLI Studio as an internal operating surface rather than a decorative public experience.
- Reduced ambiguity around the app’s role and hierarchy.
- Preserved the luxury tone without turning the interface into a public-facing theatre.

### v65 — Fast access mode

- Added a more direct route into the app’s working surfaces.
- Reduced unnecessary friction once the access ritual has served its purpose.
- Preserved the controlled threshold feeling while improving practical use.

### v66 — Dashboard

- Added the Dashboard as the first operational surface.
- Established a compact command view for priorities, launch signals, and current state.
- Positioned the app more clearly as a founder workflow tool rather than a static archive.

### v67 — Decision Register

- Added a static founder ledger for locked, active, pending, and rejected decisions.
- Created a place to prevent repeated debate over already settled standards.
- Preserved reasoning behind important choices such as ivory packaging and oxblood restraint.

### v68 — Lotto workspace

- Added a dedicated product workspace for Lotto I, II, and III.
- Kept Lotto I active and Lotto II/III reserved until proof is earned.
- Captured the scarf’s current technical logic, open questions, colours, and packaging dependency.

### v69 — Supplier Desk

- Added Supplier Desk as an internal Manufattura module rather than a main navigation item.
- Created supplier placeholder structure without inventing supplier data.
- Kept categories broad and practical: Mills, Packaging, Labels/Trims, Production Support.

### v70 — Launch Readiness

- Added a static Launch Readiness module inside Dashboard.
- Introduced a practical checklist across product, suppliers, packaging, website, photography, finance, fulfilment, investor proof, and admin.
- Kept the module sober and non-editable at this stage.

### v71 — Links directory

- Rebuilt Links into a structured internal directory.
- Included current external/internal surfaces such as the MOSCATELLI website, pitch deck, Studio, Financial Suite, and reserved placeholders.
- Added discreet caution around private MOSCATELLI links not being shared with third parties outside the business.

### v72 — AI handoff documentation

- Added `/docs/AI_HANDOFF.md` for continuity between AI models, developers, and future audits.
- No new visible feature was added.
- Version was still bumped because the delivered ZIP changed and the service worker cache must advance.

### v73 — Desktop usability and performance weight audit

- Removed non-essential image preloads from the initial document shell.
- Reduced the oversized `ritual-oxblood.webp` image from 4608 px wide to 1920 px wide while preserving its visual role.
- Slimmed service-worker pre-cache to the shell and essential icons; large visual assets now cache on demand.
- Throttled spotlight updates through `requestAnimationFrame` and stopped duplicate pointer/mouse updates on desktop.
- Reduced repeated pointer target classification by recalculating only when the hovered target changes.
- Added discreet desktop scrollbars for scrollable sections so desktop users can see when a panel has more content.

### v74 — Mobile performance and bottom navigation stability

- Hardened mobile-only performance after the v73 desktop patch.
- Removed live bottom-nav anticipation glow during fast swipes.
- Disabled boundary-resistance transform during live film-strip scrolling.
- Deferred loop correction until scroll settlement instead of correcting scroll position mid-gesture.
- Reduced bottom-nav repaint and reflow cost by using fixed dot dimensions with transform-based scaling.
- Removed live font-weight, letter-spacing, text-shadow, and backdrop-blur churn from the mobile bottom nav.
- Disabled the fixed grain overlay on mobile to reduce compositing work.
- Preserved active, near, far, and current-page states with a cheaper rendering model.

### v75 — Typography scale audit

- Rebalanced typography across desktop and mobile without changing the app structure.
- Reduced oversized hero, dashboard, section, and panel titles so they feel institutional rather than theatrical.
- Increased undersized micro-text, badges, statuses, navigation labels, and dense card copy for better legibility.
- Added final typography tokens at the end of `style.css` so future AI/developer patches have a clear scale to preserve.
- Kept the patch visual-only and static; no new UI features or content areas were introduced.



### v78 — Translation coverage and pointer responsiveness

Patch XV corrected visible untranslated fragments and improved the custom desktop pointer response without adding interface weight.

Confirmed refinements:
- Replaced remaining English operational labels in Italian and Portuguese/Brazilian where they read as untranslated UI rather than intentional MOSCATELLI terminology.
- Added translation coverage for the menu language label and localized ARIA labels used by navigation, detail triggers, directories, and controls.
- Kept MOSCATELLI-specific terms stable where appropriate: Lotto, Manufattura, Studio, Bianco Avorio, Terra Bruna, Rosso Essenza / oxblood, GSM, MOQ, and URL strings.
- Changed the custom pointer movement from left/top layout updates to transform-based requestAnimationFrame updates.
- Throttled the ambient spotlight update so pointer movement remains smoother and does not repaint the interface on every movement event.
- Added no assets, no libraries, and no new UI modules.

### v77 — Translation accuracy and contextual language audit

Patch XIV audited the in-app language system across English, Italian, and Portuguese/Brazilian. The patch corrected contextual translation issues without adding UI, assets, libraries, or runtime weight.

Confirmed refinements:
- Replaced misleading “locked/bloccato/bloqueado” wording with confirmed/fixed decision language where the meaning is approved, not blocked.
- Replaced technical “sync” fragments with full synchronization language in Italian and Portuguese.
- Improved sourcing vocabulary: mills became lanifici/tecelagens where context required textile producers rather than generic suppliers.
- Reduced literal translations around route, production intelligence, proof before scale, pending statuses, and fulfilment.
- Improved Portuguese/Brazilian accuracy around embalagem, toque, caimento, and spaces reserved/placeholders.
- Improved Italian institutional tone around scatola rigida, evidenze, in sospeso, in corso, and espansione.
- Preserved intentional MOSCATELLI terminology such as Lotto, Manufattura, Bianco Avorio, Terra Bruna, Rosso Essenza / oxblood, and Studio.

No visual changes were intended beyond the version bump.

### v76 — Interface polish and motion refinement

- Refined section transition motion to reduce theatrical 3D movement and improve perceived speed.
- Reduced hover lift, excessive media zoom, heavy shadows, and rough transition timing across cards, links, buttons, detail overlays, and menu preview states.
- Reduced desktop blur/shadow intensity where it created visual weight without improving utility.
- Stabilised mobile bottom navigation further by throttling live centre-item reclassification during fast touch swipes and allowing the film-strip to settle after the gesture.
- Shifted mobile nav scroll snapping from strict mandatory behaviour to proximity snapping for less fighting against fast finger movement.
- Kept the patch performance-neutral: no new assets, no new libraries, no new UI modules, and no heavier service-worker pre-cache.

---

## 4. Design Principles

- Internal first. Do not optimise for public impressiveness unless asked.
- Founder utility before visual spectacle.
- Patch narrowly. Do not perform broad multi-area redesigns without explicit approval.
- Preserve MOSCATELLI’s tone: institutional, restrained, severe, Roman, warm-ivory, quiet authority.
- Do not overfill the app with invented content.
- Do not invent supplier names, costs, private links, investor evidence, or operational progress.
- Keep empty placeholders clearly marked as placeholders.
- Prefer founder-controlled static structure now; editable systems can come later.
- Keep oxblood as an accent or ritual colour, not a loud surface fill.
- Avoid turning the app into a generic startup dashboard.

---

## 5. Known Constraints

- This is a static front-end package with no backend.
- Sensitive private links should not be added until protected hosting/access control exists.
- Static placeholders must not be mistaken for verified operational records.
- The service worker cache version must be bumped on every delivered ZIP to avoid stale deployments. Keep the pre-cache lean: shell first, heavy imagery on demand.
- Translation integrity matters: English, Italian, and Portuguese content should remain aligned.
- Mobile behaviour must remain a priority because the app is likely to be checked quickly, not only studied on desktop.
- Runtime file references must be audited before every ZIP delivery.

---

## 6. Recommended Future Patches

Only proceed one controlled patch at a time. Ask Gianluca targeted questions before changing scope.

Near-term candidates:

1. Product Stage Status System — add per-stage states later for product, packaging, and label workflows.
2. Supplier Entry Detail Pattern — only once real supplier data exists.
3. Financial Suite Integration Note — a clearer Dashboard card or status once manual financial KPIs are ready.
4. Website / Checkout Readiness Checklist — dedicated review once public launch flow is being prepared.
5. Founder Notes / Internal Doctrine Archive — only when it serves retrieval, not decoration.
6. Version History UI — postpone until team usage or complexity justifies it.

---

## 7. Instructions for Future AI Models

Before making changes:

- Read this file first.
- Inspect `index.html`, `style.css`, `script.js`, `manifest.webmanifest`, and `sw.js` before proposing patches.
- Ask focused questions if the change affects visible structure, hierarchy, wording, privacy, or founder workflow.
- Do not rush with a “nice idea” patch. Utility and discipline come first.

When patching:

- Patch one small scope at a time.
- Avoid broad rewrites.
- Preserve the visual system unless the requested patch requires CSS.
- Keep new content multilingual if it appears in the UI.
- Do not add a visible changelog unless Gianluca requests it again.
- Do not add real private URLs, supplier records, financial numbers, or investor claims without explicit verified data from Gianluca.
- Avoid over-polishing. This app must become useful, not merely more decorative.

Before delivering a ZIP:

- Bump the visible version label where relevant.
- Bump the service worker cache version.
- Run JavaScript syntax checks.
- Validate JSON syntax for `manifest.webmanifest`.
- Audit HTML, CSS, JS, manifest, and service worker runtime references.
- Confirm no referenced runtime assets are missing.
- Confirm ZIP integrity.
- Mention the audit results in the delivery response.

---

## 8. Current Delivery Notes

v85 makes the custom desktop cursor track pointer coordinates directly, without requestAnimationFrame smoothing or CSS transform transition on the outer cursor. Pointer position is now updated before ambient spotlight scheduling so visual tracking is immediate.

The correct principle remains: polish must not add weight. Prefer fewer effects, shorter transitions, restrained shadows, and delayed settlement over live class churn during gestures.


### v79 — Hard-coded Translation Sweep
- Added localization for generated CSS attribute content, including dashboard card hover panels and status tooltips.
- Replaced remaining English-only dashboard/detail/status tooltip text in Italian and Portuguese/Brazilian contexts.
- Added translation hooks for `data-dashboard-detail`, `data-status-detail`, and the version hover label.
- Corrected residual wording where “blocked/locked” could imply obstruction rather than founder-confirmed readiness.
- No new assets, no new libraries, and no UI redesign.
### v80 — Add MRHG Link

- Added the active MRHG website link to the Links directory under Public Surfaces.
- Added English, Italian, and Portuguese/Brazilian translation entries for the MRHG title, note, hover detail, and ARIA label.
- Kept the change deliberately narrow: no layout redesign, no new assets, no new libraries, and no private/admin URLs added.
- Bumped visible app version and service-worker cache to v80.

### v82 — Links Card Backgrounds

- Added image-backed link cards for the four active external destinations.
- Added dedicated `link-card__bg` layers with dark overlays and subtle hover scale.
- Introduced optimized WebP link-card preview assets.
- Kept link-card styling self-contained in `index.html`.


### v84 — Links Card Composition Refinement
- Refined the four active Links cards after visual review.
- Removed external arrows and card description text.
- Anchored link text to the bottom of each card and increased card height to improve image breathing room.
- Replaced diagonal overlay with bottom-up gradient to protect title/URL readability while keeping the upper image visible.
- Tightened grid gap, reduced radius to 10px, and quieted URL text.
- No new assets, no new libraries, and no broader interface changes.


### v88 — MA.AL.BI. Archived for Lotto I
- Updated Supplier Desk with MA.AL.BI.'s second reply on 06 May 2026.
- Recorded that MA.AL.BI. does not currently hold the requested baby alpaca article or routinely treat the requested baby alpaca yarn.
- Recorded their custom-development constraint: from-zero development would require testing finishes, yields, yarn sourcing, and several hundred pieces as sampling.
- Marked MA.AL.BI. as archived for Lotto I and retained only as a possible future wool/cashmere contact.
- Updated Dashboard and Launch Readiness supplier copy to show 1 archived mill and 2 pending replies.
- Added archived supplier status styling and translated keys across EN, IT, and PT.
- Bumped visible app version and service-worker cache to v88.

### v87 — MA.AL.BI. Reply Logged
- Updated Supplier Desk to record MA.AL.BI.'s first reply on 06 May 2026.
- Marked their supplied A/W catalogue article as a product mismatch: 80% alpaca / 20% polyamide, raised fluffy surface, stripe design, and long twisted fringe.
- Kept MA.AL.BI. open only as a possible bespoke-development route pending custom MOQ, sample cost, sample timing, and 100% baby alpaca yarn capability.
- Updated Dashboard and Launch Readiness supplier copy to show 1 reply / 3 contacted mills.
- Added responded supplier status styling and translated keys across EN, IT, and PT.
- Bumped visible app version and service-worker cache to v87.

### v86 — Supplier Outreach Records
- Added three real contacted mill records inside Supplier Desk: Locatex, MA.AL.BI., and MyLab.
- Recorded supplier emails and first-contact status without treating any supplier as approved.
- Updated Dashboard and Launch Readiness supplier copy to reflect first outreach while keeping sample cost, lead time, MOQ, yarn availability, and physical sample validation as pending.
- Added contacted supplier status styling and email link treatment.
- Bumped visible app version, script metadata, and service-worker cache to v86.

### v85 — Direct Cursor Tracking
- Removed requestAnimationFrame batching from custom cursor position updates.
- The outer custom cursor now updates its transform immediately inside the pointermove handler.
- Pointer positioning now runs before ambient spotlight scheduling.
- Removed CSS transition from the outer `.mc-pointer` element so position and visibility are not eased.
- No new assets, no new libraries, and no UI redesign.

### v83 — Active Links Only / Image Mapping Correction

- Corrected the swapped MOSCATELLI Website and Pitch Deck background images.
- Replaced the full Links directory with a compact four-card active grid.
- Removed visible placeholder categories and inactive/unavailable rows from the Links interface.
- Kept the four active destinations: MOSCATELLI Website, MRHG Website, Financial Suite, and Pitch Deck.
- Bumped visible app version, script metadata, and service-worker cache to v83.

