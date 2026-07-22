import Link from 'next/link';
import type { Metadata } from 'next';
import { ChannelStreamSection } from '@/components/marketing/channel-stream-section';
import { HeroCopy } from '@/components/marketing/hero-copy';
import { HeroWorkspaceStory } from '@/components/marketing/hero-workspace-story';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Unified Inbox',
  description:
    'One workspace for every customer conversation. Email, Telegram, Messenger, and Teams in one calm inbox.',
};

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
        className="marketing-hero-grid pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.92),transparent_58%),radial-gradient(ellipse_at_20%_80%,rgba(221,221,221,0.45),transparent_52%),radial-gradient(ellipse_at_85%_15%,rgba(14,165,233,0.06),transparent_40%)]"
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
        <section
          data-marketing-hero
          className="marketing-hero mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16 lg:pb-24 lg:pt-14"
        >
          <div className="relative z-10">
            <HeroCopy />
            <CtaGroup className="marketing-hero-reveal marketing-hero-reveal-delay-3 mt-8 flex flex-wrap gap-3" />
          </div>

          <div className="relative z-10 lg:pl-2">
            <HeroWorkspaceStory />
          </div>
        </section>

        <ChannelStreamSection />

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="marketing-inview">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Three steps from scattered chats to one calm thread.
            </p>
          </div>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((item) => (
              <li
                key={item.step}
                className="marketing-inview-item flex flex-col gap-3"
              >
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

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <h2 className="marketing-inview text-2xl font-semibold tracking-tight text-foreground">
            Built for teams who reply together
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {OUTCOMES.map((item) => (
              <li key={item.title} className="marketing-inview-item">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="marketing-inview mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-8 sm:py-20">
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
          <p>Unified Inbox</p>
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
