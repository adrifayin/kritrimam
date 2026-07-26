"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** Split on LINES, not characters (§10.2). */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  startDelay?: number;
  stagger?: number;
  /** "inView" animates on scroll intersection; "load" animates on mount. */
  trigger?: "inView" | "load";
  once?: boolean;
};

/**
 * Line-masked headline reveal. Each line sits in an overflow-hidden wrapper
 * and rises from translateY(100%). The full text stays in the accessibility
 * tree via aria-label; the visual spans are aria-hidden.
 */
export function SplitText({
  lines,
  as = "h2",
  className,
  lineClassName,
  startDelay = 0,
  stagger = 0.09,
  trigger = "inView",
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const label = lines.join(" ");

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{lines.join(" ")}</Plain>;
  }

  const motionProps =
    trigger === "load"
      ? { animate: { y: 0 } as const }
      : {
          whileInView: { y: 0 } as const,
          viewport: { once, amount: 0.6 },
        };

  return (
    <Tag className={className} aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            {...motionProps}
            transition={{ duration: 0.6, delay: startDelay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
