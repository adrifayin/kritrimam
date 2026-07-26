"use client";

import { useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Desktop mega menu (≥1024px). Hover/focus opens a panel; full keyboard path. */
export function MegaMenu() {
  const { nav } = site;
  const [open, setOpen] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const clearClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = useCallback(() => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number, hasPanel: boolean) => {
    if (e.key === "Escape") {
      setOpen(null);
      return;
    }
    if (!hasPanel) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(i);
      // Focus first link in the panel on next tick.
      window.setTimeout(() => {
        const panel = document.getElementById(`megapanel-${i}`);
        panel?.querySelector<HTMLElement>("a")?.focus();
      }, 0);
    }
  };

  const onPanelKeyDown = (e: React.KeyboardEvent, i: number) => {
    const panel = document.getElementById(`megapanel-${i}`);
    if (!panel) return;
    const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>("a"));
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(idx + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx <= 0) {
        document.getElementById(`megabtn-${i}`)?.focus();
        setOpen(null);
      } else {
        links[idx - 1]?.focus();
      }
    } else if (e.key === "Escape") {
      setOpen(null);
      document.getElementById(`megabtn-${i}`)?.focus();
    }
  };

  return (
    <div
      ref={navRef}
      className="hidden items-center gap-2 lg:flex"
      onMouseLeave={scheduleClose}
      onMouseEnter={clearClose}
    >
      {nav.items.map((item, i) => {
        const hasPanel = !!item.panel;
        if (!hasPanel) {
          return (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-small text-bone-dim transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          );
        }
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => {
              clearClose();
              setOpen(i);
            }}
          >
            <button
              id={`megabtn-${i}`}
              type="button"
              aria-expanded={open === i}
              aria-controls={`megapanel-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
              onKeyDown={(e) => onKeyDown(e, i, hasPanel)}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-small text-bone-dim transition-colors hover:text-bone aria-expanded:text-bone"
            >
              {item.label}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  open === i && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {open === i && item.panel && (
                <motion.div
                  id={`megapanel-${i}`}
                  role="group"
                  aria-label={item.label}
                  onKeyDown={(e) => onPanelKeyDown(e, i)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: reduce ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-[calc(100%+0.75rem)] w-[520px] overflow-hidden rounded-xl border border-ink-line bg-ink-raised/95 shadow-2xl backdrop-blur-xl"
                >
                  <div className="grid grid-cols-[1fr_auto]">
                    <ul className="flex flex-col p-3">
                      {item.panel.links.map((link) => (
                        <li key={`${link.label}-${link.desc}`}>
                          <a
                            href={link.href}
                            onClick={() => setOpen(null)}
                            className="flex flex-col gap-0.5 rounded-lg px-4 py-3 transition-colors hover:bg-ink-line/50"
                          >
                            <span className="text-body text-bone">{link.label}</span>
                            <span className="text-small text-text-muted">{link.desc}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {/* Preview panel */}
                    <div className="flex w-40 items-end border-l border-ink-line bg-ink p-4">
                      <span className="u-mono text-text-muted">{item.panel.preview}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
