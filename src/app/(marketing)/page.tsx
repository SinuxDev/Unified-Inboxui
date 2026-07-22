import Link from 'next/link';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/hero-section';
import { SocialProof } from '@/components/marketing/social-proof';
import { ProblemSection } from '@/components/marketing/problem-section';
import { FeaturesBento } from '@/components/marketing/features-bento';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Testimonials } from '@/components/marketing/testimonials';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Unified Inbox',
  description:
    'One workspace for every customer conversation. Email, Telegram, Messenger, and Teams in one calm inbox.',
};

export default function MarketingLandingPage() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="marketing-hero-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,242,237,0.95),transparent_58%),radial-gradient(ellipse_at_20%_80%,rgba(224,219,210,0.45),transparent_52%),radial-gradient(ellipse_at_85%_15%,rgba(200,90,62,0.04),transparent_40%)]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <p className="font-heading text-lg font-semibold tracking-tight text-foreground">
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
            className={cn(buttonVariants({ size: 'sm' }), 'px-3 shadow-xs')}
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <HeroSection />
        <SocialProof />
        <ProblemSection />
        <FeaturesBento />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <FaqSection />

        <section className="inview-section border-t border-border/60 bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center sm:px-8 sm:py-20">
            <h2 className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ready to unify your customer conversations?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Create an organization, invite your team, and connect the channels
              you already use. Free for 14 days — no credit card required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-11 px-6 shadow-sm',
                )}
              >
                Start unifying
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
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground sm:px-8">
          <p className="font-heading text-sm font-medium tracking-tight">
            Unified Inbox
          </p>
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
