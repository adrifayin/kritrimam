"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnimatedDivider } from "@/components/AnimatedDivider";
import { useLenis } from "lenis/react";
import { useCallback } from "react";

const offerings = [
  {
    label: "Custom integration",
    description:
      "Bringing AI into tools and workflows you already use, instead of asking your team to adopt something new.",
  },
  {
    label: "Model adaptation",
    description:
      "Adjusting and grounding models in your own data, so answers reflect your business, not the general internet.",
  },
  {
    label: "Applied agents",
    description:
      "Agent and retrieval systems built for a specific operational problem, not a generic demo.",
  },
  {
    label: "Evaluation",
    description:
      "Ongoing testing so the system stays reliable once it's actually in production, not just on day one.",
  },
];

export function BudhiSection() {
  const lenis = useLenis();

  const scrollToContact = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo("#contact", { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  return (
    <section id="budhi" className="relative pt-32 md:pt-40 pb-24 md:pb-32">
      {/* Animated divider */}
      <AnimatedDivider />

      {/* Subtle ambient orb for this section */}
      <div
        className="ambient-orb -z-[1]"
        style={{ top: "20%", left: "-20%", opacity: 0.06 }}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 md:pt-32 relative">
        {/* Eyebrow */}
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.08em] uppercase text-ash mb-6">
            Budhi
          </p>
        </RevealOnScroll>

        {/* H2 */}
        <RevealOnScroll delay={0.05}>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-paper mb-8">
            Budhi — AI, built into how you already work
          </h2>
        </RevealOnScroll>

        {/* Positioning line */}
        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-ash leading-relaxed mb-20">
            Budhi is Kritrimam&apos;s enterprise arm. We work directly with
            businesses to design, build, and adapt AI agents and AI-driven
            features around your actual data and workflow — not a bolted-on
            chatbot.
          </p>
        </RevealOnScroll>

        {/* Offerings grid — interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-20">
          {offerings.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 0.06}>
              <div className="offering-card">
                <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-4">
                  {item.label}
                </h3>
                <p className="text-paper/80 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing line + CTA */}
        <RevealOnScroll>
          <div className="pt-12">
            <p className="text-ash text-lg mb-6">
              If that&apos;s useful to you, get in touch.
            </p>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-block font-mono text-xs tracking-[0.08em] uppercase text-ash hover:text-paper transition-all duration-300 border border-ash/20 hover:border-laterite/40 px-6 py-3 hover:shadow-[0_0_20px_rgba(166,64,42,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
            >
              Contact
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
