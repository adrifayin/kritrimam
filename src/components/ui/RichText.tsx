import { cn } from "@/lib/utils";

export type Run = {
  text: string;
  /** Fraunces italic emphasis. */
  em?: boolean;
  /** Medium-weight inline emphasis (e.g. product names in body copy). */
  strong?: boolean;
  /** Accent colour for em runs. */
  tone?: "brass" | "indigo";
};

const toneClass = {
  brass: "text-brass",
  indigo: "text-indigo-lit",
} as const;

/** Render a sequence of rich runs inline. */
export function Runs({
  runs,
  className,
}: {
  runs: readonly Run[];
  className?: string;
}) {
  return (
    <span className={className}>
      {runs.map((run, i) => {
        if (run.em) {
          return (
            <em
              key={i}
              className={cn(
                "font-display italic",
                run.tone && toneClass[run.tone],
              )}
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 0' }}
            >
              {run.text}
            </em>
          );
        }
        if (run.strong) {
          return (
            <strong key={i} className="font-medium text-bone">
              {run.text}
            </strong>
          );
        }
        return <span key={i}>{run.text}</span>;
      })}
    </span>
  );
}
