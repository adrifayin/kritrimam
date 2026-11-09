import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Clients() {
  const c = site.clients;

  return (
    <section id="clients" aria-labelledby="clients-heading" className="section-y cv-auto">
      <div className="container-content relative">
        <SectionMarker>{c.marker}</SectionMarker>

        <Reveal>
          <h2
            id="clients-heading"
            className="font-display text-h2 tracking-[-0.03em] text-bone"
          >
            {c.h2}
          </h2>
          <p className="prose-measure mt-5 text-lede text-text-muted">{c.sub}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line md:grid-cols-[2fr_1fr]"
        >
          {c.items.map((client) => (
            <StaggerItem as="li" key={client.name} className="bg-ink-raised">
              <a
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-6 p-7 transition-colors hover:bg-ink-line/40 md:p-10"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="u-mono text-brass">{client.meta}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-text-muted transition-colors group-hover:text-indigo-lit" />
                </span>
                <span className="font-display text-h3 tracking-[-0.02em] text-bone">
                  {client.name}
                </span>
                <span className="max-w-[52ch] text-body text-text-muted">{client.work}</span>
                <span className="u-mono mt-auto text-text-muted transition-colors group-hover:text-bone">
                  {client.linkLabel}
                </span>
              </a>
            </StaggerItem>
          ))}

          <StaggerItem as="li" className="bg-ink">
            <a
              href={c.open.href}
              className="group flex h-full min-h-[44px] flex-col gap-6 p-7 transition-colors hover:bg-ink-raised md:p-10"
            >
              <span className="u-mono text-text-muted">{c.open.meta}</span>
              <span className="font-display text-h3 tracking-[-0.02em] text-bone-dim transition-colors group-hover:text-bone">
                {c.open.line}
              </span>
              <span className="u-mono mt-auto flex items-center gap-2 text-text-muted transition-colors group-hover:text-bone">
                {c.open.linkLabel}
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
