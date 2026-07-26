"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  /** Render a multi-line textarea instead of an input. */
  multiline?: boolean;
};

type Props = BaseProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement> &
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof BaseProps
  >;

const control =
  "w-full rounded-md border border-ink-line bg-ink-raised px-4 py-3 text-body text-bone placeholder:text-text-muted/60 transition-colors duration-[--dur-fast] focus:border-indigo-lit focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass aria-[invalid=true]:border-red-400/70";

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function Field(
    { label, hideLabel, error, hint, className, multiline, id, ...rest },
    ref,
  ) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const errorId = `${fieldId}-error`;
    const hintId = `${fieldId}-hint`;
    const describedBy =
      [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
      undefined;

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <label
          htmlFor={fieldId}
          className={cn(
            "u-mono text-bone-dim",
            hideLabel && "sr-only",
          )}
        >
          {label}
        </label>

        {hint && (
          <p id={hintId} className="text-small text-text-muted">
            {hint}
          </p>
        )}

        {multiline ? (
          <textarea
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(control, "min-h-[7rem] resize-y")}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={control}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && (
          <p id={errorId} role="alert" className="text-small text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);
