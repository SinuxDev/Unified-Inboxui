# Auth chat demo pacing (slower)

**Date:** 2026-07-21

## What changed

Slowed the AuthStage live chat/email demo pacing:

- Longer typing indicator before incoming replies (~1.6s)
- Longer “Sending...” beat before outgoing bubbles (~0.7s)
- More pause after each message (~2.2s) and between threads (~3.2s)
- Email cards appear with more spacing too

## Why

Send/reply cadence felt rushed; slower pacing reads calmer and matches the product tone.

## Breaking changes

None.

## Migration / follow-ups

None.

## Tests updated or added

Manual: watch `/login` demo; messages should feel unhurried.
