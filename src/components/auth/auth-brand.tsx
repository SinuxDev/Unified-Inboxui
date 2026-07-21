export function AuthBrand() {
  return (
    <div className="flex items-start gap-3.5">
      <div aria-hidden className="mt-1.5 flex flex-col gap-[5px]">
        <span className="h-px w-6 bg-foreground/60" />
        <span className="h-px w-6 bg-foreground/35" />
        <span className="h-px w-6 bg-foreground/20" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold tracking-tight text-foreground">
          Unified Inbox
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          One workspace for every conversation.
        </p>
      </div>
    </div>
  );
}
