# Auth chat bubble send animation

**Date:** 2026-07-21

## What changed

- Strengthened outgoing bubble enter motion: rises from the composer (bottom-right), slight overshoot, then settles.
- Incoming bubbles slide in from bottom-left with clearer scale.
- Demo loop pulses the send button and briefly shows “Sending...” before each outgoing bubble appears.
- `prefers-reduced-motion: reduce` disables bubble and send-button animations.

## Why

The live inbox demo on login/register needed a clearer “message sent” feel so outgoing bubbles read as intentional sends, not abrupt list inserts.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Manual: watch `/login` AuthStage chat threads; outgoing bubbles should pop from the composer and the send control should pulse.
