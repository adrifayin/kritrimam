"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useWaitlist } from "@/components/forms/WaitlistProvider";

const emailSchema = z.string().email();

type Status = "idle" | "pending" | "success" | "error";

/** Inline single-field capture (§8.9). Posts directly; deeper intake lives
 *  in the modal, reachable via "Tell us more". */
export function WaitlistInline() {
  const w = site.waitlist;
  const { open } = useWaitlist();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (!emailSchema.safeParse(email).success) {
      setError(w.errorValidation);
      setStatus("error");
      return;
    }
    setStatus("pending");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          interest: "nest",
          website: honeypot.current?.value ?? "",
          fields: {},
        }),
      });
      if (res.ok) setStatus("success");
      else {
        setError(w.errorServer);
        setStatus("error");
      }
    } catch {
      setError(w.errorServer);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="mt-8 max-w-xl text-body text-verdigris">
        {w.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={status === "error"}
          aria-describedby={error ? "waitlist-error" : undefined}
          placeholder={w.placeholder}
          className="min-h-[48px] w-full rounded-md border border-ink-line bg-ink-raised px-4 py-3 text-body text-bone placeholder:text-text-muted/60 focus:border-indigo-lit focus:outline-none aria-[invalid=true]:border-red-400/70"
        />
        {/* Honeypot */}
        <input
          ref={honeypot}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
        />
        <Button type="submit" size="md" className="shrink-0" disabled={status === "pending"}>
          {status === "pending" ? site.microcopy.loading : w.button}
        </Button>
      </div>
      {error && (
        <p id="waitlist-error" role="alert" className="text-small text-red-400">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => open("nest")}
        className="u-mono w-fit text-text-muted underline-offset-4 hover:text-bone hover:underline"
      >
        Or tell us more →
      </button>
    </form>
  );
}
