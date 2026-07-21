"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-linked transforms for vanishing effect
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -100]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.25, 0.7]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* Background video with parallax zoom */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: videoScale }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4"
      />

      {/* Dynamic dark overlay that deepens on scroll */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content that vanishes on scroll */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Small eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8 font-light"
        >
          Kritrimam Research Lab
        </motion.p>

        {/* Main tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-[-0.04em] max-w-5xl"
        >
          Where{" "}
          <em className="not-italic text-white/45">dreams</em> rise{" "}
          <br className="hidden sm:block" />
          <em className="not-italic text-white/45">through the silence.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-white/50 font-light"
        >
          We&apos;re designing tools for deep thinkers, bold creators, and quiet
          rebels. Amid the chaos, we build digital spaces for sharp focus and
          inspired work.
        </motion.p>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 px-14 py-5 bg-white flex items-center gap-2 text-black hover:bg-white/90 transition-colors group btn-cut cursor-pointer"
        >
          <span className="text-sm font-medium">Begin Journey</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator — vanishes with content */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        style={{ opacity: contentOpacity }}
      >
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-light">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/25 anim-scroll-pulse" />
      </motion.div>

      {/* Bottom gradient fade into black sections below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
