# Distinct hero vs auth stage motion

**Date:** 2026-07-21

## What changed

Landing `AuthStage` (`variant="hero"`) uses a separate motion language from the auth panel:

- Bubbles: side slide + blur clear (`hero-bubble-in` / `hero-bubble-out`)
- Send control: glow ring (`hero-send-glow`) instead of scale pop
- Frame: soft shadow breathe
- Thread switch: left accent sweep + pane reveal
- Faster cinematic pacing vs auth’s slower intimate beats

Auth panel keeps the existing rise/overshoot bubble and send-pop animations.

## Why

Sharing one animation set made `/` and `/login` feel like the same clip.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Manual: compare bubble enter on `/` vs `/login`; landing should slide/blur, login should rise/pop.
