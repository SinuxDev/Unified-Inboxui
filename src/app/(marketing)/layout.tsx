export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="brand-canvas min-h-svh bg-background text-foreground">
      {children}
    </div>
  );
}
