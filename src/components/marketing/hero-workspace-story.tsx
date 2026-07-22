'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const BEATS = [
  {
    id: 'connect',
    step: '01',
    title: 'Connect',
    body: 'Email, Telegram, Messenger, and Teams feed into one place.',
  },
  {
    id: 'unify',
    step: '02',
    title: 'Unify',
    body: 'Every channel locks into one shared inbox thread.',
  },
  {
    id: 'reply',
    step: '03',
    title: 'Reply together',
    body: 'Your team sees the same conversation and can follow up.',
  },
] as const;

type BeatId = (typeof BEATS)[number]['id'];

const BEAT_MS = 3400;

const SOURCES = [
  {
    id: 'email',
    name: 'Email',
    metric: '3 new',
    dot: 'bg-sky-500',
    tag: 'bg-sky-100 text-sky-800',
    status: 'Online',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    metric: '2 waiting',
    dot: 'bg-cyan-500',
    tag: 'bg-cyan-100 text-cyan-800',
    status: 'Active',
  },
  {
    id: 'messenger',
    name: 'Messenger',
    metric: '1 open',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-100 text-indigo-800',
    status: 'Typing',
  },
  {
    id: 'teams',
    name: 'Teams',
    metric: '4 today',
    dot: 'bg-violet-500',
    tag: 'bg-violet-100 text-violet-800',
    status: 'Online',
  },
] as const;

const STREAM = [
  {
    channel: 'Email',
    tag: 'bg-sky-100 text-sky-800',
    width: 'w-[68%]',
    state: 'new' as const,
  },
  {
    channel: 'Telegram',
    tag: 'bg-cyan-100 text-cyan-800',
    width: 'w-[52%]',
    state: 'typing' as const,
  },
  {
    channel: 'Messenger',
    tag: 'bg-indigo-100 text-indigo-800',
    width: 'w-[58%]',
    state: 'read' as const,
  },
] as const;

const TEAM = [
  { initials: 'AR', tone: 'bg-foreground text-background', online: true },
  { initials: 'JL', tone: 'bg-[#5c6573] text-white', online: true },
  { initials: 'SO', tone: 'bg-[#9ca3af] text-white', online: false },
] as const;

function TypingDots({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      <span className="ws-typing-dot bg-foreground/50" />
      <span className="ws-typing-dot bg-foreground/50" />
      <span className="ws-typing-dot bg-foreground/50" />
    </span>
  );
}

function StatusDot({ className }: { className?: string }) {
  return (
    <span
      className={cn('ws-status-dot relative inline-flex size-2.5', className)}
    >
      <span className="ws-status-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}

/**
 * Three-beat workspace storyboard with live-status motion (no chat UI).
 */
export function HeroWorkspaceStory() {
  const [beat, setBeat] = useState<BeatId>(() => {
    if (typeof window === 'undefined') return 'connect';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reply'
      : 'connect';
  });

  const [activeSource, setActiveSource] = useState(0);

  const active = BEATS.find((b) => b.id === beat) ?? BEATS[0];

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % BEATS.length;
      setBeat(BEATS[i].id);
    }, BEAT_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActiveSource((prev) => (prev + 1) % SOURCES.length);
    }, 1200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      data-beat={beat}
      className="workspace-story relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-[0_18px_50px_rgb(28_31_38/0.07)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgb(255_255_255/0.98),transparent_58%)]" />

      <div className="relative border-b border-border/80 px-6 py-6 sm:px-7">
        <div className="flex items-center gap-2.5">
          {BEATS.map((b) => (
            <span
              key={b.id}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-500',
                b.id === beat ? 'bg-foreground' : 'bg-border',
              )}
            />
          ))}
        </div>
        <div className="mt-4 min-h-[3.25rem]">
          <p className="text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {active.step} · {active.title}
          </p>
          <p
            key={active.id}
            className="ws-caption mt-1.5 max-w-md text-sm leading-snug text-foreground"
          >
            {active.body}
          </p>
        </div>
      </div>

      <div className="relative px-6 py-6 sm:px-7 sm:py-7">
        <div className="ws-stage grid min-w-0 gap-6 xl:grid-cols-2 xl:items-start xl:gap-8">
          <ul className="ws-sources min-w-0 space-y-3">
            {SOURCES.map((source, index) => (
              <li
                key={source.id}
                className={cn(
                  'ws-source-row min-w-0',
                  index === activeSource && 'ws-source-row-active',
                )}
              >
                <div className="ws-source-card overflow-hidden rounded-xl border border-border bg-card px-4 py-3.5">
                  <div className="flex items-start gap-3">
                    <span className="relative mt-1 flex size-2.5 shrink-0 items-center justify-center">
                      <span
                        className={cn('size-2.5 rounded-full', source.dot)}
                      />
                      {index === activeSource ? (
                        <span className="ws-source-ring absolute inset-0 rounded-full border border-current opacity-40" />
                      ) : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {source.name}
                        </span>
                        <span
                          className={cn(
                            'ws-metric shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap',
                            source.tag,
                            index === activeSource && 'ws-metric-flash',
                          )}
                        >
                          {source.metric}
                        </span>
                      </div>
                      <span className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                        {source.status === 'Typing' ? (
                          <>
                            <TypingDots />
                            <span>Typing</span>
                          </>
                        ) : (
                          <>
                            <StatusDot className="size-2 shrink-0" />
                            <span>{source.status}</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="ws-inbox min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  Unified workspace
                </p>
                <span className="ws-live-badge inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  One inbox
                </p>
                <span className="ws-inbox-count shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium whitespace-nowrap text-foreground">
                  4 channels
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {STREAM.map((row, index) => (
                <div
                  key={row.channel}
                  className={cn(
                    'ws-stream-row flex min-w-0 items-center gap-2.5 overflow-hidden rounded-xl border border-border/80 bg-muted/30 px-3 py-2.5',
                    row.state === 'typing' && 'ws-stream-row-typing',
                    index === activeSource % STREAM.length &&
                      'ws-stream-row-active',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 shrink-0 rounded-full',
                      row.state === 'new'
                        ? 'ws-stream-dot-new bg-sky-500'
                        : 'bg-foreground/60',
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    {row.state === 'typing' ? (
                      <TypingDots className="py-0.5" />
                    ) : (
                      <span
                        className={cn(
                          'block h-2 max-w-full rounded-full bg-border',
                          row.width,
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap',
                      row.tag,
                    )}
                  >
                    {row.channel}
                  </span>
                </div>
              ))}
            </div>

            <div className="ws-team mt-5 w-full min-w-0 border-t border-border pt-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex shrink-0 -space-x-2">
                  {TEAM.map((member) => (
                    <span
                      key={member.initials}
                      className={cn(
                        'relative flex size-8 items-center justify-center rounded-full border-2 border-card text-[10px] font-semibold',
                        member.tone,
                      )}
                    >
                      {member.initials}
                      {member.online ? (
                        <span className="absolute -right-px -bottom-px size-2 rounded-full border border-card bg-emerald-500" />
                      ) : null}
                    </span>
                  ))}
                </div>
                <p className="min-w-0 truncate text-xs text-muted-foreground">
                  Team on thread
                </p>
              </div>
              <div className="mt-3 flex max-w-full flex-wrap gap-2">
                <span className="ws-workflow-chip rounded-md bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground">
                  Shared
                </span>
                <span className="ws-workflow-chip ws-workflow-chip-open rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background">
                  Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
