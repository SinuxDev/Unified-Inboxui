# Quiet Canvas auth layout

**Date:** 2026-07-21

## What changed

- Replaced default shadcn black/white tokens with cool-grey app-wide palette (`#EEEEEE`, `#DDDDDD`).
- Added shared auth shell: brand top-left, form bottom-left, subtle thread-line background.
- Removed centered `Card` wrappers from login and register forms.
- Set app header to `bg-card` (white) so it contrasts with `#EEEEEE` canvas.

## Why

User-approved design direction: full-bleed minimal layout, creative but clean, cool tone, design consistency across auth and main app.

## Breaking changes

None — auth API, validation, and routing unchanged.

## Migration / follow-ups

- Dark mode theme (deferred)
- Logo/icon when brand assets are ready

## Tests updated or added

- Existing `login-form.test.tsx` passes without structural changes (selectors use labels/roles).
