# Theme (light / dark mode)

**Shipped:** 2026-07-21

## Purpose

App-wide light and dark themes with system preference support and a toggle in the header and auth pages.

## Scope

**In scope**

- `next-themes` provider on root layout
- CSS variable pairs in `globals.css` (`:root` + `.dark`)
- Theme toggle in app header and auth shell
- Auth UI uses semantic tokens so both modes render correctly

**Out of scope**

- Per-user theme persistence on the server (client localStorage only via `next-themes`)
- Theme-specific assets or illustrations

## Behavior

- **Default:** follows OS (`prefers-color-scheme`) via `defaultTheme="system"`.
- **Toggle:** sun/moon button switches between light and dark.
- **Persistence:** preference stored in `localStorage` by `next-themes`.
- **Markup:** `.dark` class on `<html>` drives Tailwind `dark:` variants and CSS variables.

## UI surface

| Location         | Control                               |
| ---------------- | ------------------------------------- |
| App header       | `ThemeToggle` next to Sign out        |
| Login / Register | `ThemeToggle` top-right of form panel |

## Files

| File                                      | Role                                              |
| ----------------------------------------- | ------------------------------------------------- |
| `src/components/theme/theme-provider.tsx` | `next-themes` wrapper                             |
| `src/components/theme/theme-toggle.tsx`   | Sun/moon toggle button                            |
| `src/app/layout.tsx`                      | Provider + `suppressHydrationWarning` on `<html>` |
| `src/app/globals.css`                     | Light/dark CSS variables                          |

## Tests

Manual: toggle on `/login`, sign in, toggle on home/teams; verify contrast and borders in both modes.

## Related

- Update: [2026-07-21 light-dark mode](./updates/2026-07-21-light-dark-mode.md)
