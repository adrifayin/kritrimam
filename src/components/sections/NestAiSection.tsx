"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    label: "What we build",
    text: "NEST.ai reads what you're actually studying — lecture recordings, PDFs, slide decks, handwritten notes — and turns it into something you can talk to. Ask it a question and it answers from your material, not a generic search result. It can summarize a lecture, turn a chapter into flashcards, generate a quiz, or lay out a study plan for what's coming. On the other side, it gives educators a way to turn a lecture into structured material and see where a class is actually struggling before the exam does.",
  },
  {
    label: "What to expect",
    text: "Every answer is grounded in the source you gave it, retrieved before it's generated — that's what keeps it from making things up. It works across languages, not just English. It's built to be something you come back to mid-semester, not a demo you try once.",
  },
  {
    label: "The change we're hoping for",
    text: "A private tutor has always been something only some students could afford. NEST.ai is our attempt at closing that gap — the same quality of one-on-one help, available to any student with a phone, not just the ones who can pay for it.",
  },
];

export function NestAiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the big background number
  const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="nest-ai"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Ambient orb */}
      <div
        className="ambient-orb"
        style={{ top: "10%", right: "-15%", opacity: 0.5 }}
      />

      {/* Animated gradient divider at top */}
      <motion.div
        className="gradient-line-animated mx-6 md:mx-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Large parallax background number */}
      <motion.span
        className="section-number absolute -right-4 top-16"
        style={{ y: numberY }}
      >
        01
      </motion.span>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 md:pt-32 relative">
        {/* Eyebrow */}
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-light">
            Coming Soon
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.05}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-[-0.03em]">
            NEST.ai
          </h2>
        </Reveal>

        {/* Lead paragraph */}
        <Reveal delay={0.1}>
          <p className="text-xl text-white/50 leading-relaxed mb-20 font-light max-w-2xl">
            An AI co-tutor that works from your own course material — lecture
            videos, PDFs, slides, and notes — instead of guessing at the
            internet&apos;s average answer.
          </p>
        </Reveal>

        {/* Feature cards */}
        {features.map((feature, i) => (
          <Reveal key={feature.label} delay={i * 0.08}>
            <div className="glass-card rounded-xl p-8 md:p-10 mb-5">
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/35 mb-5 font-medium">
                {feature.label}
              </h3>
              <p className="text-white/70 leading-[1.8] text-[15px]">
                {feature.text}
              </p>
            </div>
          </Reveal>
        ))}

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <a
              href="https://github.com/adrifayin/nest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/35 hover:text-white transition-all duration-500 border border-white/8 hover:border-white/25 px-7 py-4 btn-cut group"
            >
              See the project
              <span className="w-4 h-px bg-white/20 group-hover:w-8 group-hover:bg-white/60 transition-all duration-500" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
