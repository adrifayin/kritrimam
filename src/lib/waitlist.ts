import { z } from "zod";

export const INTERESTS = ["nest", "budhi", "research", "other"] as const;
export type Interest = (typeof INTERESTS)[number];

const email = z
  .string()
  .min(1, "Enter your email address.")
  .email("That doesn't look like an email address — mind checking it?");

/* ---- Per-step client schemas ---- */

export const step1Schema = z.object({
  email,
  interest: z.enum(INTERESTS),
});

export const step2ASchema = z.object({
  role: z.string().min(1, "Pick one."),
  subject: z.string().min(1, "Add a subject or field."),
  institution: z.string().optional(),
});

export const step2BSchema = z.object({
  name: z.string().min(1, "Your name."),
  company: z.string().min(1, "Company name."),
  jobRole: z.string().min(1, "Your role."),
  problem: z.string().min(1, "A sentence is plenty.").max(500, "Keep it under 500 characters."),
  teamSize: z.string().min(1, "Pick a size."),
});

export const step2CSchema = z.object({
  name: z.string().min(1, "Your name."),
  affiliation: z.string().min(1, "Your affiliation."),
  area: z.string().min(1, "Area of interest."),
});

export const step2DSchema = z.object({
  name: z.string().min(1, "Your name."),
  message: z.string().min(1, "A short message.").max(500, "Keep it under 500 characters."),
});

export const branchSchemas = {
  nest: step2ASchema,
  budhi: step2BSchema,
  research: step2CSchema,
  other: step2DSchema,
} as const;

/* ---- Server submit schema ---- */

export const submitSchema = z.object({
  email,
  interest: z.enum(INTERESTS),
  // Honeypot: real users never fill this. Must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
  fields: z.record(z.string(), z.string()).optional(),
});

export type SubmitPayload = z.infer<typeof submitSchema>;
