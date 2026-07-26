import { cn } from "@/lib/utils";

/**
 * Full-bleed 1px rule with a centered diamond glyph — the section rhythm
 * device used between every top-level section.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full items-center gap-4", className)}
    >
      <span className="h-px flex-1 bg-ink-line" />
      <span className="size-1.5 rotate-45 bg-ink-line" />
      <span className="h-px flex-1 bg-ink-line" />
    </div>
  );
}
