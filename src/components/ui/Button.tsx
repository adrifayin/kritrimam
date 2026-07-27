"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * `touch-manipulation` drops the ~300ms double-tap-zoom delay mobile browsers
 * otherwise add before firing the tap. `select-none` stops a long press from
 * selecting the label. The `active:` states matter more than they look: the
 * base layer clears `-webkit-tap-highlight-color`, and touch devices never
 * hover, so without them a tap gives no feedback at all until the page moves.
 *
 * `[text-shadow:none]` opts out of `.text-legible`, the dark glow the hero
 * wraps its text in: harmless behind bone text on ink, but a muddy halo behind
 * ink text on a bone fill. The focus ring is declared here rather than left to
 * the global `:focus-visible` because that rule also forces `border-radius:2px`
 * — enough to square off a rounded button the moment it takes focus. A 3px
 * offset keeps the white ring separated from a white fill by a strip of ink.
 */
const base =
  "inline-flex touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-medium leading-none [text-shadow:none] transition-[color,background-color,border-color,transform,opacity] duration-[--dur-fast] ease-[--ease-in-out] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brass active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

/**
 * Every label colour is restated on `hover`/`active` so no state can fall back
 * to the inherited bone and land on its own fill. Filled and outlined are meant
 * to read as an equal pair: ink-on-bone and bone-on-ink both clear 16:1.
 */
const variants: Record<Variant, string> = {
  // Primary = white fill, ink text (monochrome).
  primary:
    "border-transparent bg-indigo text-ink hover:border-indigo-lit hover:bg-indigo-lit hover:text-ink active:bg-bone-dim active:text-ink",
  secondary:
    "border-bone/60 bg-transparent text-bone hover:border-bone hover:bg-bone/10 hover:text-bone active:border-bone active:bg-bone/20 active:text-bone",
  ghost:
    "border-transparent bg-transparent text-text-muted hover:bg-bone/5 hover:text-bone active:bg-bone/10 active:text-bone",
};

// Every size clears the 44px touch-target minimum (§7.3).
const sizes: Record<Size, string> = {
  sm: "min-h-[44px] px-4 text-small",
  md: "min-h-[48px] px-6 text-body",
  lg: "min-h-[54px] px-8 text-lede",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button({ variant = "primary", size = "md", className, children, ...props }, ref) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
