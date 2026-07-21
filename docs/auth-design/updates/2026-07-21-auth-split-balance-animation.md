# Auth split balance and animation polish

**Date:** 2026-07-21

## What changed

- Rebalanced split columns to ~42/58 (40/60 on xl) instead of a narrow fixed left column.
- Form column right-aligns toward the center seam; showcase left-aligns toward it so both sides sit closer together.
- Softened page-load motion: shorter travel, left-then-right sequencing, slower channel rotation (4.2s).
- Calmed ambient motion: quieter flow lines, slower orb drift, gentler brand glow pulse.

## Why

At 100% zoom the left and right felt disconnected (wide center gap), and animations felt busy relative to the compact form.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

None — layout and motion only.
