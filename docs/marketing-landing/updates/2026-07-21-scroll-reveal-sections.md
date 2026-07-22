# Scroll-triggered section reveals

**Date:** 2026-07-21

## What changed

- Added `ScrollReveal` client component using `IntersectionObserver` + CSS fade/slide-in.
- Applied scroll reveals to omnichannel section, How it works, outcomes, and final CTA blocks with staggered delays on grid items.
- Channel section inner stagger animations now run only after scroll reveal is visible.

## Why

Landing sections below the hero should animate in as the user scrolls, without heavy JS loops or re-renders.

## Breaking changes

None.

## Tests updated or added

Manual scroll check; reduced-motion shows content immediately.
