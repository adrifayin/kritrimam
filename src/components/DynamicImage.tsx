"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface DynamicImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxOffset?: number;
}

export function DynamicImage({ src, alt, className, parallaxOffset = 50 }: DynamicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  return (
    <div 
      ref={containerRef} 
      className={twMerge("relative overflow-hidden bg-ink-soft", className)}
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]" // Extra height to account for parallax movement
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover opacity-80 mix-blend-screen"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      </motion.div>
    </div>
  );
}
