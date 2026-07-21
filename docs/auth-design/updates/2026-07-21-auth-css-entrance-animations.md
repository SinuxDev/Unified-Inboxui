# Auth CSS entrance animations

**Date:** 2026-07-21

## What changed

- Replaced Motion.js entrance animations with **CSS keyframes** under `.auth-canvas` in `globals.css`.
- `AuthShell` sets `data-ready="true"` after mount (double `requestAnimationFrame`) so animations start after paint and are visible.
- Brand, form, stage panel, caption, inbox frame, thread rows, messages, composer, and status-dot pulse all use `data-auth-anim`.

## Why

Motion entrances were not visible (hydration / `prefers-reduced-motion` / too-subtle). CSS keyframes after mount are reliable and clearly visible on refresh.

## Breaking changes

None.

## Tests updated or added

- Login form tests unchanged.
