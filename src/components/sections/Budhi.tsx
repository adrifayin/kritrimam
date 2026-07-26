import { site } from "@/content/site";
import { Runs } from "@/components/ui/RichText";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WaitlistTrigger } from "@/components/forms/WaitlistTrigger";
import { BlendImage } from "@/components/media/BlendImage";

export function Budhi() {
  const b = site.budhi;

  return (
    <section id="budhi" aria-labelledby="budhi-heading" className="section-y cv-auto">
      <div className="container-content relative">
        <SectionMarker>{b.marker}</SectionMarker>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.6fr]">
          <Reveal>
            <p className="u-mono text-text-muted">{b.tag}</p>
            <h2
              id="budhi-heading"
              className="font-display mt-4 max-w-[18ch] text-h2 tracking-[-0.03em] text-bone"
            >
              <Runs runs={b.h2} />
            </h2>
            <p className="prose-measure mt-6 text-lede text-text-muted">{b.lede}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <BlendImage
              src={site.images.budhi}
              alt="Stippled sculptural figure in white points on black"
              className="mx-auto aspect-[3/5] w-full max-w-[18rem] lg:max-w-none"
              sizes="(max-width: 1024px) 60vw, 28vw"
            />
          </Reveal>
        </div>

        {/* Capabilities: 1 col <768, 2×2 768–1279, 4 col ≥1280 */}
        <Stagger
          as="ul"
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {b.capabilities.map((cap) => (
            <StaggerItem
              as="li"
              key={cap.title}
              className="flex flex-col gap-3 rounded-xl border border-ink-line bg-ink-raised p-7"
            >
              <h3 className="font-display text-h3 text-bone">{cap.title}</h3>
              <p className="text-body text-text-muted">{cap.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Engagement steps */}
        <h3 className="font-display mt-16 text-h3 text-bone">{b.engagementTitle}</h3>
        <ol className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {b.engagement.map((step) => (
            <li key={step.n} className="flex flex-col gap-3">
              <span className="u-mono text-brass">{step.n}</span>
              <p className="text-body text-bone">
                <span className="font-medium">{step.lead}</span> {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <WaitlistTrigger interest="budhi" size="lg">
            {b.cta}
          </WaitlistTrigger>
        </div>
      </div>
    </section>
  );
}
