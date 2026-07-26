"use client";

import { motion, useReducedMotion } from "motion/react";
import { SourceChip } from "@/components/ui/SourceChip";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const BRASS = "var(--color-brass)";

/**
 * The signature Grounding Thread (§6): a hairline brass line that draws
 * itself from a claim to a mono source chip. Diagonal on ≥768px, vertical
 * below. Under reduced motion it renders already-drawn, chip visible.
 *
 * `pathLength` is animated 0→1 (motion normalises it); the stroke uses
 * vector-effect="non-scaling-stroke" so it stays 1px at every zoom level.
 */
export function GroundingThread({
  chip,
  delay = 0,
  className,
}: {
  chip: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const pathAnim = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: reduce ? 0.001 : 0.9, delay, ease: EASE },
  };
  const chipAnim = {
    initial: { opacity: reduce ? 1 : 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: reduce ? 0.001 : 0.35, delay: delay + (reduce ? 0 : 0.7) },
  };

  return (
    <div className={cn("select-none", className)}>
      {/* Diagonal (≥768px) */}
      <div className="relative hidden h-[76px] w-[220px] md:block">
        <svg
          viewBox="0 0 220 76"
          fill="none"
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          <circle cx="3" cy="6" r="2.5" fill={BRASS} />
          <motion.path
            d="M3 6 C 70 6, 78 58, 150 64"
            stroke={BRASS}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...pathAnim}
          />
        </svg>
        <motion.div className="absolute left-[150px] top-[52px]" {...chipAnim}>
          <SourceChip>{chip}</SourceChip>
        </motion.div>
      </div>

      {/* Vertical (<768px) */}
      <div className="flex flex-col items-start md:hidden">
        <svg
          viewBox="0 0 8 44"
          fill="none"
          preserveAspectRatio="none"
          className="h-11 w-2 overflow-visible"
          aria-hidden="true"
        >
          <circle cx="4" cy="3" r="2" fill={BRASS} />
          <motion.path
            d="M4 3 L4 42"
            stroke={BRASS}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...pathAnim}
          />
        </svg>
        <motion.div {...chipAnim}>
          <SourceChip>{chip}</SourceChip>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Wraps a claim phrase with the subtle brass underline + terminal dot that
 * marks it as the origin of a grounding thread.
 */
export function ThreadAnchor({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline",
        "[background:linear-gradient(currentColor,currentColor)_no-repeat_left_bottom/100%_1px]",
        className,
      )}
      style={{ color: "var(--color-brass)" }}
    >
      <span className="text-bone">{children}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block size-1.5 translate-y-[-0.1em] rounded-full bg-brass align-baseline"
      />
    </span>
  );
}
