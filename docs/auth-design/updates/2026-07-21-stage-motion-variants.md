# Auth panel keeps intimate motion

**Date:** 2026-07-21

## What changed

`AuthStage` now scopes motion by `data-stage-motion`:

- `panel` (login/register): existing bubble rise + send pop
- `hero` (landing): cinematic blur/slide, glow send, thread sweep (CSS under `[data-stage-motion='hero']`)

## Why

Landing and auth need different preview motion so they don’t feel duplicated.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Manual compare `/` vs `/login` demo animations.
