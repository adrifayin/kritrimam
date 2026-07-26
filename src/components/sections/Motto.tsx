import { site } from "@/content/site";
import { MottoReveal } from "@/components/motion/MottoReveal";
import { AdaptiveVideo } from "@/components/media/AdaptiveVideo";

export function Motto() {
  const m = site.motto;

  return (
    <section
      aria-label="Kritrimam motto"
      className="relative flex min-h-[90dvh] w-full items-center justify-center overflow-hidden bg-ink"
    >
      {/* Ambient flowing video (poster-less; hidden under reduced motion) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <AdaptiveVideo
          desktopSrc={site.media.flowVideo}
          className="size-full object-cover opacity-[0.22] mix-blend-screen"
        />
      </div>
      {/* Vignette to keep the words centred */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 50%, transparent 30%, var(--color-ink) 100%)",
        }}
      />

      <div className="container-content text-center">
        {/* CLIENT: confirm motto wording — supplied as "elibrate", see brief §1; using recommended "deliberate" */}
        <MottoReveal lines={m.lines} />

        <p className="u-mono mt-12 text-text-muted">{m.footnote}</p>
      </div>
    </section>
  );
}
