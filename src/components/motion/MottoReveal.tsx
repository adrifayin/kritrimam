"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

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

/** Word-by-word mask reveal for the motto (§8.8). Italic words land last. */
export function MottoReveal({ lines }: { lines: readonly Line[] }) {
  const reduce = useReducedMotion();
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
                    initial={reduce ? false : { y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, delay: reduce ? 0 : delay, ease: EASE }}
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
