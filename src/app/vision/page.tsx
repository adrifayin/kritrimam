import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Vision — Kritrimam",
  description:
    "Kritrimam isn't set up to ship one product and call it a company. The point is the lab underneath it.",
};

export default function VisionPage() {
  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* H1 */}
        <RevealOnScroll>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-paper mb-16">
            Vision
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p className="text-paper/80 text-lg leading-relaxed mb-12">
            Kritrimam isn&apos;t set up to ship one product and call it a
            company. NEST.ai is the first thing we&apos;ve built with what we
            know — it&apos;s proof of work, not the whole point. The point is
            the lab underneath it.
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

        {/* Pull-quote — one Fraunces moment for typographic rhythm */}
        <RevealOnScroll>
          <blockquote className="my-16 md:my-20 border-l-2 border-laterite pl-8">
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
    </div>
  );
}
