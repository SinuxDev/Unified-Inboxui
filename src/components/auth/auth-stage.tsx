'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ChatMsg = {
  side: 'in' | 'out';
  channel: string;
  text: string;
  time: string;
};

type EmailMsg = {
  from: string;
  to: string;
  subject: string;
  body: string;
  time: string;
  side: 'in' | 'out';
};

type DemoThread = {
  contact: string;
  initials: string;
  channel: 'Telegram' | 'Email' | 'Messenger' | 'Teams';
  kind: 'chat' | 'email';
  preview: string;
  listTime: string;
  accent: string;
  avatar: string;
  subtitle: string;
  messages?: ChatMsg[];
  emails?: EmailMsg[];
};

const DEMOS: DemoThread[] = [
  {
    contact: 'Alex Rivera',
    initials: 'AR',
    channel: 'Telegram',
    kind: 'chat',
    preview: 'Can we move Friday delivery?',
    listTime: '2m',
    accent: 'text-cyan-800 bg-cyan-100',
    avatar: 'bg-cyan-600',
    subtitle: 'Live chat on Telegram',
    messages: [
      {
        side: 'in',
        channel: 'Telegram',
        text: 'Hey, can we move Friday delivery?',
        time: '10:02',
      },
      {
        side: 'out',
        channel: 'You',
        text: 'Sure, what time works?',
        time: '10:03',
      },
      {
        side: 'in',
        channel: 'Telegram',
        text: 'Tomorrow morning is better for us.',
        time: '10:05',
      },
      {
        side: 'out',
        channel: 'You',
        text: 'Done. Booked for Friday at 10.',
        time: '10:06',
      },
    ],
  },
  {
    contact: 'Jordan Lee',
    initials: 'JL',
    channel: 'Email',
    kind: 'email',
    preview: 'Quote request for next week',
    listTime: '18m',
    accent: 'text-sky-700 bg-sky-100',
    avatar: 'bg-sky-600',
    subtitle: 'Email thread',
    emails: [
      {
        side: 'in',
        from: 'Jordan Lee',
        to: 'support@yourcompany.com',
        subject: 'Quote request for next week',
        body: 'Could you send a quote for cleaning three offices and the lobby next week?',
        time: '9:14 AM',
      },
      {
        side: 'out',
        from: 'You',
        to: 'Jordan Lee',
        subject: 'Re: Quote request for next week',
        body: 'Happy to help. Pricing for three offices and the lobby goes out today.',
        time: '9:19 AM',
      },
    ],
  },
  {
    contact: 'Sam Okonkwo',
    initials: 'SO',
    channel: 'Messenger',
    kind: 'chat',
    preview: 'Payment went through, thanks!',
    listTime: '1h',
    accent: 'text-indigo-700 bg-indigo-100',
    avatar: 'bg-indigo-600',
    subtitle: 'Messenger chat',
    messages: [
      {
        side: 'in',
        channel: 'Messenger',
        text: 'Payment went through, thanks!',
        time: '08:41',
      },
      {
        side: 'out',
        channel: 'You',
        text: 'Received. Receipt is on the way.',
        time: '08:42',
      },
      {
        side: 'in',
        channel: 'Messenger',
        text: 'Awesome, see you Thursday.',
        time: '08:43',
      },
    ],
  },
  {
    contact: 'Priya Shah',
    initials: 'PS',
    channel: 'Teams',
    kind: 'chat',
    preview: 'Can you take the Acme lead?',
    listTime: '3h',
    accent: 'text-violet-700 bg-violet-100',
    avatar: 'bg-violet-600',
    subtitle: 'Teams message',
    messages: [
      {
        side: 'in',
        channel: 'Teams',
        text: 'Can you take the Acme lead?',
        time: '07:05',
      },
      {
        side: 'out',
        channel: 'You',
        text: 'Yes, assigning it to me now.',
        time: '07:06',
      },
      {
        side: 'in',
        channel: 'Teams',
        text: 'Thanks. Notes are in the thread.',
        time: '07:07',
      },
    ],
  },
  {
    contact: 'Chris Nguyen',
    initials: 'CN',
    channel: 'Email',
    kind: 'email',
    preview: 'Following up on open ticket #4821',
    listTime: 'Yesterday',
    accent: 'text-sky-700 bg-sky-100',
    avatar: 'bg-slate-600',
    subtitle: 'Email thread',
    emails: [
      {
        side: 'in',
        from: 'Chris Nguyen',
        to: 'support@yourcompany.com',
        subject: 'Following up on ticket #4821',
        body: 'Checking in on ticket #4821. Any update on the login issue?',
        time: '4:20 PM',
      },
      {
        side: 'out',
        from: 'You',
        to: 'Chris Nguyen',
        subject: 'Re: Following up on ticket #4821',
        body: 'Resolved on our side. Please try logging in again and let us know.',
        time: '4:25 PM',
      },
    ],
  },
];

const CHANNEL_PILL: Record<string, string> = {
  Telegram: 'text-cyan-800 bg-cyan-100',
  Email: 'text-sky-700 bg-sky-100',
  Messenger: 'text-indigo-700 bg-indigo-100',
  Teams: 'text-violet-700 bg-violet-100',
  You: 'text-slate-600 bg-slate-200',
};

type ChatLine = ChatMsg & { id: number };
type EmailLine = EmailMsg & { id: number };

function TypingDots({
  initials,
  avatar,
}: {
  initials: string;
  avatar: string;
}) {
  return (
    <div className="flex items-end gap-2">
      <div
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
          avatar,
        )}
      >
        {initials}
      </div>
      <div className="auth-typing flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm">
        <span className="auth-typing-dot size-1.5 rounded-full bg-foreground/35" />
        <span className="auth-typing-dot size-1.5 rounded-full bg-foreground/35" />
        <span className="auth-typing-dot size-1.5 rounded-full bg-foreground/35" />
      </div>
    </div>
  );
}

function ChatBubble({
  line,
  contactInitials,
  contactAvatar,
}: {
  line: ChatLine;
  contactInitials: string;
  contactAvatar: string;
}) {
  const isOut = line.side === 'out';

  return (
    <div
      className={cn(
        'auth-chat-bubble flex max-w-[90%] gap-2',
        isOut
          ? 'auth-chat-bubble-out ml-auto flex-row-reverse'
          : 'auth-chat-bubble-in',
      )}
    >
      <div
        className={cn(
          'mt-auto flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
          isOut ? 'bg-slate-800' : contactAvatar,
        )}
      >
        {isOut ? 'You' : contactInitials}
      </div>
      <div
        className={cn('flex min-w-0 flex-col gap-0.5', isOut && 'items-end')}
      >
        <div
          className={cn(
            'w-fit max-w-full px-3 py-2 text-[13px] leading-snug',
            isOut
              ? 'rounded-2xl rounded-br-md bg-slate-800 text-white'
              : 'rounded-2xl rounded-bl-md bg-white text-slate-800 shadow-sm',
          )}
        >
          {line.text}
        </div>
        <div
          className={cn(
            'flex items-center gap-1.5 px-0.5',
            isOut && 'flex-row-reverse',
          )}
        >
          {line.side === 'in' ? (
            <span
              className={cn(
                'rounded px-1 py-px text-[9px] font-semibold tracking-wide uppercase',
                CHANNEL_PILL[line.channel] ?? CHANNEL_PILL.You,
              )}
            >
              {line.channel}
            </span>
          ) : null}
          <span className="text-[10px] text-muted-foreground">{line.time}</span>
        </div>
      </div>
    </div>
  );
}

function EmailCard({ email }: { email: EmailLine }) {
  const isOut = email.side === 'out';

  return (
    <article
      className={cn(
        'auth-chat-bubble shrink-0 overflow-hidden rounded-lg border border-border bg-white shadow-sm',
        isOut ? 'auth-chat-bubble-out' : 'auth-chat-bubble-in',
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-border bg-[#f8fafc] px-2.5 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">
            {email.subject}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
            <span className="font-medium text-foreground/70">From</span>{' '}
            {email.from}
            <span className="mx-1 text-border">|</span>
            <span className="font-medium text-foreground/70">To</span>{' '}
            {email.to}
          </p>
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {email.time}
        </span>
      </div>
      <p className="line-clamp-2 px-2.5 py-2 text-[12px] leading-snug text-slate-700">
        {email.body}
      </p>
    </article>
  );
}

/**
 * Right-panel inbox preview: chat UI for messaging channels, email UI for Email.
 */
export function AuthStage({
  variant = 'panel',
}: {
  variant?: 'panel' | 'hero';
}) {
  const [demoIdx, setDemoIdx] = useState(0);
  const [chatLines, setChatLines] = useState<ChatLine[]>([]);
  const [emailLines, setEmailLines] = useState<EmailLine[]>([]);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);

  const demo = DEMOS[demoIdx] ?? DEMOS[0];
  const isHero = variant === 'hero';

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    let nextId = 0;
    let current = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) resolve();
          }, ms),
        );
      });

    // Hero: cinematic cuts. Panel: intimate slower beats.
    const pace = isHero
      ? {
          threadStart: 500,
          emailFirst: 500,
          emailNext: 1600,
          typing: 1100,
          afterTyping: 120,
          sending: 420,
          afterSend: 380,
          afterMessage: 1500,
          betweenThreads: 2400,
        }
      : {
          threadStart: 900,
          emailFirst: 700,
          emailNext: 2200,
          typing: 1600,
          afterTyping: 180,
          sending: 700,
          afterSend: 550,
          afterMessage: 2200,
          betweenThreads: 3200,
        };

    async function runLoop() {
      while (!cancelled) {
        const thread = DEMOS[current] ?? DEMOS[0];
        setDemoIdx(current);
        setChatLines([]);
        setEmailLines([]);
        setTyping(false);
        setSending(false);
        await wait(pace.threadStart);

        if (thread.kind === 'email' && thread.emails) {
          for (let i = 0; i < thread.emails.length; i++) {
            if (cancelled) return;
            await wait(i === 0 ? pace.emailFirst : pace.emailNext);
            if (cancelled) return;
            nextId += 1;
            const email = thread.emails[i];
            setEmailLines((prev) => [...prev, { ...email, id: nextId }]);
          }
        } else if (thread.messages) {
          for (let i = 0; i < thread.messages.length; i++) {
            if (cancelled) return;
            const next = thread.messages[i];

            if (next.side === 'in') {
              setTyping(true);
              await wait(pace.typing);
              if (cancelled) return;
              setTyping(false);
              await wait(pace.afterTyping);
            } else {
              setSending(true);
              await wait(pace.sending);
              if (cancelled) return;
            }

            if (cancelled) return;
            nextId += 1;
            setChatLines((prev) => [...prev, { ...next, id: nextId }]);
            if (next.side === 'out') {
              await wait(pace.afterSend);
              if (!cancelled) setSending(false);
            }
            await wait(pace.afterMessage);
          }
        }

        await wait(pace.betweenThreads);
        if (cancelled) return;
        current = (current + 1) % DEMOS.length;
      }
    }

    void runLoop();

    return () => {
      cancelled = true;
      for (const t of timers) window.clearTimeout(t);
    };
  }, [isHero]);

  const frame = (
    <div
      data-auth-anim="stage-frame"
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm',
        isHero
          ? 'hero-stage-frame h-[min(32rem,70vh)] max-h-[32rem] w-full'
          : 'max-h-[28rem] flex-1 xl:max-h-[30rem]',
      )}
    >
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <span
            data-auth-anim="dot"
            className="inline-block size-2 rounded-full bg-cyan-600"
          />
          <span className="text-sm font-medium text-foreground">Inbox</span>
        </div>
        <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-800">
          Open 3
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,38%)_minmax(0,62%)]">
        <div className="flex flex-col border-r border-border">
          {DEMOS.map((thread, i) => (
            <div
              key={thread.contact}
              className={cn(
                'border-b border-border px-3 py-3 last:border-b-0',
                i === demoIdx &&
                  (isHero
                    ? 'hero-thread-active'
                    : 'bg-cyan-50/80 transition-colors duration-500'),
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {thread.contact}
                </p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {thread.listTime}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={cn(
                    'rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase',
                    thread.accent,
                  )}
                >
                  {thread.channel}
                </span>
                <p className="truncate text-xs text-muted-foreground">
                  {thread.preview}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          key={isHero ? `pane-${demoIdx}` : 'pane'}
          className={cn(
            'flex min-h-0 flex-col',
            demo.kind === 'email' ? 'bg-[#f3f4f6]' : 'bg-[#eceff3]',
            isHero && 'hero-pane-reveal',
          )}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-2.5">
            <div
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white',
                demo.avatar,
              )}
            >
              {demo.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {demo.contact}
                </p>
                <span
                  className={cn(
                    'rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase',
                    demo.accent,
                  )}
                >
                  {demo.channel}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {demo.subtitle}
              </p>
            </div>
          </div>

          {demo.kind === 'email' ? (
            <div className="auth-chat-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2.5">
              {emailLines.map((email) => (
                <EmailCard key={email.id} email={email} />
              ))}
            </div>
          ) : (
            <div className="auth-chat-scroll flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-3 py-3">
              {chatLines.map((line) => (
                <ChatBubble
                  key={line.id}
                  line={line}
                  contactInitials={demo.initials}
                  contactAvatar={demo.avatar}
                />
              ))}
              {typing ? (
                <TypingDots initials={demo.initials} avatar={demo.avatar} />
              ) : null}
            </div>
          )}

          <div className="shrink-0 border-t border-border bg-card px-3 py-2">
            {demo.kind === 'email' ? (
              <div className="rounded-md border border-border bg-background px-2.5 py-1.5">
                <p className="text-[10px] text-muted-foreground">
                  Write an email reply...
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <span className="flex-1 text-xs text-muted-foreground">
                  {typing
                    ? `${demo.contact.split(' ')[0]} is typing...`
                    : sending
                      ? 'Sending...'
                      : 'Type a message'}
                </span>
                {!typing && !sending ? <span className="auth-caret" /> : null}
                <span
                  key={sending ? 'send-on' : 'send-off'}
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-medium text-white',
                    sending && 'auth-send-btn-pulse',
                  )}
                >
                  ↑
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isHero) {
    return (
      <div aria-hidden data-stage-motion="hero" className="relative w-full">
        {frame}
      </div>
    );
  }

  return (
    <aside
      aria-hidden
      data-stage-motion="panel"
      className="relative hidden min-h-svh flex-col border-l border-border bg-muted/50 p-8 md:flex xl:p-10"
    >
      <div data-auth-anim="stage-caption" className="mb-5 shrink-0">
        <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
          See it in action
        </p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-foreground xl:text-2xl">
          Every channel. One calm thread.
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Watch Email, Telegram, Messenger, and Teams land in one inbox.
        </p>
      </div>

      {frame}
    </aside>
  );
}
