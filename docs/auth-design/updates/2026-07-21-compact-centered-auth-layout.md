# Compact centered auth layout

**Date:** 2026-07-21

## What changed

- Replaced the 50/50 split-panel auth layout with a centered single-column layout (~20–22rem wide).
- Moved brand above the form card with smaller, centered typography.
- Replaced the full-height product showcase with a compact inbox preview strip below the form (visible from `sm` breakpoint up).
- Tightened form spacing and heading sizes for a normal feel at 100% browser zoom.

## Why

At 100% zoom the split layout felt oversized — large hero copy and a half-screen preview made the page dominate the viewport. A centered, compact column matches typical SaaS login proportions.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

None — layout-only change. Existing auth form tests unchanged.
