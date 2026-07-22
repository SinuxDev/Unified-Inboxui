const STEPS = [
  {
    num: '01',
    title: 'Connect your channels',
    body: 'Bring email, Telegram, Messenger, and Teams into one place. No migration — just connect what you already use.',
  },
  {
    num: '02',
    title: 'Share one inbox',
    body: 'Your whole team sees the same threads, customer history, and internal notes — no more forwarding or screen sharing.',
  },
  {
    num: '03',
    title: 'Reply with context',
    body: 'Assign conversations, track status, and follow up without jumping between apps. The full story is right there.',
  },
] as const;

export function HowItWorks() {
  return (
    <section className="inview-section mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          How it works
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Three steps to a calm inbox
        </h2>
      </div>
      <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
        <div
          aria-hidden
          className="absolute top-8 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] hidden h-px bg-gradient-to-r from-border/40 via-primary/30 to-border/40 sm:block"
        />
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="relative flex flex-col items-center text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card font-heading text-lg font-semibold text-foreground shadow-sm">
              {step.num}
            </span>
            <div
              aria-hidden
              className="mt-2 h-1 w-px bg-gradient-to-b from-border/60 to-transparent"
            />
            <h3 className="mt-4 font-heading text-base font-semibold tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
