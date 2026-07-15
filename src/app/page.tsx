"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const reducedMotion = useReducedMotion();

  const rise = reducedMotion ? 0 : 24;
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background video */}
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
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80 -z-10" />

      {/* If reduced motion, show a solid ink background instead of video */}
      {reducedMotion && (
        <div className="absolute inset-0 bg-ink -z-10" />
      )}

      {/* Hero content — lower-left third */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full">
        {/* Big wordmark */}
        <motion.h1
          className="font-display font-bold text-paper leading-[1] mb-6"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          initial={{ opacity: 0, y: rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          Kritrimam
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

        {/* Small descriptor — opacity only, no travel */}
        <motion.p
          className="font-mono text-xs tracking-[0.08em] uppercase text-ash/60 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease }}
        >
          An independent AI research lab.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
        >
          <Link
            href="/nest-ai"
            className="inline-block font-mono text-xs tracking-[0.08em] uppercase text-paper hover:text-ink hover:bg-paper transition-colors border border-paper/20 px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          >
            Discover NEST.ai
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
