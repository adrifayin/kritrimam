import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { WaitlistTrigger } from "@/components/forms/WaitlistTrigger";

/** Full-bleed inverted (white-on-black) CTA band — the one tonal inversion. */
export function CtaBand() {
  const { headline, ctaPrimary, ctaSecondary } = site.ctaBand;

  return (
    <section aria-label="Get started" className="bg-bone text-ink">
      <div className="container-content flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <p className="font-display text-h3 leading-tight text-ink">
          {headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WaitlistTrigger
            interest="nest"
            className="border-transparent bg-ink text-bone hover:border-transparent hover:bg-ink/85"
          >
            {ctaPrimary}
          </WaitlistTrigger>
          <Button
            href="#budhi"
            variant="secondary"
            className="border-ink/40 text-ink hover:border-ink"
          >
            {ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
