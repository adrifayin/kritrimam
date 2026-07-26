"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { AdaptiveVideo } from "@/components/media/AdaptiveVideo";

/**
 * Hero background video with desktop-only parallax (§10.5). Translates the
 * video on scroll via transform only — never top/margin. Disabled under
 * reduced motion and below 1024px.
 */
export function HeroVideo({
  desktopSrc,
  mobileSrc,
  poster,
}: {
  desktopSrc: string;
  mobileSrc?: string;
  poster?: string;
}) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 120]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{ y: enabled ? y : 0 }}
    >
      <AdaptiveVideo
        desktopSrc={desktopSrc}
        mobileSrc={mobileSrc}
        poster={poster}
        className="size-full scale-110 object-cover"
      />
    </motion.div>
  );
}
