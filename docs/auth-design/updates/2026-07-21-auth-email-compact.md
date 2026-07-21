# Compact email cards in auth stage

**Date:** 2026-07-21

## What changed

- Shortened email bodies and From/To labels.
- Compact email card: one-line metadata, `line-clamp-2` body.
- Capped inbox frame height (`max-h-[28rem]`) so email stacks do not stretch the layout.
- Email pane scrolls inside the frame; reply bar stays visible (`shrink-0`).

## Why

Tall email cards overflowed and clipped the reply area.

## Breaking changes

None.
