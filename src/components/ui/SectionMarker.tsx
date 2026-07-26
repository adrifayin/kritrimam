/**
 * Section number. Hidden <768px, inline 768–1023px, absolute in the left
 * margin ≥1024px (§7.2).
 */
export function SectionMarker({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="u-mono hidden text-text-muted md:mb-4 md:block lg:absolute lg:left-0 lg:top-1 lg:mb-0 lg:-translate-x-[calc(100%+1.5rem)]"
    >
      {children}
    </span>
  );
}
