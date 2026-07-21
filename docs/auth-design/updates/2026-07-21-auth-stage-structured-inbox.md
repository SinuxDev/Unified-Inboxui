# Auth stage structured inbox preview

**Date:** 2026-07-21

## What changed

- Rebuilt `AuthStage` as a **structured inbox mock**: chrome header, conversation list (5 rows), active thread pane with message bars + composer.
- Caption moved to the **top** of the panel (clear hierarchy: title → preview).
- Removed scattered absolute-positioned skeleton bars and random grid lines.

## Why

Floating gray bars read as unfinished placeholders. A framed list + thread layout makes the right side feel intentional, premium, and product-relevant while staying cool-grey.

## Breaking changes

None.

## Tests updated or added

None (decorative UI only).
