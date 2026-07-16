"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
}

export function AnimatedDivider({ className = "" }: AnimatedDividerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-laterite) 30%, var(--color-ash) 70%, transparent)",
          opacity: 0.2,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: reducedMotion ? 0 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}
