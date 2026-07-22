'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const APPS = [
  {
    id: 'email',
    name: 'Email',
    dot: 'bg-sky-500',
    accent: 'border-l-sky-500',
    badge: 'bg-sky-100 text-sky-800',
    initial: 'E',
    count: 3,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    dot: 'bg-cyan-500',
    accent: 'border-l-cyan-500',
    badge: 'bg-cyan-100 text-cyan-800',
    initial: 'T',
    count: 2,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    dot: 'bg-indigo-500',
    accent: 'border-l-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800',
    initial: 'M',
    count: 1,
  },
  {
    id: 'teams',
    name: 'Teams',
    dot: 'bg-violet-500',
    accent: 'border-l-violet-500',
    badge: 'bg-violet-100 text-violet-800',
    initial: 'Tm',
    count: 4,
  },
] as const;

const STATS = [
  { label: 'Apps open', value: '4' },
  { label: 'Alerts', value: '12+' },
  { label: 'Inbox', value: '1' },
] as const;

const LINK_COORDS = [
  { x: 25, y: 25 },
  { x: 75, y: 25 },
  { x: 25, y: 75 },
  { x: 75, y: 75 },
] as const;

/**
 * Omnichannel section — app-switching chaos visual.
 * Motion is CSS-only (no interval re-renders); JS only pauses when off-screen.
 */
export function ChannelStreamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('switch-paused', !entry?.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '40px 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="channel-stream-section switch-chaos-live marketing-inview relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:py-20">
        <div className="switch-chaos-visual relative order-2 min-w-0 lg:order-1">
          <div
            aria-hidden
            className="switch-panel-frame pointer-events-none absolute -inset-2 hidden sm:block"
          />

          <div className="switch-chaos-panel relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_0_rgb(255_255_255/0.65)_inset,0_20px_50px_rgb(28_31_38/0.06)]">
            <div
              aria-hidden
              className="switch-panel-accent absolute inset-y-0 left-0 w-[3px]"
            />
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/25 px-4 py-3 sm:px-5">
              <p className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                Without a unified inbox
              </p>
              <span className="switch-chaos-banner shrink-0 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold text-background">
                Switching apps…
              </span>
            </div>

            <div className="relative px-4 py-5 sm:px-5 sm:py-6">
              <div className="switch-context-wrap relative mb-4 min-h-[3.25rem]">
                {APPS.map((app, index) => (
                  <p
                    key={app.id}
                    className={cn(
                      'switch-context-line text-sm font-medium text-foreground',
                      `switch-context-line-${index}`,
                    )}
                  >
                    Your team is in{' '}
                    <span className="font-semibold">{app.name}</span> — while
                    alerts pile up elsewhere.
                  </p>
                ))}
              </div>

              <div className="switch-app-grid relative grid grid-cols-2 gap-3">
                {APPS.map((app, index) => (
                  <div
                    key={app.id}
                    className={cn(
                      'switch-app-tile relative z-[1] overflow-hidden rounded-xl border border-border bg-card p-4',
                      app.accent,
                      'border-l-[3px]',
                      `switch-app-tile-${index}`,
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={cn(
                          'switch-app-icon flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card text-[11px] font-bold text-foreground/80',
                          `switch-app-icon-${index}`,
                        )}
                      >
                        {app.initial}
                      </span>
                      <span
                        className={cn(
                          'switch-app-badge flex size-6 items-center justify-center rounded-full text-[10px] font-bold',
                          app.badge,
                        )}
                      >
                        {app.count}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {app.name}
                    </p>
                    <p className="switch-app-status relative mt-1 h-3.5 text-[10px] font-medium text-muted-foreground">
                      <span
                        className={cn(
                          'switch-app-status-label absolute inset-0',
                          `switch-app-status-active-${index}`,
                        )}
                      >
                        Active now
                      </span>
                      <span
                        className={cn(
                          'switch-app-status-label absolute inset-0',
                          `switch-app-status-idle-${index}`,
                        )}
                      >
                        Waiting
                      </span>
                    </p>
                  </div>
                ))}

                <svg
                  aria-hidden
                  className="switch-app-links pointer-events-none absolute inset-0 z-0 size-full text-border"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="2.2"
                    className="switch-app-hub fill-foreground/25"
                  />
                  {APPS.map((app, index) => {
                    const { x, y } = LINK_COORDS[index] ?? LINK_COORDS[0];
                    return (
                      <line
                        key={`link-${app.id}`}
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        className={cn(
                          'switch-app-link stroke-current',
                          `switch-app-link-${index}`,
                        )}
                        strokeWidth="0.35"
                        strokeDasharray="1.5 2"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}
                </svg>

                <div aria-hidden className="switch-focus-spotlight" />
              </div>

              <div className="switch-chaos-meter mt-5 rounded-xl border border-dashed border-border bg-muted/20 px-3 py-3">
                <div className="flex items-center justify-between gap-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  <span>Context switching</span>
                  <span className="switch-meter-label relative h-4 min-w-[9rem] text-foreground normal-case">
                    {APPS.map((app, index) => (
                      <span
                        key={`meter-label-${app.id}`}
                        className={cn(
                          'switch-meter-step absolute inset-0 text-right',
                          `switch-meter-step-${index}`,
                        )}
                      >
                        {index + 1} of 4 apps this minute
                      </span>
                    ))}
                  </span>
                </div>
                <div className="mt-2 flex gap-1">
                  {APPS.map((app, index) => (
                    <span
                      key={`meter-${app.id}`}
                      className={cn(
                        'switch-meter-segment h-1.5 flex-1 rounded-full bg-border',
                        app.dot,
                        `switch-meter-segment-${index}`,
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="switch-chaos-caption mt-3 text-center text-xs text-muted-foreground sm:text-left">
            Notifications stack up every time someone jumps between tools.
          </p>
        </div>

        <div className="channel-stream-copy order-1 min-w-0 lg:order-2 lg:pl-2">
          <p className="channel-stream-eyebrow text-[0.65rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            The switching problem
          </p>
          <h2 className="channel-stream-title mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Every channel.{' '}
            <span className="text-foreground/80">One stream.</span>
          </h2>
          <p className="channel-stream-desc mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Teams lose time and miss context when email, Telegram, Messenger,
            and Teams live in separate tabs. Unified Inbox brings them into one
            calm workspace — no more app-hopping.
          </p>

          <dl className="channel-stream-stats mt-8 grid grid-cols-3 gap-3 sm:max-w-sm">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="channel-stream-stat rounded-xl border border-border bg-background/80 px-3 py-3 text-center"
              >
                <dt className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
