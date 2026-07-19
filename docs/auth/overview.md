# Auth (frontend)

Phase 0 authentication UI and BFF for Unified Inbox.

## Behavior

- `POST /api/auth/register` and `POST /api/auth/login` proxy to Nest, set httpOnly cookies `inbox_session` (access) and `inbox_refresh` (refresh), return user + organization (tokens never sent to JS).
- `POST /api/auth/refresh` uses the refresh cookie to mint a new pair and rotate both cookies.
- `POST /api/auth/logout` clears both cookies (and best-effort Nest ack).
- Middleware treats the user as signed in if **either** cookie is present.
- BFF Nest calls and client TanStack fetches retry once after a silent refresh on `401`.

## UI

- Register and login forms validate with Zod and submit via TanStack Query mutations.
