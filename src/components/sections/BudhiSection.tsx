"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const offerings = [
  {
    label: "Custom integration",
    description:
      "Bringing AI into tools and workflows you already use, instead of asking your team to adopt something new.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Model adaptation",
    description:
      "Adjusting and grounding models in your own data, so answers reflect your business, not the general internet.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Applied agents",
    description:
      "Agent and retrieval systems built for a specific operational problem, not a generic demo.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Evaluation",
    description:
      "Ongoing testing so the system stays reliable once it's actually in production, not just on day one.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function BudhiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      id="budhi"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Ambient orb — left side */}
      <div
        className="ambient-orb"
        style={{ top: "30%", left: "-20%", opacity: 0.4 }}
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
        className="section-number absolute -left-4 top-16"
        style={{ y: numberY }}
      >
        02
      </motion.span>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-24 md:pt-32 relative">
        {/* Eyebrow */}
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-light">
            Enterprise
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.05}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-[-0.03em] max-w-3xl">
            Budhi — AI, built into how you already work
          </h2>
        </Reveal>

        {/* Lead */}
        <Reveal delay={0.1}>
          <p className="text-xl text-white/50 leading-relaxed mb-20 font-light max-w-2xl">
            Budhi is Kritrimam&apos;s enterprise arm. We work directly with
            businesses to design, build, and adapt AI agents and AI-driven
            features around your actual data and workflow — not a bolted-on
            chatbot.
          </p>
        </Reveal>

        {/* Offerings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-20">
          {offerings.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="glass-card rounded-xl p-8 md:p-10 h-full">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4 font-medium">
                  {item.label}
                </h3>
                <p className="text-white/65 leading-[1.8] text-[15px]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing line + CTA */}
        <Reveal>
          <div className="pt-8">
            <p className="text-white/40 text-lg mb-8 font-light">
              If that&apos;s useful to you, get in touch.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/35 hover:text-white transition-all duration-500 border border-white/8 hover:border-white/25 px-7 py-4 btn-cut group"
            >
              Contact
              <span className="w-4 h-px bg-white/20 group-hover:w-8 group-hover:bg-white/60 transition-all duration-500" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
