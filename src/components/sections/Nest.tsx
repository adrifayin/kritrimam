import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { GroundingThread } from "@/components/motion/GroundingThread";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WaitlistTrigger } from "@/components/forms/WaitlistTrigger";
import { BlendImage } from "@/components/media/BlendImage";

export function Nest() {
  const n = site.nest;

  return (
    <section id="nest" aria-labelledby="nest-heading" className="section-y cv-auto">
      <div className="container-content relative">
        <SectionMarker>{n.marker}</SectionMarker>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
          <Reveal>
            <p className="u-mono text-brass">{n.tag}</p>
            <h2
              id="nest-heading"
              className="font-display mt-4 text-h2 tracking-[-0.03em] text-bone"
            >
              {n.h2}
            </h2>
            <p className="prose-measure mt-6 text-lede text-text-muted">{n.lede}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <BlendImage
              src={site.images.nest}
              alt="Line-art brain wrapped in orbital rings"
              className="mx-auto aspect-square w-full max-w-sm lg:max-w-none"
              sizes="(max-width: 1024px) 70vw, 34vw"
            />
          </Reveal>
        </div>

        {/* How it works — horizontal ≥1024 with connecting rule, vertical below */}
        <h3 className="font-display mt-16 text-h3 text-bone">{n.howTitle}</h3>
        <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {n.steps.map((step) => (
            <StaggerItem as="li" key={step.n} className="relative flex flex-col">
              <div className="flex items-center gap-4">
                <span className="u-mono flex size-9 shrink-0 items-center justify-center rounded-full border border-ink-line text-bone">
                  {step.n}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-ink-line lg:block"
                />
              </div>
              <h4 className="font-display mt-5 text-h3 text-bone">{step.title}</h4>
              <p className="mt-3 text-body text-text-muted">{step.body}</p>

              {/* Grounding thread instance #2 — three threads, 120ms stagger */}
              {"chips" in step && step.chips && (
                <div className="mt-6 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4">
                  {step.chips.map((chip, ci) => (
                    <GroundingThread key={chip} chip={chip} delay={ci * 0.12} />
                  ))}
                </div>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        {/* Sub-blocks */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[n.educators, n.expect, n.why].map((block) => (
            <div key={block.title} className="flex flex-col gap-3">
              <h3 className="u-mono text-bone-dim">{block.title}</h3>
              <p className="text-body text-text-muted">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <WaitlistTrigger interest="nest" size="lg">
            {n.ctaPrimary}
          </WaitlistTrigger>
          <Button href={n.repo} variant="secondary" size="lg">
            {n.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
