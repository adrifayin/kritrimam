import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnimatedDivider } from "@/components/AnimatedDivider";

export function VisionSection() {
  return (
    <section id="vision" className="relative pt-32 md:pt-40 pb-32 md:pb-48">
      {/* Animated divider */}
      <AnimatedDivider />

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
        {/* H2 */}
        <RevealOnScroll>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-paper mb-16">
            Vision
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p className="text-paper/80 text-lg leading-relaxed mb-12">
            Kritrimam isn&apos;t set up to ship one product and call it a
            company. NEST.ai and Budhi are what we&apos;ve built with what we
            know so far — proof of work, not the whole point. The point is the
            lab underneath both of them.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="text-paper/80 text-lg leading-relaxed mb-12">
            Most AI products fail quietly, in the gap between what a system
            actually knows and what it confidently says. We care about that gap
            more than almost anything else — about where an answer comes from,
            whether it&apos;s grounded in something real, and whether a system
            can tell the difference between knowing and guessing. That&apos;s
            what we mean by data clarity: not more data, clearer footing under
            it.
          </p>
        </RevealOnScroll>

        {/* Pull-quote — enhanced with gradient accent */}
        <RevealOnScroll>
          <blockquote className="relative my-16 md:my-20 pl-8">
            {/* Gradient accent line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{
                background: "linear-gradient(to bottom, var(--color-laterite), var(--color-laterite-deep), transparent)",
              }}
            />
            <p className="font-display text-3xl md:text-4xl text-paper leading-snug">
              Not more data, clearer footing under it.
            </p>
          </blockquote>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="text-paper/80 text-lg leading-relaxed">
            We&apos;re building toward the kind of research work usually
            reserved for a handful of labs in the world. That&apos;s a long way
            from where we are today — a small team in Kerala, self-funded,
            early. But the foundation we&apos;re laying now, in how we think
            about retrieval, evaluation, and what it actually means for a model
            to understand something, is built for that horizon, not for a quick
            exit.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
