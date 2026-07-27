"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Runs } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import {
  GroundingThread,
  ThreadAnchor,
} from "@/components/motion/GroundingThread";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Orchestrated hero load sequence (§8.1), skipped under reduced motion. */
export function HeroContent() {
  const { hero } = site;
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  const mask = (delay: number) => ({
    initial: reduce ? false : { y: "110%" as const },
    animate: { y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  const h1Label = `${hero.h1[0].map((r) => r.text).join("")} ${hero.threadPhrase}`;

  return (
    <div className="text-legible container-content flex flex-col pt-32 pb-24 md:pt-40 md:pb-28">
      <motion.p className="u-mono text-brass" {...fade(0.2)}>
        {hero.eyebrow}
      </motion.p>

      <h1
        id="hero-heading"
        aria-label={h1Label}
        className="font-display mt-6 max-w-[16ch] text-hero leading-[0.95] tracking-[-0.03em] text-bone"
      >
        <span aria-hidden="true" className="block overflow-hidden">
          <motion.span className="block" {...mask(0.34)}>
            <Runs runs={hero.h1[0]} />
          </motion.span>
        </span>
        <span aria-hidden="true" className="block overflow-hidden pb-[0.12em]">
          <motion.span className="block" {...mask(0.44)}>
            <ThreadAnchor>
              <em
                className="font-display italic"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 0' }}
              >
                {hero.threadPhrase}
              </em>
            </ThreadAnchor>
          </motion.span>
        </span>
      </h1>

      {/* Grounding thread instance #1 — draws at ~1.1s. Desktop-only: below
          900px there isn't room between the headline and the lede for the
          thread to sit without crowding one of them. */}
      <GroundingThread
        chip={hero.threadChip}
        delay={reduce ? 0 : 1.1}
        className="mt-6"
        desktopOnly
      />

      <motion.p className="prose-measure mt-8 text-lede text-bone-dim" {...fade(0.62)}>
        <Runs runs={hero.lede} />
      </motion.p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <motion.div {...fade(0.76)}>
          <Button href="#nest" size="lg">
            {hero.ctaPrimary}
          </Button>
        </motion.div>
        <motion.div {...fade(0.82)}>
          <Button href="#budhi" variant="secondary" size="lg">
            {hero.ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/** Scroll cue — fades in last (§8.1 step 8). Hidden on short viewports. */
export function ScrollCue() {
  const { hero } = site;
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 1.4 }}
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 [@media(max-height:600px)]:hidden"
    >
      <span className="u-mono text-bone-dim">{hero.scrollCue}</span>
      <span aria-hidden="true" className="h-6 w-px origin-top animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-bone-dim/60" />
    </motion.div>
  );
}
