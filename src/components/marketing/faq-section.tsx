'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: 'Which channels can I connect?',
    a: 'Email (any IMAP provider), Telegram via bot, Facebook Messenger via Page integration, and Microsoft Teams. More channels are in development.',
  },
  {
    q: 'How does the shared inbox work?',
    a: 'Every connected channel feeds into one chronological thread view. Your team can assign conversations, add internal notes, set statuses, and see the full customer history — no more switching between apps.',
  },
  {
    q: 'Can I keep my existing email address?',
    a: 'Yes. You connect your existing email via IMAP. All replies come from your original address, and the thread stays synced both ways.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — 14 days free on any plan. No credit card required. You can downgrade or cancel anytime.',
  },
  {
    q: 'How does team assignment work?',
    a: 'Conversations can be assigned to specific team members. Status tracking (open, pending, resolved), internal notes, and tags keep everyone aligned without meetings or spreadsheets.',
  },
] as const;

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground">{item.q}</span>
        <span
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-45',
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="inview-section mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
