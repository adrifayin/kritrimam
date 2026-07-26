import { site } from "@/content/site";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/motion/Reveal";
import { BlendImage } from "@/components/media/BlendImage";

export function Vision() {
  const v = site.vision;

  return (
    <section id="vision" aria-labelledby="vision-heading" className="section-y cv-auto">
      <div className="container-content relative">
        <SectionMarker>{v.marker}</SectionMarker>

        <Reveal>
          <h2
            id="vision-heading"
            className="font-display text-h2 tracking-[-0.03em] text-bone"
          >
            {v.h2}
          </h2>

          <div className="prose-measure mt-8 flex flex-col gap-6">
            {v.paras.map((p, i) => (
              <p key={i} className="text-body text-text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Pull quote — Fraunces, large, white left-rule */}
        <Reveal>
          <blockquote className="my-14 max-w-[24ch] border-l-2 border-bone pl-6 md:pl-8">
            <p className="font-display text-h2 leading-[1.1] tracking-[-0.02em] text-bone">
              {v.pullQuote}
            </p>
          </blockquote>
        </Reveal>

        {/* The single moment of colour on the page */}
        <Reveal>
          <figure className="my-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <BlendImage
              src={site.images.prismHead}
              alt="A glossy black figure lit by a single band of prismatic colour"
              blend={false}
              objectFit="cover"
              className="aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-xl border border-ink-line"
              sizes="(max-width: 640px) 80vw, 16rem"
            />
            <figcaption className="u-mono max-w-[22ch] text-text-muted">
              Colour, used once — the difference between knowing and guessing.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <p className="prose-measure text-body text-text-muted">{v.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
