"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/nav/Wordmark";
import { MegaMenu } from "@/components/nav/MegaMenu";
import { MobileDrawer } from "@/components/nav/MobileDrawer";

export function Header() {
  const { nav } = site;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastY = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Hide on scroll-down, reveal on scroll-up — mobile (<1024px) only.
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        setHidden(false);
      } else if (!drawerOpen) {
        if (y > lastY.current && y > 200) setHidden(true);
        else if (y < lastY.current) setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawerOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0.01 : 0.42, ease: [0.65, 0, 0.35, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-[background-color,border-color,height] duration-[--dur-base] ease-[--ease-in-out]",
          "border-b",
          scrolled
            ? "border-ink-line bg-ink/[0.88] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-content flex items-center justify-between gap-6 transition-[height] duration-[--dur-base] ease-[--ease-in-out]",
            scrolled ? "h-16" : "h-16 md:h-[88px]",
            !scrolled && "text-legible",
          )}
        >
          <Wordmark />

          <MegaMenu />

          <div className="flex items-center gap-3">
            <Button href="#contact" size="sm" className="hidden lg:inline-flex">
              {nav.cta}
            </Button>

            {/* Hamburger (mobile) */}
            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
              className="relative flex size-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <motion.span
                animate={drawerOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.2 }}
                className="block h-px w-6 bg-bone"
              />
              <motion.span
                animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: reduce ? 0.01 : 0.2 }}
                className="block h-px w-6 bg-bone"
              />
              <motion.span
                animate={drawerOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.2 }}
                className="block h-px w-6 bg-bone"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
