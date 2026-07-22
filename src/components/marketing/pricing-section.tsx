'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 19,
    yearly: 190,
    description: 'For small teams getting started with unified messaging.',
    features: [
      'Up to 3 team members',
      '4 channel integrations',
      'Shared inbox',
      'Customer history',
      'Email support',
    ],
    cta: 'Start free trial',
    featured: false,
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 49,
    yearly: 490,
    description: 'For growing teams that need more power and context.',
    features: [
      'Up to 15 team members',
      'All channel integrations',
      'Assignments & statuses',
      'Internal notes & tags',
      'CRM basics',
      'Reporting dashboard',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: 129,
    yearly: 1290,
    description: 'For organizations with advanced security and scale needs.',
    features: [
      'Unlimited team members',
      'Custom channel integrations',
      'SLA management',
      'Advanced reporting',
      'Audit logs',
      'SSO & SCIM',
      'Dedicated success manager',
      '99.9% SLA',
    ],
    cta: 'Contact sales',
    featured: false,
  },
] as const;

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <circle
        cx="7"
        cy="7"
        r="6.5"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="0.5"
      />
      <path
        d="M4.5 7.5l1.5 1.5 3.5-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingCard({
  tier,
  annual,
}: {
  tier: (typeof TIERS)[number];
  annual: boolean;
}) {
  const price = annual ? tier.yearly : tier.monthly;
  const period = annual ? '/year' : '/month';

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow duration-300',
        tier.featured
          ? 'border-primary/40 bg-gradient-to-b from-card to-primary/[0.03] shadow-lg ring-1 ring-primary/15'
          : 'border-border bg-card hover:shadow-md',
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground shadow-sm uppercase">
          Most popular
        </span>
      )}

      <div className={cn(tier.featured && 'mt-4')}>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {tier.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {tier.description}
        </p>

        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            ${price}
          </span>
          <span className="text-xs text-muted-foreground">{period}</span>
        </div>
        {annual && (
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">
            Save ~{Math.round((1 - tier.yearly / (tier.monthly * 12)) * 100)}%
            with annual billing
          </p>
        )}
        {!annual && (
          <p className="mt-1 text-[11px] text-muted-foreground">
            ${tier.monthly * 12}/year billed annually
          </p>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li
            key={f}
            className={cn(
              'flex items-start gap-2 text-xs',
              tier.featured ? 'text-foreground/85' : 'text-foreground/75',
            )}
          >
            <span
              className={cn(
                tier.featured ? 'text-primary' : 'text-foreground/50',
              )}
            >
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={tier.id === 'enterprise' ? '/contact' : '/register'}
        className={cn(
          buttonVariants({
            variant: tier.featured ? 'default' : 'outline',
            size: 'default',
          }),
          'mt-auto self-center transition-all duration-200',
          tier.featured && 'shadow-sm hover:shadow-md',
        )}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="inview-section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,90,62,0.03),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Pricing
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Start free. No credit card required. Upgrade when you grow.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              !annual ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual pricing"
            onClick={() => setAnnual(!annual)}
            className={cn(
              'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200',
              annual ? 'border-primary bg-primary' : 'border-border bg-muted',
            )}
          >
            <span
              className={cn(
                'inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                annual ? 'translate-x-[1.375rem]' : 'translate-x-0.5',
              )}
            />
          </button>
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              annual ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Annual
            <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
              Save up to 20%
            </span>
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:items-stretch">
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} annual={annual} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.{' '}
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Contact us
          </Link>{' '}
          for custom plans.
        </p>
      </div>
    </section>
  );
}
