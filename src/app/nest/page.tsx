"use client";

import { FadeIn } from "@/components/FadeIn";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Logo } from "@/components/Logo";
import { TiltCard } from "@/components/TiltCard";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function NestPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <div className="flex flex-col w-full bg-ink relative">
      
      {/* Fixed Fluid Glass Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Image
          src="/bg-glass.png"
          alt="Fluid Glass Background"
          fill
          className="object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-[20px]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-48 pb-32 relative border-b border-white/5 overflow-hidden">
          <motion.div style={{ opacity: opacityHero }} className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            
            <motion.div style={{ y: yText }} className="lg:col-span-7 flex flex-col items-start pt-12">
              <FadeIn>
                <span className="inline-block text-laterite text-sm tracking-[0.2em] uppercase font-medium mb-8">
                  Coming Soon
                </span>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-parchment mb-6 drop-shadow-2xl">
                  NEST.ai — a full-stack GenAI tutoring platform.
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.2} className="mb-12">
                <p className="text-xl text-parchment-dim font-display">
                  Personalized learning, document intelligence, and video generation.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3} className="flex gap-6 mb-16">
                <a href="https://nestaigoogle.vercel.app" target="_blank" rel="noreferrer" className="text-sm tracking-widest text-parchment-dim hover:text-parchment transition-colors uppercase border-b border-white/10 hover:border-parchment pb-1">Live Demo</a>
                <a href="https://github.com/adrifayin/Nest.ai" target="_blank" rel="noreferrer" className="text-sm tracking-widest text-parchment-dim hover:text-parchment transition-colors uppercase border-b border-white/10 hover:border-parchment pb-1">GitHub</a>
              </FadeIn>

              <FadeIn delay={0.4} className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-3xl shadow-2xl">
                <h3 className="font-display text-lg text-parchment mb-6 text-center">Get early access</h3>
                <WaitlistForm />
              </FadeIn>
            </motion.div>

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
        </section>

        {/* What it does - Staggered Spring Reveal with TiltCards */}
        <section className="py-32 md:py-40">
          <div className="max-w-[1280px] mx-auto px-6 md:px-20">
            <FadeIn>
              <h2 className="font-display text-4xl text-parchment tracking-tight mb-20 text-center drop-shadow-lg">Core Features</h2>
            </FadeIn>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-20"
            >
              <motion.div variants={itemVariants} className="h-full">
                <TiltCard className="h-full p-8 flex flex-col gap-6">
                  <div className="w-12 h-12 border border-laterite/50 bg-laterite/10 flex items-center justify-center rounded-full">
                    <span className="font-mono text-laterite">01</span>
                  </div>
                  <h3 className="font-display text-2xl text-parchment">Document Intelligence</h3>
                  <p className="text-parchment-dim leading-relaxed">
                    RAG-powered Q&A over student uploads. Extracts text from PDFs and DOCX files to deliver answers grounded with page-level citations.
                  </p>
                </TiltCard>
              </motion.div>

              <motion.div variants={itemVariants} className="h-full">
                <TiltCard className="h-full p-8 flex flex-col gap-6">
                  <div className="w-12 h-12 border border-laterite/50 bg-laterite/10 flex items-center justify-center rounded-full">
                    <span className="font-mono text-laterite">02</span>
                  </div>
                  <h3 className="font-display text-2xl text-parchment">AI Creator Studio</h3>
                  <p className="text-parchment-dim leading-relaxed">
                    Generates educational videos with Ken Burns-style motion, Gemini-powered image generation, and browser-native text-to-speech narration.
                  </p>
                </TiltCard>
              </motion.div>

              <motion.div variants={itemVariants} className="h-full">
                <TiltCard className="h-full p-8 flex flex-col gap-6">
                  <div className="w-12 h-12 border border-laterite/50 bg-laterite/10 flex items-center justify-center rounded-full">
                    <span className="font-mono text-laterite">03</span>
                  </div>
                  <h3 className="font-display text-2xl text-parchment">YouTube Integration</h3>
                  <p className="text-parchment-dim leading-relaxed">
                    Deep search functionality with AI-curated video recommendations, powered by Groq LLM and tailored to a student's history.
                  </p>
                </TiltCard>
              </motion.div>

              <motion.div variants={itemVariants} className="h-full">
                <TiltCard className="h-full p-8 flex flex-col gap-6">
                  <div className="w-12 h-12 border border-laterite/50 bg-laterite/10 flex items-center justify-center rounded-full">
                    <span className="font-mono text-laterite">04</span>
                  </div>
                  <h3 className="font-display text-2xl text-parchment">Personalized Feed</h3>
                  <p className="text-parchment-dim leading-relaxed">
                    Content recommendations driven dynamically by the student's education level, age, and continuous search history loops.
                  </p>
                </TiltCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-32 md:py-40 flex flex-col items-center border-t border-white/5 bg-ink/50 backdrop-blur-3xl">
          <FadeIn className="text-center w-full max-w-xl px-6">
            <h2 className="font-display text-3xl md:text-5xl text-parchment tracking-tight mb-12 drop-shadow-md">Want to try NEST.ai?</h2>
            <div className="mb-16">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <WaitlistForm showOptions={false} />
              </div>
            </div>
            <Link 
              href="/"
              className="group inline-flex items-center gap-4 text-parchment-dim hover:text-laterite-bright transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:border-laterite/50 backdrop-blur-md"
            >
              <span className="transform transition-transform group-hover:-translate-x-2">←</span>
              <span className="text-sm tracking-widest uppercase font-medium">Back to Kritrimam</span>
            </Link>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
