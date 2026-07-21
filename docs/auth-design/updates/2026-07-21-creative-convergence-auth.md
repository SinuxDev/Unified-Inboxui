# Creative convergence auth layout

**Date:** 2026-07-21

## What changed

- Restored asymmetric split layout: compact glass form column + live inbox showcase panel on `lg+`.
- Added `AuthGlassCard` with gradient border, backdrop blur, and top glow wash.
- Enhanced `AuthBackground` with drifting gradient orbs and animated SVG convergence flow lines.
- Redesigned `AuthBrand` with layered icon mark, Future Wave eyebrow, and left-aligned split layout.
- Rebuilt `AuthShowcase` as a full live preview: channel pills sync to active thread, glass inbox card, stats row.
- Upgraded `AuthSubmitButton` with gradient fill and hover shimmer.

## Why

Centered card layout felt generic and uninspiring. The convergence metaphor (channels flowing into one inbox) gives a distinctive, product-specific visual identity while keeping form sizing compact at 100% zoom.

## Breaking changes

None.

## Migration / follow-ups

- Mobile (`< lg`) shows form only; showcase hidden. Optional future: compact mobile preview strip.

## Tests updated or added

None — layout and styling only.
