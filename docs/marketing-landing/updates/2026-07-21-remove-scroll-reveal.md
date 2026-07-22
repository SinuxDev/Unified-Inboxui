# Remove scroll reveal animations

**Date:** 2026-07-21

## What changed

- Removed `ScrollReveal` component and all scroll-triggered IntersectionObserver instances from the landing page.
- Restored static sections below the hero; content is visible immediately on scroll.
- Removed channel section entrance animations tied to scroll reveal.

## Why

Multiple scroll observers and React re-renders made the page feel heavy again.

## Breaking changes

None.

## Tests updated or added

Manual scroll check — no fade-in observers; app-switch demo still pauses off-screen via single observer.
