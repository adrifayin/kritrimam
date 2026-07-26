import { cn } from "@/lib/utils";

/**
 * The provenance chip — ink-raised fill, 1px brass border, mono 12px.
 * Brass appears in exactly two places on the page; this is one of them.
 */
export function SourceChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-brass bg-ink-raised px-2.5 py-1.5",
        "font-mono text-mono text-bone",
        className,
      )}
    >
      {children}
    </span>
  );
}
