"use client";

import { StackedReveal } from "@/components/StackedReveal";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FadeIn } from "@/components/FadeIn";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col w-full bg-ink relative">
      
      {/* Fixed Fluid Silk Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <Image
          src="/bg-silk.png"
          alt="Fluid Silk Background"
          fill
          className="object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-[10px]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Hero Section (Asymmetric 12-col layout with Parallax) */}
        <section ref={heroRef} className="relative pt-48 pb-32 overflow-hidden">
          <motion.div 
            style={{ opacity: opacityHero }}
            className="max-w-[1280px] mx-auto px-6 md:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
          >
          
          {/* Left Column (7/12) */}
          <motion.div style={{ y: yText }} className="lg:col-span-7 flex flex-col items-start pt-12">
            <FadeIn>
              <span className="inline-block text-laterite text-sm tracking-[0.2em] uppercase font-medium mb-8">
                Coming Soon
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-parchment mb-6">
                Building AI systems that reason for themselves.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2} className="mb-12">
              <p className="text-xl text-parchment-dim font-display">
                A foundational research lab rooted in Kerala, starting with NEST.ai.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-3xl shadow-2xl">
              <WaitlistForm />
            </FadeIn>
          </motion.div>

          {/* Right Column (5/12) - Ghost Visual Anchor with continuous motion */}
          <motion.div style={{ y: yGhost }} className="hidden lg:flex lg:col-span-5 relative justify-end items-center pointer-events-none">
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[700px] h-[700px]"
              animate={{
                y: ["-50%", "-52%", "-48%", "-50%"],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 -translate-x-1/2 mix-blend-plus-lighter">
                <Logo variant="ghost" className="w-full h-full text-white opacity-20" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Mobile Ghost Anchor */}
        <div className="absolute top-0 right-[-20%] w-[300px] h-[300px] lg:hidden pointer-events-none opacity-30 z-0 mix-blend-plus-lighter">
          <Logo variant="ghost" className="w-full h-full text-white" />
        </div>
      </section>

      {/* Stacked Declarative Statements (Vertus Style) */}
      <section className="bg-ink/50 backdrop-blur-xl flex flex-col border-t border-white/5 relative z-20">
        <StackedReveal>
          <div className="flex gap-8 items-start">
            <span className="text-laterite font-mono text-xl mt-2">01</span>
            <h2 className="font-display text-3xl md:text-5xl text-parchment leading-tight tracking-tight max-w-4xl">
              We are an applied-first research lab. We prove ideas by shipping real systems, then push the research further.
            </h2>
          </div>
        </StackedReveal>
        
        <StackedReveal>
          <div className="flex gap-8 items-start">
            <span className="text-laterite font-mono text-xl mt-2">02</span>
            <h2 className="font-display text-3xl md:text-5xl text-parchment leading-tight tracking-tight max-w-4xl">
              Our first system is <span className="text-laterite">NEST.ai</span> — a full-stack educational platform built on live reasoning, not just generic pre-training.
            </h2>
          </div>
        </StackedReveal>

        <StackedReveal>
          <div className="flex gap-8 items-start">
            <span className="text-laterite font-mono text-xl mt-2">03</span>
            <h2 className="font-display text-3xl md:text-5xl text-parchment leading-tight tracking-tight max-w-4xl">
              The underlying research focuses on evaluation and reinforcement learning for LLM tutoring behavior. We are early, and we are building carefully.
            </h2>
          </div>
        </StackedReveal>

        <StackedReveal>
          <div className="flex gap-8 items-start">
            <span className="text-laterite font-mono text-xl mt-2">04</span>
            <h2 className="font-display text-3xl md:text-5xl text-parchment leading-tight tracking-tight max-w-4xl">
              Built from Kerala, India. Rooted in place, but building infrastructure for a global cognitive substrate.
            </h2>
          </div>
        </StackedReveal>
      </section>

      {/* NEST.ai Teaser Band */}
      <section className="py-24 md:py-32 bg-white/5 backdrop-blur-2xl border-y border-white/5 relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-5xl text-parchment tracking-tight">
                NEST.ai — Personalized learning, document intelligence, and video generation.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex gap-8">
                <a href="https://nestaigoogle.vercel.app" target="_blank" rel="noreferrer" className="text-sm tracking-widest text-parchment-dim hover:text-parchment transition-colors uppercase border-b border-white/10 hover:border-parchment pb-1">Live Demo</a>
                <a href="https://github.com/adrifayin/Nest.ai" target="_blank" rel="noreferrer" className="text-sm tracking-widest text-parchment-dim hover:text-parchment transition-colors uppercase border-b border-white/10 hover:border-parchment pb-1">GitHub</a>
              </div>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <FadeIn delay={0.2}>
              <Link 
                href="/nest"
                className="group flex items-center justify-center w-32 h-32 rounded-full border border-laterite hover:bg-laterite transition-colors text-laterite hover:text-parchment"
              >
                <span className="text-sm tracking-widest uppercase font-medium">Explore</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why This Matters (Research Impact) */}
      <section className="py-32 md:py-40 bg-ink/20 backdrop-blur-sm relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="inline-block text-verdigris text-sm tracking-[0.2em] uppercase font-medium mb-8">
                The Research Context
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-parchment tracking-tight leading-tight mb-8">
                Why AI-assisted tutoring is worth pursuing carefully.
              </h2>
              <p className="text-lg text-parchment-dim leading-relaxed mb-6">
                The emerging consensus points to significant potential, tempered by the need for exact execution. A 2025 Harvard randomized controlled trial (Kestin et al.) found that undergraduate physics students using a custom AI tutor learned more in less time than those receiving active-learning instruction.
              </p>
              <p className="text-lg text-parchment-dim leading-relaxed">
                Similarly, Brookings Institute reviews highlight that generative AI can extend personalized, adaptive tutoring to vastly more learners. However, these tools risk defaulting to surface-level explanations if not rigorously evaluated. This is why we focus on evaluation loops alongside product delivery.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 h-full relative">
            <FadeIn delay={0.2} className="h-full">
              <div className="sticky top-40 bg-ink border-l border-verdigris/30 pl-8 py-4">
                <div className="font-mono text-7xl md:text-8xl text-verdigris mb-6 tracking-tighter">15–35%</div>
                <p className="font-display text-xl md:text-2xl text-parchment tracking-tight leading-tight">
                  Performance gains reported across systematic reviews of adaptive-learning studies.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-32 md:py-40 bg-ink/50 backdrop-blur-3xl border-t border-white/5 relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 text-center flex flex-col items-center">
          <FadeIn className="max-w-3xl">
            <div className="w-12 h-12 rounded-full border border-laterite flex items-center justify-center font-display text-laterite text-lg mx-auto mb-10">
              A
            </div>
            <p className="text-2xl md:text-3xl text-parchment-dim leading-normal font-display tracking-tight mb-10">
              "Kritrimam exists to build the substrate first, then the products. We are building a lab that ships applied AI while asking rigorous questions about how models reason. We are grounded, technical, and building for the long term."
            </p>
            <p className="text-parchment tracking-widest uppercase text-sm font-medium">
              Adhil Rifayin K S — Founder, Kritrimam
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Closing Waitlist */}
      <section className="py-32 md:py-40 bg-white/5 backdrop-blur-2xl border-t border-white/5 flex flex-col items-center text-center relative z-20">
        <FadeIn className="max-w-2xl w-full px-6">
          <h2 className="font-display text-3xl md:text-5xl text-parchment tracking-tight mb-12 drop-shadow-md">
            Be the first to know when we launch.
          </h2>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <WaitlistForm showOptions={false} />
          </div>
          
          <div className="mt-16">
            <Link href="/work-with-us" className="text-parchment-dim hover:text-laterite transition-colors text-sm tracking-widest uppercase border-b border-transparent hover:border-laterite pb-1">
              Want to collaborate or hire us? Work with us →
            </Link>
          </div>
        </FadeIn>
      </section>
      </div>
    </div>
  );
}
