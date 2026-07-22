# Product-led hero redesign

**Date:** 2026-07-21

## What changed

- Replaced the abstract **converging-threads** SVG (3-beat diagram) with a **live inbox preview** (`HeroInboxPreview`) that reuses `AuthStage` in hero mode.
- Added floating channel notification badges around the preview so visitors instantly see messages arriving from Email, Telegram, Messenger, and Teams.
- Added staggered hero copy entrance animations, animated dot-grid background, gradient headline accent, and channel pills in the hero column.
- Removed `converging-threads.tsx` and related CSS.

## Why

Research (2025–2026 SaaS landing trends) shows **product-led hero sections** outperform abstract diagrams: visitors understand the product in 3–5 seconds when they see a real UI mockup (Linear, Front, Intercom, Synthesia pattern). The previous converging-lines motion required interpretation and felt naive compared to trending B2B SaaS layouts.

## Breaking changes

None (route and CTAs unchanged).

## Migration / follow-ups

- Consider lazy-loading `AuthStage` on the landing hero if bundle size becomes a concern.
- Optional: add scroll-triggered reveal for sections below the fold.

## Tests updated or added

- Manual: landing hero loads, live preview animates, reduced-motion respected, mobile hides floating badges.
- Frontend typecheck, lint, test, build.
