"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/use-scroll-lock";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { nav } = site;
  const [expanded, setExpanded] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 0);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      // Return focus to the hamburger (the trigger).
      previouslyFocused?.focus?.();
    };
  }, [open, onKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-drawer"
          className="fixed inset-0 z-[130] flex flex-col bg-ink lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.25 }}
        >
          <div className="flex-1 overflow-y-auto overscroll-contain pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-24 pb-8">
            <ul className="flex flex-col">
              {nav.items.map((item, i) => {
                const hasPanel = !!item.panel;
                const isOpen = expanded === i;
                return (
                  <motion.li
                    key={item.label}
                    className="border-b border-ink-line"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 + i * 0.04, duration: 0.4 }}
                  >
                    {hasPanel ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : i)}
                          className="flex w-full touch-manipulation select-none items-center justify-between py-5 text-left transition-opacity active:opacity-60"
                        >
                          <span className="font-display text-h3 text-bone">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "size-5 text-text-muted transition-transform duration-200",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.ul
                              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              {item.panel!.links.map((link) => (
                                <li key={`${link.label}-${link.desc}`}>
                                  <a
                                    href={link.href}
                                    onClick={onClose}
                                    className="flex touch-manipulation flex-col gap-0.5 py-3 pl-1 transition-opacity active:opacity-60"
                                  >
                                    <span className="text-body text-bone-dim">{link.label}</span>
                                    <span className="text-small text-text-muted">{link.desc}</span>
                                  </a>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="flex touch-manipulation select-none py-5 font-display text-h3 text-bone transition-opacity active:opacity-60"
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA pinned above safe-area inset */}
          <div className="border-t border-ink-line pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
            <Button href="#contact" size="lg" className="w-full" onClick={onClose}>
              {nav.cta}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
