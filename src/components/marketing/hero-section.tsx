'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const ROTATING_WORDS = ['Email', 'Chat', 'Social', 'SMS'];

const CHANNELS = [
  { name: 'Email', dot: 'bg-sky-500', tag: 'bg-sky-100 text-sky-800' },
  { name: 'Telegram', dot: 'bg-cyan-500', tag: 'bg-cyan-100 text-cyan-800' },
  {
    name: 'Messenger',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-100 text-indigo-800',
  },
  { name: 'Teams', dot: 'bg-violet-500', tag: 'bg-violet-100 text-violet-800' },
] as const;

const CHANNEL_MAP = {
  email: { name: 'Email', dot: 'bg-sky-500', tag: 'bg-sky-100 text-sky-800' },
  telegram: {
    name: 'Telegram',
    dot: 'bg-cyan-500',
    tag: 'bg-cyan-100 text-cyan-800',
  },
  messenger: {
    name: 'Messenger',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-100 text-indigo-800',
  },
  teams: {
    name: 'Teams',
    dot: 'bg-violet-500',
    tag: 'bg-violet-100 text-violet-800',
  },
} as const;

const MESSAGE_POOL = [
  {
    id: 'm1',
    channel: 'email',
    name: 'Sarah Chen',
    text: 'Thanks for the update on order #4821',
    time: '2m ago',
  },
  {
    id: 'm2',
    channel: 'telegram',
    name: 'Alex Kim',
    text: 'Can you check the delivery status?',
    time: '1m ago',
  },
  {
    id: 'm3',
    channel: 'messenger',
    name: 'Mia Torres',
    text: 'Is the new collection available?',
    time: '3m ago',
  },
  {
    id: 'm4',
    channel: 'teams',
    name: 'Dev Team',
    text: 'Sprint review at 3pm today',
    time: '30s ago',
  },
  {
    id: 'm5',
    channel: 'email',
    name: 'James Wilson',
    text: 'Invoice #9034 attached',
    time: '5m ago',
  },
  {
    id: 'm6',
    channel: 'telegram',
    name: 'Priya Patel',
    text: 'Meeting confirmed for tomorrow',
    time: '4m ago',
  },
] as const;

const TEAM_AVATARS = [
  { initials: 'AR', online: true },
  { initials: 'JL', online: true },
  { initials: 'SO', online: false },
  { initials: 'MK', online: true },
] as const;

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      const t = setTimeout(() => setCycleKey(1), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCycleKey(1), 600);
    const interval = setInterval(() => setCycleKey((k) => k + 1), 10000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:pb-24 lg:pt-14">
      <div className="relative z-10">
        <div
          className="hero-status-in inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 shadow-xs"
          aria-hidden
        >
          <span className="relative flex size-2.5">
            <span className="live-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium tracking-wide text-foreground">
            Inbox active
          </span>
          <span className="text-border">·</span>
          <span className="text-[11px] text-muted-foreground">
            4 channels connected
          </span>
        </div>

        <h1 className="mt-6 max-w-xl font-heading text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-foreground sm:text-[3.25rem] sm:leading-[1.06]">
          Your team&apos;s{' '}
          <span className="relative inline-flex h-[1.2em] min-w-[4.5rem] items-center overflow-hidden align-baseline text-foreground">
            <span
              key={wordIndex}
              className="inline-block underline decoration-primary/50 decoration-from-font underline-offset-4"
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
          .<br />
          All in one place.
        </h1>

        <p className="hero-desc-in mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Email, Telegram, Messenger, and Teams land in one shared inbox — so
          your team sees the full story and replies without switching apps.
        </p>

        <div className="hero-cta-in mt-8 flex flex-wrap gap-3">
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 px-6 font-medium shadow-sm',
            )}
          >
            Start unifying
          </Link>
          <Link
            href="#demo"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-11 border-border bg-card px-6 text-foreground hover:bg-muted',
            )}
          >
            Live demo
          </Link>
        </div>

        <ul className="hero-channels-in mt-6 flex flex-wrap gap-2">
          {CHANNELS.map((ch) => (
            <li
              key={ch.name}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium',
                ch.tag,
              )}
            >
              <span className={cn('size-1.5 rounded-full', ch.dot)} />
              {ch.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-preview-in relative z-10">
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_0_rgb(255_255_255/0.65)_inset,0_20px_50px_rgb(42_39_34/0.06)]"
          id="demo"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/25 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-2 gap-0.5">
                <span className="size-2 rounded-full bg-rose-400/60" />
                <span className="size-2 rounded-full bg-amber-400/60" />
                <span className="size-2 rounded-full bg-emerald-400/60" />
              </span>
              <span className="text-xs font-medium text-foreground">
                Unified Inbox
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <span className="live-dot size-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          <div className="px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-sm font-medium tracking-tight text-foreground">
                Inbox
              </p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                6 conversations
              </span>
            </div>

            <div className="mt-3 flex min-h-[20rem] flex-col gap-2 sm:min-h-[22rem]">
              {cycleKey > 0 && (
                <div key={cycleKey}>
                  {MESSAGE_POOL.map((msg, i) => {
                    const channel =
                      CHANNEL_MAP[msg.channel as keyof typeof CHANNEL_MAP];
                    const initials = msg.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('');
                    return (
                      <div
                        key={msg.id}
                        className="hero-msg-enter mb-2 flex items-start gap-2.5 rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-xs"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
                            channel.dot,
                          )}
                        >
                          {initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-xs font-medium text-foreground">
                              {msg.name}
                            </span>
                            <span
                              className={cn(
                                'shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium',
                                channel.tag,
                              )}
                            >
                              {channel.name}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {msg.text}
                          </p>
                        </div>
                        <span className="shrink-0 text-[9px] text-muted-foreground">
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2 px-3 py-2 opacity-0 animate-[hero-fade-up_0.4s_cubic-bezier(0.22,1,0.36,1)_0.8s_forwards]">
                    <span className="inline-flex items-center gap-0.5">
                      <span className="typing-dot bg-foreground/50" />
                      <span className="typing-dot bg-foreground/50" />
                      <span className="typing-dot bg-foreground/50" />
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      New messages arriving...
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
              <div className="flex -space-x-2">
                {TEAM_AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className="relative flex size-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[9px] font-semibold text-foreground/70"
                  >
                    {a.initials}
                    {a.online && (
                      <span className="absolute -right-px -bottom-px size-2 rounded-full border border-card bg-emerald-500" />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">
                Team on thread
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
