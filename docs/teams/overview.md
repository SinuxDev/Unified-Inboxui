# Teams (frontend)

Phase 0 teams UI for the current organization.

## Behavior

- `GET /api/teams` and `POST /api/teams` proxy authenticated Nest team endpoints.
- List uses TanStack Query (`['teams']`); create invalidates that query.
- Create form is shown only when org role is `owner` or `admin`.
