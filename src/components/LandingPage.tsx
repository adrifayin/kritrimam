"use client";

import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { NestAiSection } from "@/components/sections/NestAiSection";
import { BudhiSection } from "@/components/sections/BudhiSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { ContactSection } from "@/components/sections/ContactSection";

const navLinks = [
  { name: "NEST.AI", id: "nest-ai" },
  { name: "Budhi", id: "budhi" },
  { name: "Vision", id: "vision" },
  { name: "Contact", id: "contact" },
];

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detect scroll for nav backdrop
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.04);
  });

  // Mouse tracking for ambient glow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    },
    []
  );

  return (
    <div className="relative bg-black min-h-screen">
      {/* ── Mouse-following ambient glow ── */}
      <div
        className="fixed pointer-events-none z-30 w-[700px] h-[700px] rounded-full transition-[left,top] duration-200 ease-out hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 65%)",
          left: mousePos.x - 350,
          top: mousePos.y - 350,
        }}
      />

      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/70 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* ── Fixed Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/50 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Wordmark — no logo, just text */}
          <button
            onClick={() => scrollTo("hero")}
            className="text-base font-bold tracking-[0.04em] text-white hover:opacity-70 transition-opacity cursor-pointer"
          >
            kritrimam
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[11px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300 cursor-pointer relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-white/40 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block px-5 py-2.5 text-white text-sm btn-cut-border cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
              }
              className="block w-full h-px bg-white origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-px bg-white"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              className="block w-full h-px bg-white origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sections ── */}
      <HeroSection />

      {/* Content sections have a black background that scrolls over the hero */}
      <div className="relative z-[5] bg-black">
        <NestAiSection />
        <BudhiSection />
        <VisionSection />
        <ContactSection />
      </div>
    </div>
  );
}
