const DESKTOP_LINES = ['24%', '46%', '68%'] as const;
const MOBILE_LINES = ['38%', '64%'] as const;

/** Thread lines on the form column only — stage panel has its own composition. */
export function AuthBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden lg:right-0"
    >
      {DESKTOP_LINES.map((top) => (
        <div
          key={top}
          className="absolute inset-x-0 hidden h-px bg-border/40 lg:block"
          style={{ top }}
        />
      ))}
      {MOBILE_LINES.map((top) => (
        <div
          key={`m-${top}`}
          className="absolute inset-x-0 h-px bg-border/40 lg:hidden"
          style={{ top }}
        />
      ))}
    </div>
  );
}
