# JWT access + refresh cookies

**Date:** 2026-07-19

## Change

- Dual httpOnly cookies: `inbox_session` (access, 15m) and `inbox_refresh` (refresh, 7d).
- New BFF route `POST /api/auth/refresh`.
- `nestFetch` and `clientFetchJson` perform a single refresh + retry on Nest/BFF `401`.
- Middleware allows app routes when only the refresh cookie remains.

## Why

Match Nest JWT-only refresh without exposing tokens to the browser, while keeping short-lived access claims for authorization.
