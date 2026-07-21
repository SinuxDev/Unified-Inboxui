# Marketing landing

**Shipped:** 2026-07-21  
**Latest update:** [2026-07-21 three-beat hero story](./updates/2026-07-21-three-beat-hero-story.md)

## Purpose

Public product story at `/` for logged-out visitors so they understand Unified Inbox before signing in.

## Scope

**In scope**

- Landing route at `/` (marketing route group)
- Quiet Canvas brand lock (shared with auth via `.brand-canvas`)
- Hero with converging-threads motion graphic, channels, how-it-works, outcomes, footer CTAs
- Live inbox demo remains on auth only
- Middleware: public `/`; signed-in `/` redirects to `/app`

**Out of scope**

- Pricing, CRM, reporting, Yangon Broom / CELC deep dive
- Dark marketing theme
- Chat UI on the landing hero

## Behavior

1. Logged-out visitor opens `/` and sees the landing.
2. **Create account** → `/register`; **Sign in** → `/login`.
3. Signed-in visitor opening `/` is redirected to `/app`.
4. Login/register keep the live `AuthStage` demo as a short teaser.

## API or UI surface

| Route                 | Role                       |
| --------------------- | -------------------------- |
| `/`                   | Marketing landing          |
| `/app`                | Signed-in home (`OrgHome`) |
| `/login`, `/register` | Auth + product demo panel  |

## Tenancy / auth notes

Landing is public. App routes `/app` and `/teams` remain session-protected.

## Tests

- Manual route checks (landing, login CTAs, signed-in redirect to `/app`)
- Frontend typecheck, lint, test, build

## Date

2026-07-21
