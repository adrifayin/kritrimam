"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const rise = reducedMotion ? 0 : 24;
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Scroll cue: fade out after scrolling past ~15% of viewport
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.15;
      setShowScrollCue(window.scrollY < threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background video — only rendered when motion is allowed */}
      {!reducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80 -z-10" />

      {/* Reduced motion: poster image fallback (no video at all) */}
      {reducedMotion && (
        <div
          className="absolute inset-0 -z-10 bg-ink bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-poster.jpg)" }}
        />
      )}

      {/* Ambient laterite gradient orb — slow-drifting glow */}
      <div
        className="ambient-orb -z-[5]"
        style={{ bottom: "10%", right: "-10%", opacity: 0.12 }}
      />

      {/* Hero content — lower-left third */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full">
        {/* Big wordmark */}
        <motion.h1
          className="font-bold text-paper leading-[0.95] mb-6 tracking-[-0.03em]"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", fontFamily: "var(--font-wordmark)" }}
          initial={{ opacity: 0, y: rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          kritrimam
        </motion.h1>

        {/* One-liner */}
        <motion.p
          className="font-sans text-ash text-lg md:text-xl max-w-xl leading-relaxed mb-4"
          initial={{ opacity: 0, y: rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease }}
        >
          Kritrimam means artificial. We&apos;re here to make it deliberate.
        </motion.p>

        {/* Small descriptor — opacity only, no vertical travel */}
        <motion.p
          className="font-mono text-xs tracking-[0.08em] uppercase text-ash/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease }}
        >
          An independent AI research lab.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: showScrollCue ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ash">
          Scroll
        </span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-ash"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M8 3v10M4 9l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
