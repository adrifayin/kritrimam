"use client";

export function ScrollToContact() {
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="inline-block font-mono text-xs tracking-[0.08em] uppercase text-ash hover:text-paper transition-colors border border-ash/20 hover:border-ash/40 px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
    >
      Contact
    </a>
  );
}
