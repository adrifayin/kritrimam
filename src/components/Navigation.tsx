"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const navLinks = [
  { name: "NEST.AI", target: "#nest-ai" },
  { name: "BUDHI", target: "#budhi" },
  { name: "VISION", target: "#vision" },
  { name: "CONTACT", target: "#contact" },
];

const SECTION_IDS = ["nest-ai", "budhi", "vision", "contact"];

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const lenis = useLenis();

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
        // Scrolling down — hide (but not if mobile menu is open)
        if (!mobileOpen) setVisible(false);
      } else {
        // Scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Active section tracking via single IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
          });

          // Pick the section with the highest intersection ratio
          let maxRatio = 0;
          let maxId: string | null = null;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxId = sectionId;
            }
          });
          setActiveSection(maxId);
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.5],
          rootMargin: "-80px 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lenis smooth-scroll to anchor
  const scrollTo = useCallback(
    (target: string) => {
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [lenis]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      e.preventDefault();
      scrollTo(target);
    },
    [scrollTo]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo("#hero");
    },
    [scrollTo]
  );

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
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="text-base font-bold tracking-[0.04em] text-paper hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
            style={{ fontFamily: "var(--font-wordmark)" }}
          >
            kritrimam
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.target.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.target)}
                  className={`relative font-mono text-xs tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite ${
                    isActive ? "text-paper" : "text-ash hover:text-paper"
                  }`}
                >
                  {link.name}
                  {/* Active indicator — small laterite underline */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px bg-laterite transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
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
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-sm tracking-[0.08em] uppercase text-ash hover:text-paper transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
