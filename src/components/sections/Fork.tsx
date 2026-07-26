import { site } from "@/content/site";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BlendImage } from "@/components/media/BlendImage";

const forkImages = [site.images.contour, site.images.blackhole];

export function Fork() {
  const { eyebrow, h2, sub, cards } = site.fork;

  return (
    <section
      id="fork"
      aria-labelledby="fork-heading"
      className="section-y"
    >
      <div className="container-content">
        <Reveal>
          <p className="u-mono text-text-muted">{eyebrow}</p>
          <h2
            id="fork-heading"
            className="font-display mt-4 text-h2 leading-[0.95] tracking-[-0.03em] text-bone"
          >
            {h2}
          </h2>
          <p className="prose-measure mt-5 text-lede text-text-muted">{sub}</p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8">
          {cards.map((card, i) => (
            <StaggerItem key={card.title} className="h-full">
              <a
                href={card.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-line bg-ink-raised p-8 transition-[transform,border-color] duration-[--dur-base] ease-[--ease-in-out] md:p-10 md:hover:-translate-y-1 md:hover:border-bone/40"
              >
                {/* Blended abstract thumbnail */}
                <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-ink-line bg-ink">
                  <BlendImage
                    src={forkImages[i]}
                    alt=""
                    tilt={false}
                    objectFit="cover"
                    className="size-full"
                    sizes="(max-width: 768px) 90vw, 44vw"
                  />
                </div>

                <p className="u-mono text-brass">{card.tag}</p>
                <h3 className="font-display mt-4 text-h3 text-bone">{card.title}</h3>
                <p className="mt-4 text-body text-text-muted">{card.body}</p>
                <span className="u-mono mt-8 inline-flex items-center gap-2 text-bone transition-colors group-hover:text-indigo-lit">
                  {card.cta}
                  <ArrowRight className="size-4 transition-transform duration-[--dur-base] group-hover:translate-x-1" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
