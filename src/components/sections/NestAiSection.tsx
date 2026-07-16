import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnimatedDivider } from "@/components/AnimatedDivider";

export function NestAiSection() {
  return (
    <section id="nest-ai" className="pt-32 md:pt-40 pb-24 md:pb-32">
      {/* Animated divider */}
      <AnimatedDivider />

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
        {/* Eyebrow */}
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.08em] uppercase text-ash mb-6">
            Coming Soon
          </p>
        </RevealOnScroll>

        {/* H2 */}
        <RevealOnScroll delay={0.05}>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-paper mb-8">
            NEST.ai
          </h2>
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
            <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              What we build
            </h3>
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
            <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              What to expect
            </h3>
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
            <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-6">
              The change we&apos;re hoping for
            </h3>
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
            className="inline-block font-mono text-xs tracking-[0.08em] uppercase text-ash hover:text-paper transition-all duration-300 border border-ash/20 hover:border-laterite/40 px-6 py-3 hover:shadow-[0_0_20px_rgba(166,64,42,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          >
            See the project
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
