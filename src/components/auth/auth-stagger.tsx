'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';

export const authStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.22 },
  },
};

export const authStaggerItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 340, damping: 26 },
  },
};

export function AuthStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rm = useReducedMotion();

  if (rm) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={authStaggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function AuthStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rm = useReducedMotion();

  if (rm) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={authStaggerItem}>
      {children}
    </motion.div>
  );
}
