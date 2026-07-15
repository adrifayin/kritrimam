import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ScrollToContact } from "@/components/ScrollToContact";

export const metadata: Metadata = {
  title: "Enterprise — Kritrimam",
  description:
    "Kritrimam works directly with businesses to adapt AI to how they actually operate.",
};

const offerings = [
  {
    label: "Custom integration",
    description:
      "Bringing AI into tools and workflows you already use, instead of asking your team to adopt something new.",
  },
  {
    label: "Model adaptation",
    description:
      "Adjusting and grounding models in your own data, so answers reflect your business, not the general internet.",
  },
  {
    label: "Applied systems",
    description:
      "Retrieval and agent systems built for a specific operational problem, not a generic demo.",
  },
  {
    label: "Evaluation",
    description:
      "Ongoing testing so the system stays reliable once it's actually in production, not just on day one.",
  },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* H1 */}
        <RevealOnScroll>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-paper mb-8">
            Enterprise
          </h1>
        </RevealOnScroll>

        {/* Positioning line */}
        <RevealOnScroll delay={0.05}>
          <p className="text-xl text-ash leading-relaxed mb-20">
            Kritrimam works directly with businesses to adapt AI to how they
            actually operate — not a bolted-on chatbot, a system built around
            your data and your workflow.
          </p>
        </RevealOnScroll>

        {/* Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          {offerings.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 0.06}>
              <div>
                <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-laterite mb-4">
                  {item.label}
                </h3>
                <p className="text-paper/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing line + CTA */}
        <RevealOnScroll>
          <div className="border-t border-ash/10 pt-12">
            <p className="text-ash text-lg mb-6">
              If that&apos;s useful to you, get in touch.
            </p>
            <ScrollToContact />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
