import { cn } from '@/lib/utils';

const CHANNEL_FEATURES = [
  {
    id: 'email',
    name: 'Email',
    description:
      'Connect any IMAP inbox. Every customer email lands in the shared stream — replies, forwards, and attachments.',
    icon: 'E',
    dot: 'bg-sky-500',
    accent: 'border-l-sky-500',
    tag: 'bg-sky-100 text-sky-800',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description:
      'Link your Telegram bot. Messages, media, and commands flow into the same thread your team works from.',
    icon: 'T',
    dot: 'bg-cyan-500',
    accent: 'border-l-cyan-500',
    tag: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: 'messenger',
    name: 'Messenger',
    description:
      'Connect a Facebook Page. Every DM and comment becomes a trackable conversation with customer context.',
    icon: 'M',
    dot: 'bg-indigo-500',
    accent: 'border-l-indigo-500',
    tag: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'teams',
    name: 'Teams',
    description:
      'Integrate Microsoft Teams. Channel messages and chat history appear beside email and social threads.',
    icon: 'Tm',
    dot: 'bg-violet-500',
    accent: 'border-l-violet-500',
    tag: 'bg-violet-100 text-violet-800',
  },
] as const;

export function FeaturesBento() {
  return (
    <section className="inview-section mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          One workspace
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Every channel you already use.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Connect the tools your team already works in. No migration. No new
          habits. Just one inbox.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {CHANNEL_FEATURES.map((ch) => (
          <div
            key={ch.id}
            className={cn(
              'bento-card group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm',
              ch.accent,
              'border-l-[3px]',
            )}
          >
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-xs',
                  ch.dot,
                )}
              >
                {ch.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {ch.name}
                  </h3>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                      ch.tag,
                    )}
                  >
                    Connected
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {ch.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
