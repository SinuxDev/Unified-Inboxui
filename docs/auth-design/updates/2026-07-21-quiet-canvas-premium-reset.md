# Quiet Canvas premium reset

**Date:** 2026-07-21

## What changed

- Reverted auth from split-screen trust panel (feature bullets, dark theme, centered card) back to **Quiet Canvas** layout per approved spec.
- Applied cool-grey design tokens app-wide in `globals.css` (`#EEEEEE` canvas, `#DDDDDD` surface, `#1C1F26` ink primary).
- Added `.auth-canvas` scope so login/register always render light cool-grey even if the user prefers dark mode elsewhere.
- Rebuilt `AuthShell`: brand top-left, flat form bottom-left, no card wrapper, no theme toggle on auth.
- Replaced decorative dot grid / blur orbs with subtle horizontal **thread lines** (inbox lanes metaphor).
- Flattened login and register forms: removed stagger animations, ink CTA button, white elevated inputs.
- Removed unused components: `auth-trust-panel`, `auth-accent-line`, `auth-stagger`.

## Why

The trust-panel iteration matched generic AI SaaS templates (split layout, feature list, heavy motion, blue/dark palette). The approved direction is calm, cool-toned, premium minimalism with one creative signature element.

## Breaking changes

None — auth validation, API calls, and routing unchanged.

## Migration / follow-ups

- Theme toggle remains on signed-in app header only; auth is light-only.
- Logo/icon asset still out of scope.

## Tests updated or added

- `login-form.test.tsx` — unchanged behavior; passes without structural selector updates.
