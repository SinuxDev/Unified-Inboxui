# Auth stage right panel

**Date:** 2026-07-21

## What changed

- Added `AuthStage` — a full-height cool-grey visual panel on the **right** at `lg+` (~58% width).
- Auth shell is now a two-column layout: form column left (~42%), stage right.
- Stage uses abstract inbox lanes (vertical/horizontal rules + soft message bars) and a short brand caption — **not** a feature-bullet marketing list.
- Mobile: stage hidden; form column remains full-bleed Quiet Canvas.

## Why

Single-column Quiet Canvas left the right side empty and felt unfinished. Users need visual balance while keeping cool-tone restraint (no generic AI trust-panel feature rows).

## Breaking changes

None.

## Tests updated or added

- Existing login-form tests unchanged (form behavior only).
