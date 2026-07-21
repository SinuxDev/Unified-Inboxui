# Auth motion

**Date:** 2026-07-21

## What changed

- Left column: brand fades in; form springs up lightly on mount.
- Right `AuthStage`: panel slides in from the right; caption fades; inbox frame scales in; conversation rows stagger; message bubbles enter from their side; composer fades last; inbox status dot soft-pulses.
- All motion respects `prefers-reduced-motion` (instant static layout).

## Why

Add premium presence without returning to busy marketing animations.

## Breaking changes

None.

## Tests updated or added

- Login form tests unchanged.
