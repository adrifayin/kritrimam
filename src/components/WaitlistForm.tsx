"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Logo } from "./Logo";

interface WaitlistFormProps {
  showOptions?: boolean;
}

export function WaitlistForm({ showOptions = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("nest");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center p-8 border border-white/5 bg-ink-soft"
          >
            <Logo variant="monogram" className="mb-6 opacity-80" />
            <h3 className="font-display text-xl text-parchment mb-2">You're on the list</h3>
            <p className="text-parchment-dim leading-relaxed">
              We'll be in touch when we're ready for you.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {showOptions && (
              <div className="flex flex-col gap-2 mb-2">
                <label className="text-xs tracking-widest text-parchment-dim uppercase">I'm interested in:</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-ink border border-white/10 text-parchment p-4 focus:outline-none focus:border-laterite/50 transition-colors appearance-none rounded-none"
                >
                  <option value="research">Research collaboration</option>
                  <option value="freelance">Freelance AI engineering</option>
                  <option value="nest">NEST.ai early access</option>
                  <option value="other">Just saying hi</option>
                </select>
              </div>
            )}
            
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-ink border border-white/10 text-parchment p-4 focus:outline-none focus:border-laterite/50 transition-colors placeholder:text-parchment-dim/50 rounded-none"
              />
            </div>
            
            <MagneticButton type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Submitting..." : "Get early access"}
            </MagneticButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
