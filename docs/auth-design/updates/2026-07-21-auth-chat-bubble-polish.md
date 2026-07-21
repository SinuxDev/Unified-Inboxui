# Auth chat bubble polish

**Date:** 2026-07-21

## What changed

- Bubbles use `w-fit max-w-[85%]` so width matches text (no stretched pills).
- Removed duplicate opening line — subject stays in the thread header; chat continues with the reply.
- Locked demo to the Telegram thread (no cycling that fought the chat).
- Added cool color: cyan accents on channels/inbox, cyan customer bubbles, slate agent bubbles.

## Why

Incoming pills were full-width, subject text repeated in the chat, and the panel was too monochrome.

## Breaking changes

None.

## Tests updated or added

None.
