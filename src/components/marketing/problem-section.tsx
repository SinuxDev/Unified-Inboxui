import { cn } from '@/lib/utils';

const APP_CARDS = [
  {
    name: 'Email',
    icon: 'E',
    dot: 'bg-sky-500',
    border: 'border-l-sky-500',
    count: '342 unread',
  },
  {
    name: 'Telegram',
    icon: 'T',
    dot: 'bg-cyan-500',
    border: 'border-l-cyan-500',
    count: '89 new',
  },
  {
    name: 'Messenger',
    icon: 'M',
    dot: 'bg-indigo-500',
    border: 'border-l-indigo-500',
    count: '27 waiting',
  },
  {
    name: 'Teams',
    icon: 'Tm',
    dot: 'bg-violet-500',
    border: 'border-l-violet-500',
    count: '156 today',
  },
] as const;

const STATS = [
  { value: '4', label: 'Apps open' },
  { value: '12+', label: 'Alerts today' },
  { value: '1', label: 'Shared inbox needed' },
] as const;

export function ProblemSection() {
  return (
    <section className="inview-section border-y border-border/60 bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            The problem
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your customer conversations live in separate worlds.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every channel means another tab, another login, another place to
            check. Teams lose context, miss messages, and waste time jumping
            between apps instead of replying.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-3 sm:max-w-sm">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-background/80 px-3 py-3 text-center"
              >
                <dt className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <p className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Without a unified inbox
            </p>
            <div className="mt-4 grid gap-3">
              {APP_CARDS.map((app) => (
                <div
                  key={app.name}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border border-border/80 bg-muted/20 px-4 py-3',
                    app.border,
                    'border-l-[3px]',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-lg text-[11px] font-bold text-white shadow-xs',
                      app.dot,
                    )}
                  >
                    {app.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {app.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {app.count}
                    </p>
                  </div>
                  <span className="size-1.5 rounded-full bg-rose-400/70" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              Notifications stack up. Context gets lost. Teams burn out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
