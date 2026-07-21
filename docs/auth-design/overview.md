# Auth design system

**Shipped:** 2026-07-21  
**Latest update:** [2026-07-21 creative auth motion](./updates/2026-07-21-creative-auth-motion.md)

## Purpose

App-wide cool-grey visual foundation and a shared “Quiet Canvas” auth shell for login and register pages.

## Scope

**In scope**

- CSS design tokens in `globals.css` (light theme)
- Auth layout with brand top-left, form bottom-left, thread-line background
- Flat login/register forms (no centered card)

**Out of scope**

- Dark mode
- Logo/icon asset
- Marketing pages

## Color tokens

| Token      | Hex       | Role                  |
| ---------- | --------- | --------------------- |
| Canvas     | `#EEEEEE` | Page background       |
| Surface    | `#DDDDDD` | Borders, muted fills  |
| Elevated   | `#FFFFFF` | Cards, inputs, header |
| Ink        | `#1C1F26` | Text, primary buttons |
| Ink muted  | `#5C6573` | Secondary text        |
| Focus ring | `#9CA3AF` | Focus outlines        |

Mapped to shadcn variables: `--background`, `--border`, `--card`, `--foreground`, `--primary`, `--muted-foreground`, `--ring`, etc.

## Auth shell layout

- **Desktop:** Brand block top-left; form anchored bottom-left (`max-w-md`).
- **Mobile:** Same structure; fewer decorative thread lines.
- **Thread lines:** Full-width `#DDDDDD` at 8% opacity, `aria-hidden`.

## Files

| File                                    | Role                         |
| --------------------------------------- | ---------------------------- |
| `src/app/globals.css`                   | App-wide tokens              |
| `src/app/(auth)/layout.tsx`             | Auth route layout            |
| `src/components/auth/auth-shell.tsx`    | Full-bleed shell             |
| `src/components/auth/auth-brand.tsx`    | Wordmark + tagline           |
| `src/components/auth/login-form.tsx`    | Flat sign-in form            |
| `src/components/auth/register-form.tsx` | Flat register form           |
| `src/components/app/app-header.tsx`     | White header bar (`bg-card`) |

## Tests

- `src/components/auth/login-form.test.tsx` — validation behavior unchanged

## Related

- Spec: `docs/superpowers/specs/2026-07-21-auth-design-system-design.md`
- Update: [2026-07-21 Quiet Canvas layout](./updates/2026-07-21-quiet-canvas-auth-layout.md)
