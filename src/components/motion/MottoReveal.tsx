"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Never fires — this store's value is constant per environment. */
const noopSubscribe = () => () => {};

/** False through SSR and hydration, true once the client owns the tree. */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP = 0.09; // 90ms stagger
const EM_GAP = 0.4; // italic words arrive 400ms after the rest

type Run = { readonly text: string; readonly em?: boolean; readonly tone?: "brass" | "indigo" };
type Line = readonly Run[];

const toneClass = { brass: "text-brass", indigo: "text-indigo-lit" } as const;

type Word = { text: string; em?: boolean; tone?: "brass" | "indigo" };

function splitLine(line: Line): Word[] {
  const words: Word[] = [];
  for (const run of line) {
    for (const w of run.text.split(/\s+/)) {
      if (w.length === 0) continue;
      words.push({ text: w, em: run.em, tone: run.tone });
    }
  }
  return words;
}

/**
 * Word-by-word mask reveal for the motto (§8.8). Italic words land last.
 *
 * Two rules keep this from failing to a blank section, which is what the
 * previous per-word `whileInView` did:
 *
 * 1. The observer watches the paragraph, never the words. Every word sits in
 *    an `overflow-hidden` mask and starts translated 110% below it, so its own
 *    intersection rect is clipped away to nothing — an observer on the word can
 *    never see the word, `whileInView` never fires, and the motto stays hidden
 *    for the whole session. The paragraph is unclipped, so it always resolves.
 * 2. Words render at rest and only take the hidden position after mount, so the
 *    motto is present in the server HTML. With JS off, or if the observer never
 *    fires, the failure mode is "no animation" rather than "no motto".
 */
export function MottoReveal({ lines }: { lines: readonly Line[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  // Generous trigger: a fifth of the paragraph, and the root stretched 160px
  // past the fold so short viewports arm it before it is centred.
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px 160px 0px",
  });

  const armed = useHasMounted();
  const animated = armed && !reduce;
  const hidden = animated && !inView;

  const lineWords = lines.map(splitLine);
  const baseTotal = lineWords.flat().filter((w) => !w.em).length;

  const label = lineWords
    .flat()
    .map((w) => w.text)
    .join(" ");

  let baseIdx = 0;
  let emIdx = 0;

  return (
    <p
      ref={ref}
      aria-label={label}
      className="font-display text-hero leading-[1.05] tracking-[-0.02em] text-bone"
    >
      {lineWords.map((words, li) => (
        <span key={li} aria-hidden="true" className="block">
          {words.map((word, wi) => {
            const delay = word.em
              ? baseTotal * STEP + EM_GAP + emIdx++ * STEP
              : baseIdx++ * STEP;

            const content = word.em ? (
              <em
                className={cn("italic", word.tone && toneClass[word.tone])}
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 0' }}
              >
                {word.text}
              </em>
            ) : (
              word.text
            );

            return (
              <span key={wi}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className="inline-block"
                    // `initial={false}` keeps motion from writing a transform
                    // into the SSR markup — the word ships legible and is only
                    // tucked away once the client has taken over.
                    initial={false}
                    animate={hidden ? { y: "110%" } : { y: 0 }}
                    transition={
                      // Arming (visible → hidden) happens off-screen and must be
                      // instant; only the reveal itself is staggered.
                      hidden || !animated
                        ? { duration: 0 }
                        : { duration: 0.55, delay, ease: EASE }
                    }
                  >
                    {content}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
