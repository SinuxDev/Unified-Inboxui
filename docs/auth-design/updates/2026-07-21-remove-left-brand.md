# Remove left brand block

**Date:** 2026-07-21

## What changed

- Removed the left-column brand header (thread mark + “Unified Inbox” + tagline) from `AuthShell`.
- Shifted the sign-in form slightly upward (`justify-center` + extra bottom padding `pb-[18vh]`).

## Why

User requested removing that header cluster and raising the form.

## Breaking changes

None. `AuthBrand` file remains unused for now (can be reused later if needed).

## Tests updated or added

None.
