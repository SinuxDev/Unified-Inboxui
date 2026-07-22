import { cn } from '@/lib/utils';

const LOGOS = [
  { name: 'Linear', char: 'L', style: 'bg-neutral-900 text-white' },
  { name: 'Vercel', char: 'V', style: 'bg-black text-white' },
  { name: 'Raycast', char: 'R', style: 'bg-neutral-800 text-white' },
  { name: 'Cal.com', char: 'C', style: 'bg-gray-900 text-white' },
  { name: 'Supabase', char: 'S', style: 'bg-emerald-800 text-white' },
  { name: 'Arc', char: 'A', style: 'bg-blue-800 text-white' },
  { name: 'Linear', char: 'L', style: 'bg-neutral-900 text-white' },
  { name: 'Vercel', char: 'V', style: 'bg-black text-white' },
  { name: 'Raycast', char: 'R', style: 'bg-neutral-800 text-white' },
  { name: 'Cal.com', char: 'C', style: 'bg-gray-900 text-white' },
  { name: 'Supabase', char: 'S', style: 'bg-emerald-800 text-white' },
  { name: 'Arc', char: 'A', style: 'bg-blue-800 text-white' },
] as const;

export function SocialProof() {
  return (
    <section className="inview-section border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12">
        <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Trusted by teams at leading companies
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/30 to-transparent" />
          <div className="marquee-track flex w-max gap-8 sm:gap-12">
            {LOGOS.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5"
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-lg text-[11px] font-bold',
                    logo.style,
                  )}
                >
                  {logo.char}
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground/70">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
