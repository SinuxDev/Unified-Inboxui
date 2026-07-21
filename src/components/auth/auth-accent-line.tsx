'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Solid accent bar that draws in on mount (shadcn “accent line” pattern, no gradient). */
export function AuthAccentLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn('h-px w-full overflow-hidden bg-border', className)}
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-foreground"
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
        }
      />
    </div>
  );
}
