"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { site } from "@/content/site";
import { Modal } from "@/components/ui/Modal";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  step1Schema,
  branchSchemas,
  type Interest,
} from "@/lib/waitlist";

type FormValues = {
  email: string;
  interest: Interest | "";
  website: string; // honeypot
  role: string;
  subject: string;
  institution: string;
  name: string;
  company: string;
  jobRole: string;
  problem: string;
  teamSize: string;
  affiliation: string;
  area: string;
  message: string;
};

const branchKeys: Record<Interest, (keyof FormValues)[]> = {
  nest: ["role", "subject", "institution"],
  budhi: ["name", "company", "jobRole", "problem", "teamSize"],
  research: ["name", "affiliation", "area"],
  other: ["name", "message"],
};

const TOTAL = 3;

export function WaitlistModal({
  open,
  onClose,
  initialInterest,
}: {
  open: boolean;
  onClose: () => void;
  initialInterest?: Interest;
}) {
  const M = site.waitlistModal;
  const {
    register,
    getValues,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { interest: initialInterest ?? "" } });

  const [step, setStep] = useState<"email" | "branch" | "success">("email");
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const interest = watch("interest");

  useEffect(() => {
    if (open) {
      reset({ interest: initialInterest ?? "" } as Partial<FormValues>);
      setStep("email");
      setServerError(null);
    }
  }, [open, initialInterest, reset]);

  const validate = (schema: z.ZodType, keys: (keyof FormValues)[]): boolean => {
    const values = getValues();
    const subset = Object.fromEntries(keys.map((k) => [k, values[k]]));
    const res = schema.safeParse(subset);
    clearErrors();
    if (!res.success) {
      for (const issue of res.error.issues) {
        setError(issue.path[0] as keyof FormValues, { message: issue.message });
      }
      return false;
    }
    return true;
  };

  const next = () => {
    if (validate(step1Schema, ["email", "interest"])) setStep("branch");
  };

  const submit = async () => {
    if (!interest) return;
    if (!validate(branchSchemas[interest], branchKeys[interest])) return;
    setPending(true);
    setServerError(null);
    const v = getValues();
    const fields = Object.fromEntries(
      branchKeys[interest].map((k) => [k, v[k] ?? ""]),
    );
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: v.email,
          interest: v.interest,
          website: v.website,
          fields,
        }),
      });
      if (res.ok) setStep("success");
      else setServerError(M.failure);
    } catch {
      setServerError(M.failure);
    } finally {
      setPending(false);
    }
  };

  const stepNo = step === "email" ? 1 : 2;

  return (
    <Modal open={open} onClose={onClose} labelledBy="waitlist-modal-title">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        {/* Honeypot — visually hidden, off the a11y + tab path */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
          {...register("website")}
        />

        {step !== "success" && (
          <p className="u-mono text-text-muted">{M.progress(stepNo, TOTAL)}</p>
        )}

        {/* STEP 1 — email + interest */}
        {step === "email" && (
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <h2 id="waitlist-modal-title" className="font-display text-h3 text-bone">
              {M.step1Title}
            </h2>

            <Field
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={site.waitlist.placeholder}
              error={errors.email?.message}
              {...register("email")}
            />

            <fieldset className="flex flex-col gap-3">
              <legend className="u-mono mb-1 text-bone-dim">I&apos;m interested in…</legend>
              {M.interests.map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-ink-line bg-ink px-4 py-3 has-[:checked]:border-indigo-lit"
                >
                  <input
                    type="radio"
                    value={opt.id}
                    className="accent-indigo-lit"
                    {...register("interest")}
                  />
                  <span className="text-body text-bone">{opt.label}</span>
                </label>
              ))}
              {errors.interest && (
                <p role="alert" className="text-small text-red-400">
                  Pick one to continue.
                </p>
              )}
            </fieldset>

            <div className="flex justify-end">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {/* STEP 2 — branch */}
        {step === "branch" && interest && (
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            <h2 id="waitlist-modal-title" className="font-display text-h3 text-bone">
              A few details
            </h2>

            {interest === "nest" && (
              <>
                <fieldset className="flex flex-col gap-2">
                  <legend className="u-mono mb-1 text-bone-dim">Role</legend>
                  <div className="flex flex-wrap gap-2">
                    {M.roles.map((r) => (
                      <label
                        key={r}
                        className="cursor-pointer rounded-md border border-ink-line px-4 py-2 text-small text-bone has-[:checked]:border-indigo-lit has-[:checked]:text-bone"
                      >
                        <input type="radio" value={r} className="sr-only" {...register("role")} />
                        {r}
                      </label>
                    ))}
                  </div>
                  {errors.role && (
                    <p role="alert" className="text-small text-red-400">{errors.role.message}</p>
                  )}
                </fieldset>
                <Field label="Subject or field" error={errors.subject?.message} {...register("subject")} />
                <Field
                  label="Institution (optional)"
                  autoComplete="organization"
                  {...register("institution")}
                />
              </>
            )}

            {interest === "budhi" && (
              <>
                <Field label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
                <Field
                  label="Company"
                  autoComplete="organization"
                  error={errors.company?.message}
                  {...register("company")}
                />
                <Field
                  label="Role"
                  autoComplete="organization-title"
                  error={errors.jobRole?.message}
                  {...register("jobRole")}
                />
                <Field
                  label="What are you trying to solve?"
                  multiline
                  hint="Up to 500 characters."
                  error={errors.problem?.message}
                  {...register("problem")}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="teamSize" className="u-mono text-bone-dim">Team size</label>
                  <select
                    id="teamSize"
                    className="min-h-[48px] rounded-md border border-ink-line bg-ink-raised px-4 text-body text-bone focus:border-indigo-lit focus:outline-none"
                    {...register("teamSize")}
                  >
                    <option value="">Select…</option>
                    {M.teamSizes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.teamSize && (
                    <p role="alert" className="text-small text-red-400">{errors.teamSize.message}</p>
                  )}
                </div>
              </>
            )}

            {interest === "research" && (
              <>
                <Field label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
                <Field
                  label="Affiliation"
                  autoComplete="organization"
                  error={errors.affiliation?.message}
                  {...register("affiliation")}
                />
                <Field label="Area of interest" error={errors.area?.message} {...register("area")} />
              </>
            )}

            {interest === "other" && (
              <>
                <Field label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
                <Field
                  label="Message"
                  multiline
                  error={errors.message?.message}
                  {...register("message")}
                />
              </>
            )}

            {serverError && (
              <p role="alert" className="text-small text-red-400">{serverError}</p>
            )}

            <div className="flex items-center justify-between gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep("email")}>
                {M.back}
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? site.microcopy.loading : "Submit"}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3 — success */}
        {step === "success" && (
          <div className="flex flex-col gap-4 py-6">
            <h2 id="waitlist-modal-title" className="font-display text-h3 text-bone">
              {M.successTitle}
            </h2>
            <p className="text-body text-text-muted">{M.successBody}</p>
            <div className="mt-2">
              <Button onClick={onClose}>{M.successCta}</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
