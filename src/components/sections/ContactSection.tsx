import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnimatedDivider } from "@/components/AnimatedDivider";

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
    label: "WhatsApp / Mobile",
    text: "+91 77366 67318",
    href: "https://wa.me/917736667318",
  },
  {
    label: "LinkedIn",
    text: "linkedin.com/in/adhilrifayinks",
    href: "https://linkedin.com/in/adhilrifayinks",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="pt-24 md:pt-32 pb-12">
      {/* Animated divider */}
      <AnimatedDivider />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
        {/* H2 */}
        <RevealOnScroll>
          <h2 className="font-mono text-xs tracking-[0.08em] uppercase text-ash mb-6">
            Contact
          </h2>
        </RevealOnScroll>

        {/* Intro line */}
        <RevealOnScroll delay={0.05}>
          <p className="text-paper/80 text-lg leading-relaxed mb-16 max-w-xl">
            If you&apos;re building something and think we could help, get in
            touch.
          </p>
        </RevealOnScroll>

        {/* Contact links grid */}
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
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-laterite transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing copyright line */}
        <div className="border-t border-ash/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span
            className="text-sm font-bold text-paper/40 tracking-[0.04em]"
            style={{ fontFamily: "var(--font-wordmark)" }}
          >
            kritrimam
          </span>
          <p className="font-mono text-xs text-ash/40 tracking-wide">
            &copy; {new Date().getFullYear()} Kritrimam
          </p>
        </div>
      </div>
    </section>
  );
}
