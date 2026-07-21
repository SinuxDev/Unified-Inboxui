'use client';

import { useEffect, useState } from 'react';
import { AuthBackground } from '@/components/auth/auth-background';
import { AuthStage } from '@/components/auth/auth-stage';

export function AuthShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    // Safety: never leave auth content invisible
    const fallback = window.setTimeout(() => setReady(true), 100);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className="auth-canvas relative min-h-svh bg-background md:grid md:grid-cols-[minmax(0,42%)_minmax(0,58%)]"
      data-ready={ready ? 'true' : 'false'}
    >
      <div className="relative flex min-h-svh flex-col">
        <AuthBackground />

        <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-[18vh] pt-10 sm:px-10 md:px-12 md:pt-12">
          <div data-auth-anim="form" className="w-full max-w-[28rem]">
            {children}
          </div>
        </main>
      </div>

      <AuthStage />
    </div>
  );
}
