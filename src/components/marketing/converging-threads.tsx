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

/**
 * Three-beat product story: Connect → Unify → Reply together.
 * Abstract motion only — no chat UI.
 */
export function ConvergingThreads() {
  const [beat, setBeat] = useState<BeatId>(() => {
    if (typeof window === 'undefined') return 'connect';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reply'
      : 'connect';
  });
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

  return (
    <div
      aria-hidden
      data-beat={beat}
      className="converging-threads relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-[0_18px_50px_rgb(28_31_38/0.08)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_35%,rgb(255_255_255/0.9),transparent_55%),radial-gradient(ellipse_at_85%_75%,rgb(221_221_221/0.4),transparent_50%)]" />

      <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-2">
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
        <div className="mt-4 min-h-[4.5rem]">
          <p className="text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {active.step} · {active.title}
          </p>
          <p
            key={active.id}
            className="ct-caption mt-1.5 max-w-sm text-sm leading-snug text-foreground"
          >
            {active.body}
          </p>
        </div>
      </div>

      <svg
        className="relative mx-auto w-full max-w-lg px-2 pb-2"
        viewBox="0 0 520 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ct-spine" x1="200" y1="150" x2="500" y2="150">
            <stop offset="0%" stopColor="#1c1f26" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#1c1f26" stopOpacity="1" />
            <stop offset="100%" stopColor="#1c1f26" stopOpacity="0.75" />
          </linearGradient>
          <filter id="ct-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="ct-channels">
          <path
            className="ct-stream ct-stream-email"
            d="M40 48 C 130 48, 165 150, 236 150"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className="ct-stream ct-stream-telegram"
            d="M40 98 C 125 98, 168 150, 236 150"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className="ct-stream ct-stream-messenger"
            d="M40 202 C 125 202, 168 150, 236 150"
            stroke="#a5b4fc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className="ct-stream ct-stream-teams"
            d="M40 252 C 130 252, 165 150, 236 150"
            stroke="#c4b5fd"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <circle
            className="ct-node ct-node-1"
            cx="40"
            cy="48"
            r="4.5"
            fill="#0ea5e9"
          />
          <circle
            className="ct-node ct-node-2"
            cx="40"
            cy="98"
            r="4.5"
            fill="#06b6d4"
          />
          <circle
            className="ct-node ct-node-3"
            cx="40"
            cy="202"
            r="4.5"
            fill="#6366f1"
          />
          <circle
            className="ct-node ct-node-4"
            cx="40"
            cy="252"
            r="4.5"
            fill="#7c3aed"
          />

          <text x="54" y="52" fill="#0369a1" fontSize="11" fontWeight="600">
            Email
          </text>
          <text x="54" y="102" fill="#0e7490" fontSize="11" fontWeight="600">
            Telegram
          </text>
          <text x="54" y="206" fill="#4338ca" fontSize="11" fontWeight="600">
            Messenger
          </text>
          <text x="54" y="256" fill="#6d28d9" fontSize="11" fontWeight="600">
            Teams
          </text>
        </g>

        <g className="ct-unify">
          <path
            className="ct-spine"
            d="M236 150 H 470"
            stroke="url(#ct-spine)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#ct-soft)"
          />
          <circle className="ct-merge" cx="236" cy="150" r="7" fill="#1c1f26" />
          <circle
            className="ct-merge-ring"
            cx="236"
            cy="150"
            r="14"
            stroke="#1c1f26"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            fill="none"
          />
          <circle className="ct-pulse" r="5" fill="#1c1f26">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path="M236 150 H 470"
            />
          </circle>
          <circle
            className="ct-pulse-soft"
            r="11"
            fill="#1c1f26"
            opacity="0.16"
          >
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path="M236 150 H 470"
            />
          </circle>
          <text
            className="ct-inbox-label"
            x="470"
            y="136"
            textAnchor="end"
            fill="#1c1f26"
            fontSize="12"
            fontWeight="600"
          >
            One inbox
          </text>
        </g>

        <g className="ct-team">
          <circle cx="320" cy="150" r="12" fill="#1c1f26" />
          <text
            x="320"
            y="154"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="600"
          >
            AR
          </text>
          <circle cx="348" cy="150" r="12" fill="#5c6573" />
          <text
            x="348"
            y="154"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="600"
          >
            JL
          </text>
          <circle cx="376" cy="150" r="12" fill="#9ca3af" />
          <text
            x="376"
            y="154"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="600"
          >
            SO
          </text>
          <rect
            x="398"
            y="138"
            width="72"
            height="24"
            rx="6"
            fill="#eeeeee"
            stroke="#dddddd"
          />
          <text
            x="434"
            y="154"
            textAnchor="middle"
            fill="#5c6573"
            fontSize="9"
            fontWeight="600"
          >
            Shared · Open
          </text>
        </g>
      </svg>
    </div>
  );
}
