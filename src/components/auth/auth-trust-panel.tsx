'use client';

import { Inbox, Layers, MessagesSquare, Zap } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const FEATURES = [
  {
    icon: MessagesSquare,
    title: 'Unified channels',
    description: 'Email, chat, and social in one stream.',
  },
  {
    icon: Inbox,
    title: 'Shared workspace',
    description: 'Your whole team sees the same thread.',
  },
  {
    icon: Zap,
    title: 'Fast team reply',
    description: 'Assign, reply, and resolve without context loss.',
  },
] as const;

const HEADLINE_WORDS = 'Every channel converges into one calm inbox.'.split(
  ' ',
);

const sp = (stiffness = 320, damping = 26) =>
  ({ type: 'spring', stiffness, damping }) as const;

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const brandVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: sp(360, 28) },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 40 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: sp(380, 30) },
};

const descVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: sp(320, 28) },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: sp(340, 28) },
};

const taglineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
};

export function AuthTrustPanel() {
  const rm = useReducedMotion();

  return (
    <motion.aside
      className="relative flex h-full flex-col justify-center overflow-hidden bg-muted/50 px-8 py-12 dark:bg-muted/20 xl:px-12"
      variants={rm ? undefined : panelVariants}
      initial={rm ? false : 'hidden'}
      animate="visible"
    >
      {/* Brand */}
      <motion.div
        className="mb-8 flex items-center gap-3"
        variants={rm ? undefined : brandVariants}
      >
        <div className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-card">
          <Layers className="size-4.5 text-foreground" aria-hidden />
          {/* Ping ring — continuous ambient pulse */}
          {!rm && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-xl border border-foreground/20"
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
                repeatDelay: 1,
              }}
            />
          )}
        </div>
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-foreground">
            Unified Inbox
          </p>
          <p className="text-xs text-secondary-foreground">Future Wave</p>
        </div>
      </motion.div>

      {/* Headline — word by word */}
      <h2
        className="mb-1 text-[1.45rem] font-semibold leading-snug tracking-tight text-foreground xl:text-2xl"
        aria-label="Every channel converges into one calm inbox."
        style={{ perspective: '600px' }}
      >
        {HEADLINE_WORDS.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="mr-[0.28em] inline-block last:mr-0"
              variants={rm ? undefined : wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Accent line draws in */}
      <div className="mb-5 h-px overflow-hidden bg-border">
        <motion.div
          className="h-full origin-left bg-foreground"
          initial={rm ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            rm
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>

      {/* Description */}
      <motion.p
        className="mb-7 max-w-xs text-sm leading-relaxed text-secondary-foreground"
        variants={rm ? undefined : descVariants}
      >
        A shared workspace for customer conversations — clear, focused, and
        built for teams.
      </motion.p>

      {/* Feature rows */}
      <ul className="space-y-1">
        {FEATURES.map((feature) => (
          <motion.li
            key={feature.title}
            className="group relative flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors duration-200 hover:bg-card/60"
            variants={rm ? undefined : featureVariants}
            whileHover={rm ? undefined : { x: 3 }}
            transition={sp(400, 28)}
          >
            <motion.div
              className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground"
              whileHover={
                rm ? undefined : { rotate: [0, -8, 8, 0], scale: 1.1 }
              }
              transition={{ duration: 0.4 }}
            >
              <feature.icon className="size-3.5" aria-hidden />
            </motion.div>
            <div>
              <p className="text-sm font-medium leading-tight text-foreground">
                {feature.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-secondary-foreground">
                {feature.description}
              </p>
            </div>
            {/* Left-side grow bar on hover */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top rounded-full bg-foreground/40"
              initial={{ scaleY: 0 }}
              whileHover={rm ? undefined : { scaleY: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.li>
        ))}
      </ul>

      {/* Tagline */}
      <motion.p
        className="mt-8 flex items-center gap-2 text-xs text-secondary-foreground"
        variants={rm ? undefined : taglineVariants}
      >
        {!rm && (
          <motion.span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-foreground/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        Built for multi-tenant B2B teams
      </motion.p>
    </motion.aside>
  );
}
