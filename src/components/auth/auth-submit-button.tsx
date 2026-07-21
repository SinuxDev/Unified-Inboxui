import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AuthSubmitButton({
  className,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
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
}
