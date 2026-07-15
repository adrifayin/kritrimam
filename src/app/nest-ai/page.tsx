import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "NEST.ai — Kritrimam",
  description:
    "An AI co-tutor that works from your own course material instead of guessing at the internet's average answer.",
};

export default function NestAiPage() {
  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.08em] uppercase text-ash mb-6">
            Coming Soon
          </p>
        </RevealOnScroll>

        {/* H1 */}
        <RevealOnScroll delay={0.05}>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-paper mb-8">
            NEST.ai
          </h1>
        </RevealOnScroll>

        {/* Positioning line */}
        <RevealOnScroll delay={0.1}>
          <p className="text-xl text-ash leading-relaxed mb-20">
            An AI co-tutor that works from your own course material — lecture
            videos, PDFs, slides, and notes — instead of guessing at the
            internet&apos;s average answer.
          </p>
        </RevealOnScroll>

        {/* What we build */}
        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              What we build
            </h2>
            <p className="text-paper/80 leading-relaxed">
              NEST.ai reads what you&apos;re actually studying — lecture
              recordings, PDFs, slide decks, handwritten notes — and turns it
              into something you can talk to. Ask it a question and it answers
              from your material, not a generic search result. It can summarize a
              lecture, turn a chapter into flashcards, generate a quiz, or lay
              out a study plan for what&apos;s coming. On the other side, it
              gives educators a way to turn a lecture into structured material
              and see where a class is actually struggling before the exam does.
            </p>
          </section>
        </RevealOnScroll>

        {/* What to expect */}
        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              What to expect
            </h2>
            <p className="text-paper/80 leading-relaxed">
              Every answer is grounded in the source you gave it, retrieved
              before it&apos;s generated — that&apos;s what keeps it from making
              things up. It works across languages, not just English. It&apos;s
              built to be something you come back to mid-semester, not a demo you
              try once.
            </p>
          </section>
        </RevealOnScroll>

        {/* The change we're hoping for */}
        <RevealOnScroll>
          <section className="mb-20">
            <h2 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              The change we&apos;re hoping for
            </h2>
            <p className="text-paper/80 leading-relaxed">
              A private tutor has always been something only some students could
              afford. NEST.ai is our attempt at closing that gap — the same
              quality of one-on-one help, available to any student with a phone,
              not just the ones who can pay for it.
            </p>
          </section>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll>
          <a
            href="https://github.com/adrifayin/nest-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-xs tracking-[0.08em] uppercase text-ash hover:text-paper transition-colors border border-ash/20 hover:border-ash/40 px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          >
            See the project
          </a>
        </RevealOnScroll>
      </div>
    </div>
  );
}
