# Light / dark mode

**Date:** 2026-07-21

## What changed

- Added `next-themes` with class-based `.dark` on `<html>`.
- Defined dark palette in `globals.css` (slate background, blue primary).
- Added `ThemeToggle` to app header and auth pages.
- Refactored auth components to semantic tokens for dark compatibility.

## Why

User requested light/dark mode across the website.

## Breaking changes

None.

## Migration / follow-ups

- Sync theme preference to user profile API later if needed.

## Tests updated or added

Manual verification only.
