# Smooth context-switch transitions

**Date:** 2026-07-21

## What changed

- App-switching chaos section now uses phased transitions instead of instant state swaps.
- Added a sliding focus spotlight that moves between the 2×2 app grid.
- Context line, banner, tiles, badges, and meter segments animate on each switch.
- Switch cycle slowed slightly (`2200ms`) to give transitions room to read.

## Why

The previous implementation remounted context text and banner on every tick, making focus changes feel abrupt.

## Breaking changes

None.

## Tests updated or added

Manual visual check on landing page omnichannel section; `npm run typecheck` passes.
