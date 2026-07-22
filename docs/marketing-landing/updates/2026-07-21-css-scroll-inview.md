# CSS scroll-driven section reveals

**Date:** 2026-07-21

## What changed

- Added `marketing-inview` / `marketing-inview-item` classes with native `animation-timeline: view()` scroll enter.
- Applied to omnichannel section, How it works, outcomes, and final CTA on the landing page.
- No JavaScript observers or React re-renders; unsupported browsers show content immediately.

## Why

User wanted scroll animation without the performance cost of the prior `ScrollReveal` IntersectionObserver approach.

## Breaking changes

None.

## Tests updated or added

Manual scroll in Chrome/Edge/Safari 26+; reduced-motion and legacy browsers show static content.
