# BFF API response envelope

## Purpose

Browser-facing BFF routes return the same `{ success, message, data }` envelope as the Nest API so client code has one contract.

## Scope

All routes under `frontend/src/app/api/**`.

## Behavior

- Success: `jsonSuccess(data, status?)` in `frontend/src/lib/api/http.ts`
- Errors: `jsonError(error, status?)` returns `{ success: false, message, data: null }`
- `clientFetchJson` returns unwrapped `data`; throws `ClientApiError` with `message` on failure
- `nestFetch` unwraps Nest envelope before BFF handlers run

## Tests

- `frontend/src/lib/query/client-fetch.test.ts`

## Date

2026-07-21
