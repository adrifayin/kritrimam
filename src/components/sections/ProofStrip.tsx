import { site } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function ProofStrip() {
  const { items } = site.proof;

  return (
    <section
      aria-label="What sets the lab apart"
      className="border-y border-ink-line bg-ink-raised"
    >
      <div className="container-content">
        <Stagger
          as="ul"
          className="grid grid-cols-1 divide-y divide-ink-line md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {items.map((item) => (
            <StaggerItem
              as="li"
              key={item.eyebrow}
              className="flex flex-col gap-3 py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
            >
              <p className="u-mono text-brass">{item.eyebrow}</p>
              <p className="text-body text-bone-dim">{item.line}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
