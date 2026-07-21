# Auth stage live chat demo

**Date:** 2026-07-21

## What changed

- `AuthStage` is a client component with a **looping chat demo**: typing indicator → message bubbles slide in → conversation resets and repeats.
- Conversation list **highlight cycles** through threads every ~4s.
- Composer shows “Customer is typing…” / blinking caret.
- CSS: bubble enter, typing-dot bounce, caret blink.

## Why

Entrance-only animations felt static after refresh. Users want continuous, reactive “live inbox” motion.

## Breaking changes

None.

## Tests updated or added

None (decorative demo).
