import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Leading 24px rule before the text. */
  rule?: boolean;
  /** Brass is the hero/eyebrow accent; muted is the default. */
  tone?: "brass" | "muted" | "bone";
  className?: string;
  as?: "p" | "span" | "div";
};

const tones = {
  brass: "text-brass",
  muted: "text-text-muted",
  bone: "text-bone",
} as const;

export function Eyebrow({
  children,
  rule = false,
  tone = "muted",
  className,
  as: Tag = "p",
}: Props) {
  return (
    <Tag className={cn("u-mono inline-flex items-center", tones[tone], className)}>
      {rule && (
        <span
          aria-hidden="true"
          className="mr-3 inline-block h-px w-6 bg-current opacity-60"
        />
      )}
      {children}
    </Tag>
  );
}
