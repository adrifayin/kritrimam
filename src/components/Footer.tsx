import Link from "next/link";
import { Logo } from "./Logo";
import { FadeIn } from "./FadeIn";

const contactLinks = [
  { label: "Email", text: "adhilrifayinks@gmail.com", href: "mailto:adhilrifayinks@gmail.com", mono: false },
  { label: "Instagram", text: "@adrifayin", href: "https://instagram.com/adrifayin", mono: false },
  { label: "WhatsApp", text: "+91 7736667318", href: "https://wa.me/917736667318", mono: true },
  { label: "Phone", text: "+91 7736667318", href: "tel:+917736667318", mono: true },
  { label: "GitHub", text: "github.com/adrifayin", href: "https://github.com/adrifayin", mono: false },
  { label: "LinkedIn", text: "linkedin.com/in/adhilrifayinks", href: "https://linkedin.com/in/adhilrifayinks", mono: false },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink-soft pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-2xl md:text-3xl text-parchment tracking-tight mb-16">
            Connect
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 mb-24">
          {contactLinks.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-parchment-dim">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`text-lg text-parchment hover:text-laterite-bright transition-colors relative group w-fit ${link.mono ? 'font-mono text-base tracking-wider' : ''}`}
                >
                  {link.text}
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-laterite transition-transform origin-left scale-x-0 group-hover:scale-x-100" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-white/5">
          <Logo variant="monogram" className="w-8 h-8 opacity-50" />
          <p className="text-sm text-parchment-dim tracking-wide">
            © {new Date().getFullYear()} Kritrimam. Built in Kerala, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
