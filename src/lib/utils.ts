import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The `@theme` type scale (--text-hero … --text-mono) emits `text-*` classes
 * that tailwind-merge cannot tell apart from `text-<colour>` — none of them
 * look like a t-shirt size, so it files them under text-colour. Merging a
 * variant's `text-ink` with a size's `text-lede` then reads as two colours and
 * silently drops the first, which is how the primary button shipped rendering
 * bone-on-bone. Registering the scale as font sizes keeps colour and size in
 * separate conflict groups.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["hero", "h2", "h3", "lede", "body", "small", "mono"] },
      ],
    },
  },
});

/** Merge conditional class names, de-duplicating Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
