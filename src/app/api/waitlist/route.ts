import { NextResponse } from "next/server";
import { submitSchema } from "@/lib/waitlist";
import { deliverSignup } from "@/lib/waitlist-store";

/**
 * In-memory IP rate limiter. Per-instance only (resets on cold start), which
 * is enough to blunt casual abuse; a durable store (Upstash/KV) would replace
 * this in production.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed." },
      { status: 400 },
    );
  }

  // Honeypot filled → silently accept without processing (don't tip off bots).
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverSignup(parsed.data, {
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
  });

  // A configured provider that failed means the signup is lost — say so rather
  // than returning ok and dropping it silently. Provider errors stay server-side.
  if (result.configured && !result.delivered) {
    console.error("[waitlist] delivery failed", result.errors);
    return NextResponse.json(
      { ok: false, error: "We couldn't save that just now. Please try again." },
      { status: 502 },
    );
  }

  // Partial failure: one transport landed, another didn't. The signup is safe,
  // so the visitor still gets a success — but flag it for the logs.
  if (result.errors.length > 0) {
    console.warn("[waitlist] partial delivery", result.errors);
  }

  return NextResponse.json({ ok: true });
}
