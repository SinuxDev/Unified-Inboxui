# Workspace story layout polish

**Date:** 2026-07-21

## What changed

- Removed connector lines and merge hub (visual clutter + caused cramped columns).
- Channel rows use a 3-column grid: dot · name · metric pill — no overlapping uppercase labels.
- Increased padding and gap spacing throughout the story card.
- Simplified beat animations to opacity/pulse only (no slide transforms on source rows).

## Why

Hero felt too tight; channel names and metrics overlapped on narrower viewports.

## Breaking changes

None.

## Tests updated or added

Manual visual check on landing hero. Frontend typecheck, lint, build.
