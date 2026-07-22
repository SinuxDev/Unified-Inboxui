# Premium surface for app-switching section

**Date:** 2026-07-21

## What changed

- Removed gradient blur orbs, radial washes, and drifting arc SVGs from the omnichannel section.
- Replaced with Quiet Canvas premium treatment: hairline grid, corner bracket frame, solid accent rail, and diagram-style connection lines between apps.
- App tiles are flat `bg-card` with crisp left accent stripes instead of gradient fills.

## Why

Gradient blur felt generic and clashed with the calm, editorial Quiet Canvas direction.

## Breaking changes

None.

## Tests updated or added

Manual visual check; `npm run typecheck` passes.
