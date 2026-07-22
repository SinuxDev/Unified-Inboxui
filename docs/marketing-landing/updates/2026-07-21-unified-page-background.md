# Unified marketing page background

**Date:** 2026-07-21

## What changed

- Removed channel-stream section's separate line grid, `bg-muted/30` band, and top/bottom borders.
- Removed `bg-muted/50` band from the outcomes section.
- All marketing sections now share the page-level Quiet Canvas grid and gradient from `page.tsx`.

## Why

The omnichannel section introduced a different grid pattern and tint, creating a visible horizontal seam below the hero.

## Breaking changes

None.

## Tests updated or added

Manual visual check on landing page scroll.
