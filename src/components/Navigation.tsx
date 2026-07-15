"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "NEST.AI", path: "/nest-ai" },
  { name: "VISION", path: "/vision" },
  { name: "ENTERPRISE", path: "/enterprise" },
  { name: "CONTACT", path: "#contact" },
];

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Fade in after 500ms delay on mount (hero gets the first beat)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-direction hide/show + backdrop trigger
  useEffect(() => {
    const threshold = 10;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const viewportH = window.innerHeight;

      // Past first viewport → add backdrop
      setPastHero(currentY > viewportH);

      // Scroll direction detection
      if (Math.abs(currentY - lastScrollY.current) < threshold) return;

      if (currentY > lastScrollY.current && currentY > 100) {
        // Scrolling down — hide
        setVisible(false);
      } else {
        // Scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -20,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,background-color] duration-500 ${
          pastHero
            ? "backdrop-blur-[12px] bg-ink/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-lg text-paper tracking-wide hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          >
            Kritrimam
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              const isContact = link.path === "#contact";

              return isContact ? (
                <a
                  key={link.name}
                  href="#contact"
                  onClick={handleContactClick}
                  className={`font-mono text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite ${
                    isActive ? "text-paper" : "text-ash hover:text-paper"
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-mono text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite ${
                    isActive ? "text-paper" : "text-ash hover:text-paper"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block w-full h-px bg-paper origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-px bg-paper"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="block w-full h-px bg-paper origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => {
              const isContact = link.path === "#contact";
              return isContact ? (
                <motion.a
                  key={link.name}
                  href="#contact"
                  onClick={handleContactClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-sm tracking-[0.08em] uppercase text-ash hover:text-paper transition-colors"
                >
                  {link.name}
                </motion.a>
              ) : (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.path}
                    className="font-mono text-sm tracking-[0.08em] uppercase text-ash hover:text-paper transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
