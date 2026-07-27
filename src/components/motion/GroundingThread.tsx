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
  desktopOnly = false,
}: {
  chip: string;
  delay?: number;
  className?: string;
  /**
   * Drop the thread entirely below 900px instead of falling back to the
   * vertical variant. The hero needs this: its lede sits directly beneath the
   * thread, and the stacked variant is tall enough to reflow onto that text on
   * a narrow viewport. Where a thread has room to breathe (the NEST.ai step
   * grid) the vertical fallback is still the better answer, so this is opt-in.
   */
  desktopOnly?: boolean;
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
    <div
      className={cn(
        // z-10 keeps the chip above neighbouring prose no matter how the
        // surrounding flow settles; it should never need to win, but a chip
        // that loses this fight is unreadable rather than merely misplaced.
        "relative z-10 select-none",
        desktopOnly ? "hidden min-[900px]:block" : "block",
        className,
      )}
    >
      {/* Diagonal (≥768px, or ≥900px when desktopOnly) */}
      <div
        className={cn(
          "relative h-[76px] w-[220px]",
          desktopOnly ? "block" : "hidden md:block",
        )}
      >
        <svg
          viewBox="0 0 220 76"
          fill="none"
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          <circle cx="3" cy="6" r="2.5" fill={BRASS} />
          <motion.path
            d="M3 6 C 68 6, 76 42, 148 46"
            stroke={BRASS}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...pathAnim}
          />
        </svg>
        {/*
          The chip hangs off the end of the curve at (148,46), centred on it
          rather than dropped from it — the old top-[52px] corner anchor pushed
          the chip to y≈86 in a 76px box, so it cleared the box by more than the
          following margin and landed on the lede. `flex w-max` is load-bearing:
          as a plain block the wrapper inherits the body's 1.65 line-height and
          grows a strut far taller than the chip, and as a bare flex box it
          shrinks the chip to the ~66px left inside the 220px track and wraps
          the label. Together they make the wrapper hug the chip exactly, so
          the measured box is the box you see.
        */}
        <motion.div
          className="absolute left-[154px] top-[46px] flex w-max -translate-y-1/2"
          {...chipAnim}
        >
          <SourceChip>{chip}</SourceChip>
        </motion.div>
      </div>

      {/* Vertical (<768px) — not rendered at all when desktopOnly */}
      <div className={cn("flex flex-col items-start md:hidden", desktopOnly && "hidden")}>
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
