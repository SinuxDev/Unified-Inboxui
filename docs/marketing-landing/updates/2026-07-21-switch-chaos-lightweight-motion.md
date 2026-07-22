# Lightweight CSS-only switch motion

**Date:** 2026-07-21

## What changed

- Replaced JavaScript interval + multi-state re-renders with pure CSS keyframe cycling (9.6s loop).
- Removed `isSwitching`, badge bump remounts, animated grid drift, and transition stacks.
- JS now only attaches an `IntersectionObserver` to pause motion when the section is off-screen.
- Static badge counts; context lines crossfade via stacked elements and CSS delays.

## Why

The previous smooth-motion approach triggered 3+ React re-renders per switch and many simultaneous CSS transitions, making the landing page feel heavy.

## Breaking changes

None.

## Tests updated or added

Manual visual check; verify scroll-away pauses animation in DevTools Performance panel.
