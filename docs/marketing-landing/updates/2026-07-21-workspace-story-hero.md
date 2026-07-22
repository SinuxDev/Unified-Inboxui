# Workspace story hero (no chat demo)

**Date:** 2026-07-21

## What changed

- Removed `HeroInboxPreview` / `AuthStage` from the landing hero.
- Added `HeroWorkspaceStory`: a card-based three-beat storyboard aligned with the approved product guideline (`docs/superpowers/specs/2026-07-21-landing-converging-threads-design.md`).
- Visual uses channel source cards → unified inbox workspace → team workflow chips — **no chat bubbles or conversation UI**.

## Why

The live chat demo belonged on auth, not marketing. Product guidelines call for an abstract workspace story that teaches Connect → Unify → Reply together without mimicking the product UI.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Manual: landing hero cycles 01–03 beats; team row appears on beat 3; reduced-motion shows final state.
Frontend typecheck, lint, build.
