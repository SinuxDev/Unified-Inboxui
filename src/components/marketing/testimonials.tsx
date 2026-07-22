const TESTIMONIALS = [
  {
    quote:
      'We went from five separate apps to one inbox. Our response time dropped by 40% in the first week.',
    name: 'Rina Tanaka',
    role: 'Customer Support Lead',
    org: 'Botanica Retail',
    initials: 'RT',
    featured: true,
  },
  {
    quote:
      'I used to lose customer messages in Telegram DMs every week. Now everything — email, chat, social — is in one place my whole team sees.',
    name: 'Carlos Mendez',
    role: 'Operations Manager',
    org: 'LogiExpress',
    initials: 'CM',
    featured: false,
  },
  {
    quote:
      'The shared customer history alone saved us. No more asking "who replied to this?" — it\'s all right there.',
    name: 'Aisha Patel',
    role: 'Head of Sales',
    org: 'NexGen Solutions',
    initials: 'AP',
    featured: false,
  },
] as const;

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-primary/20"
    >
      <path
        d="M8.5 24C3.8 24 0 20.2 0 15.5V0h10v12H6c0 3.3 1.5 5.5 4 7l-1.5 5zm17.5 0c-4.7 0-8.5-3.8-8.5-8.5V0h10v12h-4c0 3.3 1.5 5.5 4 7l-1.5 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="inview-section border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <p className="text-center text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Testimonials
        </p>
        <h2 className="mt-3 text-center font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Teams love working from one inbox
        </h2>

        <div className="mt-10">
          <blockquote className="relative rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
              <QuoteIcon />
            </div>
            <div className="ml-10 sm:ml-12">
              <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">
                {featured.quote}
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-xs">
                  {featured.initials}
                </span>
                <div>
                  <cite className="not-italic text-sm font-medium text-foreground">
                    {featured.name}
                  </cite>
                  <p className="text-xs text-muted-foreground">
                    {featured.role}, {featured.org}
                  </p>
                </div>
              </footer>
            </div>
          </blockquote>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((t) => (
            <blockquote
              key={t.name}
              className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <div className="absolute top-4 left-4 opacity-60">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 32 24"
                  fill="none"
                  aria-hidden
                  className="text-primary/20"
                >
                  <path
                    d="M8.5 24C3.8 24 0 20.2 0 15.5V0h10v12H6c0 3.3 1.5 5.5 4 7l-1.5 5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="pl-5 text-sm leading-relaxed text-foreground/80">
                {t.quote}
              </p>
              <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                  {t.initials}
                </span>
                <div>
                  <cite className="not-italic text-xs font-medium text-foreground">
                    {t.name}
                  </cite>
                  <p className="text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
