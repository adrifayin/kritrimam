import { site } from "@/content/site";

export function Footer() {
  const f = site.footer;
  const { brand } = site;

  return (
    <footer className="border-t border-ink-line">
      <div className="container-content py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
            <span className="u-mono text-bone" style={{ letterSpacing: "0.18em" }}>
              {brand.name}
            </span>
            <span className="font-malayalam text-lede text-bone-dim">
              {brand.malayalam}
            </span>
            <span className="mt-2 text-small text-text-muted">{f.tagline}</span>
          </div>

          {/* Link columns */}
          {f.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <p className="u-mono text-text-muted">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => {
                  const external = /^https?:\/\//.test(link.href);
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex min-h-[44px] items-center text-body text-bone-dim transition-colors hover:text-bone"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Meta row */}
        <div className="mt-14 flex flex-col gap-6 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-6">
            {f.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-mono inline-flex min-h-[44px] items-center text-text-muted transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <span className="text-small text-text-muted">{f.copyright}</span>
            <a
              href="#hero"
              className="u-mono inline-flex min-h-[44px] items-center text-text-muted transition-colors hover:text-bone"
            >
              {f.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
