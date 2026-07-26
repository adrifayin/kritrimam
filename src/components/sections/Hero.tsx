import { site } from "@/content/site";
import { HeroVideo } from "@/components/media/HeroVideo";
import { HeroContent, ScrollCue } from "@/components/sections/HeroContent";

export function Hero() {
  const { media } = site;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="h-hero relative flex w-full flex-col justify-center overflow-hidden"
    >
      {/* Background video (parallax on desktop) — local looped ascii-hands */}
      <HeroVideo
        desktopSrc={media.heroVideoDesktop}
        mobileSrc={media.heroVideoMobile}
        poster={media.heroPoster}
      />
      {/* Ink overlay (55%) + top & bottom scrims so text stays legible over
          any video frame (§8.1) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-2/5 bg-gradient-to-b from-ink/75 to-transparent"
      />

      <HeroContent />
      <ScrollCue />
    </section>
  );
}
