'use client';

import { motion, useReducedMotion } from 'motion/react';
import { AuthAccentLine } from '@/components/auth/auth-accent-line';
import { AuthBackground } from '@/components/auth/auth-background';
import { AuthTrustPanel } from '@/components/auth/auth-trust-panel';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const sp = (stiffness = 280, damping = 26, delay = 0) =>
  ({ type: 'spring', stiffness, damping, delay }) as const;

export function AuthShell({ children }: { children: React.ReactNode }) {
  const rm = useReducedMotion();

  return (
    <div className="relative min-h-svh lg:grid lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
      <AuthBackground />

      <div className="absolute top-4 right-4 z-20 sm:top-5 sm:right-5">
        <ThemeToggle />
      </div>

      {/* Trust panel */}
      <section className="relative hidden min-h-svh border-r border-border lg:block">
        <AuthTrustPanel />
        {/* Vertical seam accent that grows in */}
        {!rm && (
          <motion.div
            aria-hidden
            className="absolute top-1/2 right-[-1px] z-10 h-[35%] w-px origin-center -translate-y-1/2 bg-foreground/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </section>

      {/* Form panel */}
      <section className="relative flex min-h-svh items-center justify-center px-4 py-10 sm:px-6 lg:px-14 lg:py-12">
        <motion.div
          className="relative z-10 w-full max-w-[21rem] sm:max-w-[22rem]"
          initial={rm ? false : { opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={rm ? { duration: 0 } : sp(260, 24, 0.15)}
        >
          {/* Mobile brand */}
          <motion.div
            className="mb-6 flex items-center justify-center gap-2 lg:hidden"
            initial={rm ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={rm ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
          >
            <span className="size-1.5 rounded-full bg-foreground" aria-hidden />
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Unified Inbox
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <AuthAccentLine />
            <div className="p-5 sm:p-6">{children}</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
