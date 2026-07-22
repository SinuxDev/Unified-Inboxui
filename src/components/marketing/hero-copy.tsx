'use client';

import { cn } from '@/lib/utils';

const TITLE_WORDS = ['One', 'workspace', 'for'] as const;

const CHANNELS = [
  { name: 'Email', tone: 'bg-sky-100 text-sky-800', dot: 'bg-sky-500' },
  { name: 'Telegram', tone: 'bg-cyan-100 text-cyan-800', dot: 'bg-cyan-500' },
  {
    name: 'Messenger',
    tone: 'bg-indigo-100 text-indigo-800',
    dot: 'bg-indigo-500',
  },
  {
    name: 'Teams',
    tone: 'bg-violet-100 text-violet-800',
    dot: 'bg-violet-500',
  },
] as const;

export function HeroCopy() {
  return (
    <div data-marketing-hero-copy>
      <div
        className="marketing-hero-status inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 shadow-sm backdrop-blur-sm"
        aria-hidden
      >
        <span className="marketing-status-dot relative flex size-2.5">
          <span className="marketing-status-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-70" />
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

      <h1 className="mt-4 max-w-xl text-4xl leading-[1.06] font-semibold tracking-tight text-foreground sm:text-[3.25rem]">
        {TITLE_WORDS.map((word, index) => (
          <span
            key={word}
            className="marketing-hero-word inline-block"
            style={{ animationDelay: `${0.12 + index * 0.07}s` }}
          >
            {word}
            {'\u00a0'}
          </span>
        ))}
        <span
          className="marketing-hero-accent marketing-hero-accent-shimmer marketing-hero-word inline-block"
          style={{ animationDelay: '0.34s' }}
        >
          every customer conversation
        </span>
      </h1>

      <p className="marketing-hero-desc mt-2 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-lg">
        <span
          className="marketing-hero-desc-line block"
          style={{ animationDelay: '0.58s' }}
        >
          Email, Telegram, Messenger, and Teams land in one shared inbox —
        </span>
        <span
          className="marketing-hero-desc-line mt-1 block"
          style={{ animationDelay: '0.72s' }}
        >
          so your team sees the full story and replies without switching apps.
        </span>
      </p>

      <div
        className="marketing-hero-typing mt-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-2"
        aria-hidden
      >
        <span className="flex items-center gap-1">
          <span className="marketing-typing-dot bg-foreground/55" />
          <span className="marketing-typing-dot bg-foreground/55" />
          <span className="marketing-typing-dot bg-foreground/55" />
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Team replying across channels
        </span>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {CHANNELS.map((channel, index) => (
          <li
            key={channel.name}
            className={cn(
              'marketing-hero-channel marketing-hero-channel-live relative rounded-full px-3 py-1.5 text-xs font-medium',
              channel.tone,
            )}
            style={{ animationDelay: `${0.82 + index * 0.09}s` }}
          >
            <span
              className={cn(
                'mr-1.5 inline-block size-1.5 rounded-full',
                channel.dot,
              )}
            />
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
