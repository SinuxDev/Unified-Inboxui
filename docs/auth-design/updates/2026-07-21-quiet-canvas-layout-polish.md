# Quiet Canvas layout polish

**Date:** 2026-07-21

## What changed

- Fixed auth shell grid so the form anchors **bottom-left** on desktop (`grid-rows-[auto_1fr]` + `justify-end` on main).
- Made thread lines visible (`bg-border/35` instead of 8% color-mix that disappeared on canvas).
- Added minimal inbox thread mark beside brand wordmark.
- Forced light input/label styles inside `.auth-canvas` when global dark mode is on (fixes washed-out labels and grey inputs).
- Inputs: white elevated surface with `shadow-sm` and explicit border.

## Why

First Quiet Canvas pass was structurally correct but looked unfinished: form sat under brand instead of bottom-left, decorative lines were invisible, and dark-mode Tailwind utilities overrode auth tokens.

## Breaking changes

None.

## Tests updated or added

- Existing `login-form.test.tsx` — unchanged behavior.
