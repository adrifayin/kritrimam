"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-medium leading-none transition-colors duration-[--dur-fast] ease-[--ease-in-out] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Primary = white fill, ink text (monochrome).
  primary:
    "border-transparent bg-indigo text-ink hover:border-indigo-lit hover:bg-indigo-lit",
  secondary:
    "border-bone/40 bg-transparent text-bone hover:border-bone",
  ghost:
    "border-transparent bg-transparent text-text-muted hover:text-bone",
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
