# Quiet Canvas marketing continuity

**Date:** 2026-07-21

## What changed

- Marketing layout uses `.brand-canvas` (shared light cool-grey tokens with auth).
- Landing CTAs use charcoal primary / outline card styles matching login Sign in.
- Hero is split: product story + live `AuthStage` (`variant="hero"`).
- Soft radial atmosphere on cool-grey canvas; channel pills match auth accents.

## Why

Landing followed system dark theme (navy + blue buttons) while auth locked Quiet Canvas, so the two surfaces felt like different products.

## Breaking changes

None.

## Migration / follow-ups

Signed-in app theme toggle remains; `/` and auth stay light brand canvas.

## Tests updated or added

Manual: with OS dark mode on, `/` and `/login` both show cool-grey + charcoal CTAs and the same inbox demo language.
