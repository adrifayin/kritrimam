"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Kritrimam", path: "/" },
    { name: "NEST.ai", path: "/nest" },
    { name: "Work With Us", path: "/work-with-us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "bg-ink-soft/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo variant="monogram" />
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            // Don't render Kritrimam link if we have the logo acting as home link.
            // Wait, the prompt says: "Persistent top nav: Kritrimam (mark, links home) — NEST.ai — Work With Us. Three items"
            if (link.name === "Kritrimam") return null;
            
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm tracking-widest transition-colors relative group ${isActive ? 'text-parchment' : 'text-parchment-dim hover:text-laterite-bright'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-laterite transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
