"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const INTERACTIVE = "a,button,input,textarea,select,label,[data-cursor]";
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function useCanHover(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(HOVER_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );
}

/**
 * Accent cursor — a small white dot (mix-blend-difference so it reads on both
 * black and white) that trails the pointer and grows over interactive targets.
 * Sits on top of the native cursor. Desktop fine-pointer only; off under
 * reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const canHover = useCanHover();
  const enabled = canHover && !reduce;
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest(INTERACTIVE));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        animate={{
          width: active ? 44 : 12,
          height: active ? 44 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
