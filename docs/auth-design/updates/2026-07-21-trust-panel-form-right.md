# Form-right / trust-panel-left auth layout

**Date:** 2026-07-21

## What changed

- Replaced split inbox-preview layout with **trust panel left (~40%)** and **form right (~60%)**.
- Added `AuthTrustPanel` (brand, headline, three feature rows).
- Removed live inbox showcase, glass card, brand-above-form, and animated word utilities.
- Form is the hero: larger title, roomier spacing, `h-12` gradient CTA with glow + press scale.
- Background simplified to quiet dot grid + slow orbs (no flow-line SVG).
- Mobile: trust panel hidden; compact brand mark above form.

## Why

Research-backed Option A: competing product UI made the page feel busy and oversized at 100% zoom. Form-primary + calm trust panel matches shadcn Split Brand / Aceternity Premium Auth patterns.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Existing login form validation test retained.
