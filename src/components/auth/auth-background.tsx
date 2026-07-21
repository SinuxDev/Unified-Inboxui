'use client';

import { motion, useReducedMotion } from 'motion/react';

export function AuthBackground() {
  const rm = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_0)] bg-size-[28px_28px] opacity-50 dark:opacity-35" />

      {/* Slow-drifting large muted shape — very subtle */}
      {!rm && (
        <motion.div
          className="absolute left-[5%] top-[15%] size-[min(480px,55vw)] rounded-full bg-primary/[0.045] blur-3xl dark:bg-primary/[0.065]"
          animate={{
            x: [0, 18, 0],
            y: [0, -14, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
