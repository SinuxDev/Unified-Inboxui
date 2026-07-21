# Creative auth motion (research-backed)

**Date:** 2026-07-21

## What changed

- Added orchestrated spring staggers on the trust panel (logo → copy → features), matching shadcn **Login Staggered Animation**.
- Added solid **accent line** that draws in via `scaleX` on the form card and under the headline (shadcn **Login Gradient Accent** pattern, without gradients).
- Form card enters with a spring (opacity + slight scale).
- Split seam grows vertically on load.
- Feature rows slide slightly on hover; icon springs on hover.
- Submit button uses Motion `whileHover` / `whileTap` springs (Context7 / motion.dev).
- Respects `prefers-reduced-motion`.

## Why

User asked for creative animation researched via MCP/web. Browse MCP was unavailable (Chrome binary missing); used WebSearch, WebFetch (shadcn/Aceternity patterns), and Context7 Motion docs instead.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

None — motion-only.
