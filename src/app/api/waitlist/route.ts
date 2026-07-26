import { NextResponse } from "next/server";
import { submitSchema } from "@/lib/waitlist";

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

  // TODO(production): persist to a store / email provider (e.g. Resend, KV).
  // For now we accept and log server-side only.
  console.info("[waitlist] signup", {
    email: parsed.data.email,
    interest: parsed.data.interest,
  });

  return NextResponse.json({ ok: true });
}
