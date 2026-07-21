"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Pull-quote line height animation
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start 85%", "start 40%"],
  });
  const lineHeight = useTransform(quoteProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Ambient orb */}
      <div
        className="ambient-orb"
        style={{ bottom: "10%", right: "-10%", opacity: 0.35 }}
      />

      {/* Animated divider */}
      <motion.div
        className="gradient-line-animated mx-6 md:mx-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Background number */}
      <motion.span
        className="section-number absolute -right-4 top-16"
        style={{ y: numberY }}
      >
        03
      </motion.span>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 md:pt-32 relative">
        {/* Heading */}
        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 tracking-[-0.03em]">
            Vision
          </h2>
        </Reveal>

        {/* Paragraph 1 */}
        <Reveal delay={0.05}>
          <p className="text-white/60 text-lg leading-[1.9] mb-12 font-light">
            Kritrimam isn&apos;t set up to ship one product and call it a
            company. NEST.ai and Budhi are what we&apos;ve built with what we
            know so far — proof of work, not the whole point. The point is the
            lab underneath both of them.
          </p>
        </Reveal>

        {/* Paragraph 2 */}
        <Reveal>
          <p className="text-white/60 text-lg leading-[1.9] mb-12 font-light">
            Most AI products fail quietly, in the gap between what a system
            actually knows and what it confidently says. We care about that gap
            more than almost anything else — about where an answer comes from,
            whether it&apos;s grounded in something real, and whether a system
            can tell the difference between knowing and guessing. That&apos;s
            what we mean by data clarity: not more data, clearer footing under
            it.
          </p>
        </Reveal>

        {/* Pull-quote with animated gradient line */}
        <Reveal>
          <blockquote ref={quoteRef} className="relative my-20 md:my-28 pl-8 md:pl-10">
            {/* Animated gradient accent line */}
            <motion.div
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-white/40 via-white/15 to-transparent"
              style={{ height: lineHeight }}
            />
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-light leading-[1.2] tracking-[-0.02em]">
              Not more data, clearer footing under it.
            </p>
          </blockquote>
        </Reveal>

        {/* Closing paragraph */}
        <Reveal>
          <p className="text-white/60 text-lg leading-[1.9] font-light">
            We&apos;re building toward the kind of research work usually
            reserved for a handful of labs in the world. That&apos;s a long way
            from where we are today — a small team in Kerala, self-funded,
            early. But the foundation we&apos;re laying now, in how we think
            about retrieval, evaluation, and what it actually means for a model
            to understand something, is built for that horizon, not for a quick
            exit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
