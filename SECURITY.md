# Security — Unified Inbox (Frontend)

This checklist ships with the frontend git repo.

## Frontend must-haves

- [x] httpOnly cookies for access + refresh (never `localStorage` for JWTs)
- [x] `Secure` cookies in production; `SameSite=Lax`
- [x] Origin allowlist checks on mutating `/api/*` BFF routes (`ALLOWED_ORIGINS`)
- [x] `API_URL` server-only; no secrets in `NEXT_PUBLIC_*`
- [x] Middleware cookie presence ≠ authorization (Nest enforces JWT + RBAC)
- [ ] Keep Next.js on patched releases (ongoing)

## BFF model

Browser talks only to Next. Nest JWTs stay in httpOnly cookies. Silent refresh on 401 via `/api/auth/refresh`.
