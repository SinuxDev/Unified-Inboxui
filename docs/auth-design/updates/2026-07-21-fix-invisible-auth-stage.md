# Fix invisible auth stage panel

**Date:** 2026-07-21

## What changed

- Removed `data-auth-anim` from the stage **root** (it was stuck at `opacity: 0` when CSS animation did not complete).
- Added `opacity: 1` fallback when `data-ready="true"`.
- Show stage + two-column grid from **`md`** (768px), not only `lg`.
- Safety timeout forces `data-ready` after 100ms.

## Why

Right column looked empty: the inbox panel was in the DOM but invisible (`opacity: 0`), so users only saw the grey canvas.

## Breaking changes

None.

## Tests updated or added

None.
