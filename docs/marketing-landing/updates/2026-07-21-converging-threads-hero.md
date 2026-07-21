# Converging threads hero (no chat)

**Date:** 2026-07-21

## What changed

- Landing hero no longer embeds `AuthStage` chat preview.
- New `ConvergingThreads` SVG motion graphic: Email / Telegram / Messenger / Teams streams merge into one charcoal spine with a traveling pulse.
- Auth login/register keep the live inbox demo unchanged.

## Why

Landing needed a product-native motion graphic, not a duplicate of the auth chat UI.

## Breaking changes

None.

## Migration / follow-ups

`AuthStage` `variant="hero"` remains unused; can be removed later if unused.

## Tests updated or added

Manual: `/` shows converging threads; `/login` still shows chat demo.
