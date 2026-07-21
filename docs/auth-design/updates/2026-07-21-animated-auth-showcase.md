# Animated split-panel auth showcase

**Date:** 2026-07-21

## What changed

- Split login/register layout: form left, animated inbox preview right (desktop).
- Added `AuthShowcase` with cycling conversation cards, channel pills, typing indicator, and stat tiles.
- Added staggered entrance animations via Motion (`auth-stagger`, panel slide-ins).
- Installed `motion` dependency.

## Why

User requested a more impressive, creative auth experience with animation. Research (shadcn split login blocks, Motion + shadcn patterns) favors split-panel SaaS auth with product preview and orchestrated motion.

## Breaking changes

None.

## Tests updated or added

None — visual/animation only; existing login form test unchanged.

## Follow-ups

- Optional mobile showcase strip
- Dark mode variant for showcase panel
