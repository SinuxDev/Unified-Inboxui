# Auth primary button prominence

**Date:** 2026-07-21

## What changed

- Added shared `AuthSubmitButton` with taller height (`h-11`), semibold label, and subtle shadow/hover depth.
- Auth form inputs use consistent `h-10` height so fields and CTA align visually.
- Normalized auth form spacing (`gap-4`) and restored `text-base` form titles.
- Slightly widened auth card (`22–24rem`) so the primary button has room to feel substantial.

## Why

The default `h-8` submit button matched input height and felt flat — users couldn’t “feel” the primary action as distinct from form fields.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

None — styling-only change.
