"use client";

import { FadeIn } from "@/components/FadeIn";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="flex flex-col w-full bg-ink">
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
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-parchment mb-6">
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

            <FadeIn delay={0.4} className="w-full max-w-md bg-ink-soft p-8 border border-white/5">
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
              <div className="absolute inset-0 -translate-x-1/2">
                <Logo variant="ghost" className="w-full h-full" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Mobile Ghost Anchor */}
        <div className="absolute top-0 right-[-20%] w-[300px] h-[300px] lg:hidden pointer-events-none opacity-50 z-0">
          <Logo variant="ghost" className="w-full h-full" />
        </div>
      </section>

      {/* What it does - Staggered Spring Reveal */}
      <section className="py-32 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <FadeIn>
            <h2 className="font-display text-4xl text-parchment tracking-tight mb-20 text-center">Core Features</h2>
          </FadeIn>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="w-12 h-12 border border-laterite flex items-center justify-center rounded-full">
                <span className="font-mono text-laterite">01</span>
              </div>
              <h3 className="font-display text-2xl text-parchment">Document Intelligence</h3>
              <p className="text-parchment-dim leading-relaxed">
                RAG-powered Q&A over student uploads. Extracts text from PDFs and DOCX files to deliver answers grounded with page-level citations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="w-12 h-12 border border-laterite flex items-center justify-center rounded-full">
                <span className="font-mono text-laterite">02</span>
              </div>
              <h3 className="font-display text-2xl text-parchment">AI Creator Studio</h3>
              <p className="text-parchment-dim leading-relaxed">
                Generates educational videos with Ken Burns-style motion, Gemini-powered image generation, and browser-native text-to-speech narration.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="w-12 h-12 border border-laterite flex items-center justify-center rounded-full">
                <span className="font-mono text-laterite">03</span>
              </div>
              <h3 className="font-display text-2xl text-parchment">YouTube Integration</h3>
              <p className="text-parchment-dim leading-relaxed">
                Deep search functionality with AI-curated video recommendations, powered by Groq LLM and tailored to a student's history.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="w-12 h-12 border border-laterite flex items-center justify-center rounded-full">
                <span className="font-mono text-laterite">04</span>
              </div>
              <h3 className="font-display text-2xl text-parchment">Personalized Feed</h3>
              <p className="text-parchment-dim leading-relaxed">
                Content recommendations driven dynamically by the student's education level, age, and continuous search history loops.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Under the hood */}
      <section className="py-32 md:py-40 bg-ink-soft border-y border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <span className="inline-block text-verdigris text-sm tracking-[0.2em] uppercase font-medium mb-6">
                Architecture
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-parchment tracking-tight mb-12">Built with</h2>
              
              <ul className="flex flex-col gap-8 text-parchment-dim">
                <li className="flex gap-6 items-start">
                  <span className="text-verdigris font-mono mt-1">__</span>
                  <span className="text-lg"><strong>Frontend:</strong> React 19, TypeScript, Vite</span>
                </li>
                <li className="flex gap-6 items-start">
                  <span className="text-verdigris font-mono mt-1">__</span>
                  <span className="text-lg"><strong>Backend:</strong> Node.js + Express, MongoDB + Mongoose, JWT auth, bcrypt</span>
                </li>
                <li className="flex gap-6 items-start">
                  <span className="text-verdigris font-mono mt-1">__</span>
                  <span className="text-lg"><strong>AI Models:</strong> Google Gemini AI and Groq LLM</span>
                </li>
                <li className="flex gap-6 items-start">
                  <span className="text-verdigris font-mono mt-1">__</span>
                  <span className="text-lg"><strong>Retrieval:</strong> RAG pipeline over PDF.js and Mammoth.js</span>
                </li>
                <li className="flex gap-6 items-start">
                  <span className="text-verdigris font-mono mt-1">__</span>
                  <span className="text-lg"><strong>Infrastructure:</strong> MongoDB Atlas, Supabase</span>
                </li>
              </ul>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.2} className="flex justify-center p-8 lg:p-12 border border-verdigris/20 bg-ink">
              <svg viewBox="0 0 300 240" className="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="100" y="20" width="100" height="40" fill="#2F5C56" fillOpacity="0.2" stroke="#2F5C56" />
                <text x="150" y="44" fill="#F3ECE1" fontSize="12" textAnchor="middle" fontFamily="monospace">Upload Document</text>
                
                <path d="M150 60 L150 90" stroke="#2F5C56" strokeWidth="1.5" markerEnd="url(#arrow)" />
                
                <rect x="100" y="100" width="100" height="40" fill="#2F5C56" fillOpacity="0.2" stroke="#2F5C56" />
                <text x="150" y="118" fill="#F3ECE1" fontSize="10" textAnchor="middle" fontFamily="monospace">Extract</text>
                <text x="150" y="132" fill="#F3ECE1" fontSize="9" opacity="0.7" textAnchor="middle" fontFamily="monospace">(PDF.js/Mammoth)</text>
                
                <path d="M150 140 L150 170" stroke="#2F5C56" strokeWidth="1.5" markerEnd="url(#arrow)" />
                
                <rect x="20" y="180" width="260" height="50" fill="#2F5C56" fillOpacity="0.1" stroke="#2F5C56" strokeDasharray="4 4" />
                
                <rect x="30" y="190" width="110" height="30" fill="#2F5C56" fillOpacity="0.3" />
                <text x="85" y="209" fill="#F3ECE1" fontSize="10" textAnchor="middle" fontFamily="monospace">Gemini Analysis</text>
                
                <rect x="160" y="190" width="110" height="30" fill="#2F5C56" fillOpacity="0.3" />
                <text x="215" y="209" fill="#F3ECE1" fontSize="10" textAnchor="middle" fontFamily="monospace">Groq Recs</text>
                
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#2F5C56" />
                  </marker>
                </defs>
              </svg>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Built by */}
      <section className="py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-20 text-center flex flex-col items-center">
          <FadeIn>
            <h2 className="font-display text-2xl text-parchment tracking-tight mb-10">The Team</h2>
            <div className="w-16 h-[1px] bg-laterite mx-auto mb-10" />
            <p className="text-xl md:text-2xl text-parchment-dim leading-relaxed font-display">
              Built by a core founding team: <strong className="text-parchment font-normal">Adhil Rifayin K S</strong> (Full Stack & AI Lead), <strong className="text-parchment font-normal">Muhammad Fahad E V</strong> (Backend & Database), <strong className="text-parchment font-normal">Muhammed Althaf</strong> (Frontend Developer), and <strong className="text-parchment font-normal">Jaimal Jacob</strong> (UI/UX & Integration).
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 md:py-40 flex flex-col items-center border-t border-white/5 bg-ink-soft">
        <FadeIn className="text-center w-full max-w-xl px-6">
          <h2 className="font-display text-3xl md:text-5xl text-parchment tracking-tight mb-12">Want to try NEST.ai?</h2>
          <div className="mb-16">
            <WaitlistForm showOptions={false} />
          </div>
          <Link 
            href="/"
            className="group inline-flex items-center gap-4 text-parchment-dim hover:text-laterite-bright transition-colors"
          >
            <span className="transform transition-transform group-hover:-translate-x-2">←</span>
            <span className="text-sm tracking-widest uppercase font-medium">Back to Kritrimam</span>
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
