# Auth layout center + visible motion

**Date:** 2026-07-21

## What changed

- Left column form uses `justify-center` instead of `justify-end` so brand stays top and form sits mid-column (not stuck at the bottom).
- Entrance animations always run at least as **opacity fades**; when reduced-motion is off, slides/staggers are stronger and slightly longer so they are easy to see on refresh.
- Infinite pulse on the inbox status dot still skips when `prefers-reduced-motion` is on.

## Why

Form felt too low. Animations were gated with `initial={false}` when OS reduced-motion was on (common on Windows), so users saw no motion at all.

## Breaking changes

None.

## Tests updated or added

None (layout/motion only).
