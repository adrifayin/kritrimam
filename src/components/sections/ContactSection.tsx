"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const contactLinks = [
  {
    label: "Instagram",
    text: "@adrifayin",
    href: "https://instagram.com/adrifayin",
  },
  {
    label: "Email",
    text: "adhilrifayinks@gmail.com",
    href: "mailto:adhilrifayinks@gmail.com",
  },
  {
    label: "WhatsApp / Mobile",
    text: "+91 77366 67318",
    href: "https://wa.me/917736667318",
  },
  {
    label: "LinkedIn",
    text: "linkedin.com/in/adhilrifayinks",
    href: "https://linkedin.com/in/adhilrifayinks",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative pt-24 md:pt-32 pb-12">
      {/* Animated divider */}
      <motion.div
        className="gradient-line-animated mx-6 md:mx-12"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative">
        {/* Heading */}
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-light">
            Contact
          </p>
        </Reveal>

        {/* Intro */}
        <Reveal delay={0.05}>
          <p className="text-white/50 text-lg leading-relaxed mb-16 max-w-xl font-light">
            If you&apos;re building something and think we could help, get in
            touch.
          </p>
        </Reveal>

        {/* Contact links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-28">
          {contactLinks.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.08}>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/20 font-medium">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-300 relative group w-fit"
                >
                  {link.text}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-white/30 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer */}
        <Reveal>
          <div className="border-t border-white/[0.06] pt-8 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-sm font-bold text-white/25 tracking-[0.04em]">
              kritrimam
            </span>
            <p className="text-[11px] text-white/15 tracking-[0.1em] uppercase">
              &copy; {new Date().getFullYear()} Kritrimam
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
