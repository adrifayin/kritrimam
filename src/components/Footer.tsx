import { RevealOnScroll } from "./RevealOnScroll";

const contactLinks = [
  {
    label: "Instagram",
    text: "@adrifayin",
    href: "https://instagram.com/adrifayin",
  },
  {
    label: "Email",
    text: "adhilrifayinks@gmail.com",
    href: "mailto:adhilrifayinks@gmail.com",
  },
  {
    label: "WhatsApp",
    text: "+91 77366 67318",
    href: "https://wa.me/917736667318",
  },
  {
    label: "LinkedIn",
    text: "linkedin.com/in/adhilrifayinks",
    href: "https://linkedin.com/in/adhilrifayinks",
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-ash/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <RevealOnScroll>
          <p className="font-mono text-xs tracking-[0.08em] uppercase text-ash mb-12">
            Contact
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-24">
          {contactLinks.map((link, i) => (
            <RevealOnScroll key={link.label} delay={i * 0.08}>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.08em] uppercase text-ash/60">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-paper/80 hover:text-paper transition-colors relative group w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                >
                  {link.text}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-laterite transition-transform origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-ash/10">
          <span className="font-display text-sm text-paper/40">
            Kritrimam
          </span>
          <p className="font-mono text-xs text-ash/40 tracking-wide">
            © {new Date().getFullYear()} Kritrimam. Kerala, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
