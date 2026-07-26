import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark that cross-fades from the lowercase latin `kritrimam` to the
 * Malayalam script കൃത്രിമം on hover/focus — the name means "artificial",
 * and the script roots the lab in Kerala. Pure CSS cross-fade.
 */
export function Wordmark({ className }: { className?: string }) {
  const { brand } = site;
  return (
    <a
      href="#hero"
      aria-label={`${brand.name} — home`}
      className={cn("group relative inline-grid", className)}
    >
      <span
        className="u-mono col-start-1 row-start-1 text-bone transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
        style={{ letterSpacing: "0.18em" }}
        aria-hidden="true"
      >
        {brand.name}
      </span>
      <span
        className="font-malayalam col-start-1 row-start-1 text-lg leading-none text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        {brand.malayalam}
      </span>
    </a>
  );
}
