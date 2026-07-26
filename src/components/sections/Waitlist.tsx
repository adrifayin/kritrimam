import { site } from "@/content/site";
import { Runs } from "@/components/ui/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistInline } from "@/components/forms/WaitlistInline";
import { BlendImage } from "@/components/media/BlendImage";

export function Waitlist() {
  const w = site.waitlist;

  return (
    <section id="waitlist" aria-labelledby="waitlist-heading" className="section-y">
      <div className="container-content grid items-center gap-12 lg:grid-cols-[1fr_0.5fr]">
        <div>
          <Reveal>
            <p className="u-mono text-brass">{w.eyebrow}</p>
            <h2
              id="waitlist-heading"
              className="font-display mt-4 text-h2 tracking-[-0.03em] text-bone"
            >
              <Runs runs={w.h2} />
            </h2>
            <p className="prose-measure mt-5 text-lede text-text-muted">{w.sub}</p>
          </Reveal>

          <WaitlistInline />
        </div>

        <Reveal delay={0.05}>
          <BlendImage
            src={site.images.smokeHead}
            alt="A luminous figure with a face dissolving into smoke"
            className="mx-auto hidden aspect-[4/5] w-full max-w-[16rem] lg:block lg:max-w-none"
            sizes="24rem"
          />
        </Reveal>
      </div>
    </section>
  );
}
