'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AuthSubmitButton({
  className,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const rm = useReducedMotion();

  const button = (
    <Button
      type="submit"
      size="lg"
      disabled={disabled}
      className={cn(
        'h-11 w-full text-sm font-medium tracking-wide',
        'bg-primary text-primary-foreground',
        'shadow-none transition-colors duration-150 hover:bg-primary/90',
        'focus-visible:ring-2 focus-visible:ring-ring/40',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );

  if (rm) return button;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
    >
      {button}
    </motion.div>
  );
}
