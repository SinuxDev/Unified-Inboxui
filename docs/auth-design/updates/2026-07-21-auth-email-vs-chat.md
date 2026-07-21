# Auth email vs chat layouts

**Date:** 2026-07-21

## What changed

- Email threads use an **email card UI** (From, To, Date, Subject, body) instead of chat bubbles.
- Telegram, Messenger, and Teams keep chat bubbles.
- Email composer shows “Write an email reply...” instead of a chat input.
- Mixed Telegram+Email chat script removed so Email is never shown as a chat bubble.

## Why

Email rendered as chat-to-chat looked wrong; users expect mail headers and longer body text.

## Breaking changes

None.

## Tests updated or added

None.
