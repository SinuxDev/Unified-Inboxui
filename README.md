# Unified Inbox — Frontend

Next.js Phase 0 UI: BFF auth (httpOnly cookie), TanStack Query, org context, teams.

This folder is its **own git repository** (separate from backend).

## Prerequisites

- Node.js 20+
- Nest API running at `http://localhost:3001` (see `../backend`)

## Quick start

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App: `http://localhost:3000`

## Auth model

- Browser talks only to Next (`/api/...`).
- Route Handlers call Nest with `Authorization: Bearer …`.
- Nest JWT access + refresh tokens are stored in httpOnly cookies (`inbox_session`, `inbox_refresh`).
- TanStack Query loads org/teams via same-origin BFF proxies; 401 triggers a silent refresh.

## Main routes

| Path        | Description                  |
| ----------- | ---------------------------- |
| `/register` | Create user + organization   |
| `/login`    | Sign in                      |
| `/`         | Current organization context |
| `/teams`    | List / create teams          |

## Tests

```bash
npm test
```

## Docs

Feature docs live under [`docs/`](docs/).
