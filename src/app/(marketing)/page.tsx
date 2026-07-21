import Link from 'next/link';
import type { Metadata } from 'next';
import { ConvergingThreads } from '@/components/marketing/converging-threads';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Unified Inbox | Future Wave',
  description:
    'One workspace for every customer conversation. Email, Telegram, Messenger, and Teams in one calm inbox.',
};

const CHANNELS = [
  { name: 'Email', tone: 'bg-sky-100 text-sky-800' },
  { name: 'Telegram', tone: 'bg-cyan-100 text-cyan-800' },
  { name: 'Messenger', tone: 'bg-indigo-100 text-indigo-800' },
  { name: 'Teams', tone: 'bg-violet-100 text-violet-800' },
] as const;

const STEPS = [
  {
    step: '01',
    title: 'Connect your channels',
    body: 'Bring email, Telegram, Messenger, and Teams into one place.',
  },
  {
    step: '02',
    title: 'Share one inbox',
    body: 'Your whole team sees the same threads, notes, and customer history.',
  },
  {
    step: '03',
    title: 'Reply with context',
    body: 'Assign, follow up, and resolve without jumping between apps.',
  },
] as const;

const OUTCOMES = [
  {
    title: 'Miss fewer messages',
    body: 'Every channel lands in one stream so nothing important gets buried.',
  },
  {
    title: 'Shared customer history',
    body: 'Conversations stay with the customer, not trapped in personal inboxes.',
  },
  {
    title: 'Faster follow-ups',
    body: 'Assign work, track status, and keep the team aligned around each thread.',
  },
] as const;

function CtaGroup({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="/register"
        className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-6')}
      >
        Create account
      </Link>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'lg' }),
          'h-11 border-border bg-card px-6 text-foreground hover:bg-muted',
        )}
      >
        Sign in
      </Link>
    </div>
  );
}

export default function MarketingLandingPage() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.85),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(221,221,221,0.55),transparent_50%)]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <p className="text-lg font-semibold tracking-tight text-foreground">
          Unified Inbox
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'text-foreground',
            )}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ size: 'sm' }), 'px-3')}
          >
            Create account
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:pb-24 lg:pt-12">
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Future Wave
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
              One workspace for every customer conversation
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bring email, Telegram, Messenger, and Teams into one calm inbox so
              your team never misses a message and always has the full story.
            </p>
            <CtaGroup className="mt-8 flex flex-wrap gap-3" />
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-2xl bg-white/50 blur-2xl sm:-inset-6"
            />
            <div className="relative">
              <ConvergingThreads />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/80">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14 sm:px-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Every channel. One stream.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Stop switching apps. Customer messages meet your team in a
                single shared workspace.
              </p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {CHANNELS.map((channel) => (
                <li
                  key={channel.name}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${channel.tone}`}
                >
                  {channel.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Three steps from scattered chats to one calm thread.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((item) => (
              <li key={item.step} className="flex flex-col gap-3">
                <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border bg-muted/50">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Built for teams who reply together
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {OUTCOMES.map((item) => (
                <li key={item.title}>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready for one inbox?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Create an organization and invite your team. Start with the channels
            you already use.
          </p>
          <CtaGroup className="flex flex-wrap gap-3" />
        </section>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground sm:px-8">
          <p>Unified Inbox by Future Wave</p>
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
