import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Contact() {
  const c = site.contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y">
      <div className="container-content">
        <Reveal>
          <h2
            id="contact-heading"
            className="font-display text-h2 tracking-[-0.03em] text-bone"
          >
            {c.h2}
          </h2>
          <p className="prose-measure mt-5 text-lede text-text-muted">{c.sub}</p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2"
        >
          {c.channels.map((ch) => {
            const external = /^https?:\/\//.test(ch.href);
            return (
              <StaggerItem as="li" key={ch.channel} className="bg-ink-raised">
                <a
                  href={ch.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-[44px] items-center justify-between gap-4 p-7 transition-colors hover:bg-ink-line/40"
                >
                  <span className="flex flex-col gap-1">
                    <span className="u-mono text-text-muted">{ch.channel}</span>
                    <span className="text-body text-bone">{ch.value}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-text-muted transition-colors group-hover:text-indigo-lit" />
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
