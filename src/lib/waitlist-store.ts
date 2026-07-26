import type { SubmitPayload } from "@/lib/waitlist";

/**
 * Waitlist delivery.
 *
 * Signups are fanned out to whichever providers are configured by env. Nothing
 * here takes a hard dependency on a vendor SDK — both transports are plain
 * `fetch` calls — so adding or removing one is a config change, not an install.
 *
 *   RESEND_API_KEY + WAITLIST_NOTIFY_TO   -> email notification via Resend
 *   WAITLIST_WEBHOOK_URL                  -> POST the signup as JSON
 *                                            (Zapier / Make / n8n / your own)
 *
 * With nothing configured the signup is logged and reported as unconfigured,
 * which keeps local development working without secrets.
 */

const TIMEOUT_MS = 8_000;

export type DeliveryResult = {
  /** At least one provider is configured via env. */
  configured: boolean;
  /** At least one configured provider accepted the signup. */
  delivered: boolean;
  /** Provider errors, for server-side logging only — never returned to the client. */
  errors: string[];
};

export type SignupMeta = {
  submittedAt: string;
  userAgent?: string;
};

/** Escapes text interpolated into the notification email body. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRows(payload: SubmitPayload): string {
  const entries = Object.entries(payload.fields ?? {});
  if (entries.length === 0) return "";
  return entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:2px 12px 2px 0;color:#888">${esc(k)}</td><td>${esc(v)}</td></tr>`,
    )
    .join("");
}

async function sendViaResend(
  payload: SubmitPayload,
  meta: SignupMeta,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_TO;
  if (!key || !to) return;

  const from = process.env.WAITLIST_NOTIFY_FROM ?? "Kritrimam <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: payload.email,
      subject: `Waitlist: ${payload.interest} — ${payload.email}`,
      html: [
        `<h2 style="font:600 16px system-ui">New waitlist signup</h2>`,
        `<table style="font:14px system-ui;border-collapse:collapse">`,
        `<tr><td style="padding:2px 12px 2px 0;color:#888">email</td><td>${esc(payload.email)}</td></tr>`,
        `<tr><td style="padding:2px 12px 2px 0;color:#888">interest</td><td>${esc(payload.interest)}</td></tr>`,
        detailRows(payload),
        `<tr><td style="padding:2px 12px 2px 0;color:#888">submitted</td><td>${esc(meta.submittedAt)}</td></tr>`,
        `</table>`,
      ].join(""),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`resend responded ${res.status}`);
  }
}

async function sendViaWebhook(
  payload: SubmitPayload,
  meta: SignupMeta,
): Promise<void> {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return;

  const token = process.env.WAITLIST_WEBHOOK_TOKEN;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      email: payload.email,
      interest: payload.interest,
      fields: payload.fields ?? {},
      submittedAt: meta.submittedAt,
      userAgent: meta.userAgent,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`webhook responded ${res.status}`);
  }
}

export async function deliverSignup(
  payload: SubmitPayload,
  meta: SignupMeta,
): Promise<DeliveryResult> {
  const transports: Array<{ name: string; run: () => Promise<void> }> = [];

  if (process.env.RESEND_API_KEY && process.env.WAITLIST_NOTIFY_TO) {
    transports.push({ name: "resend", run: () => sendViaResend(payload, meta) });
  }
  if (process.env.WAITLIST_WEBHOOK_URL) {
    transports.push({ name: "webhook", run: () => sendViaWebhook(payload, meta) });
  }

  if (transports.length === 0) {
    // No provider wired up yet. Log so local signups are still observable.
    console.info("[waitlist] signup (no delivery provider configured)", {
      email: payload.email,
      interest: payload.interest,
    });
    return { configured: false, delivered: false, errors: [] };
  }

  const settled = await Promise.allSettled(transports.map((t) => t.run()));
  const errors = settled.flatMap((r, i) =>
    r.status === "rejected"
      ? [`${transports[i].name}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`]
      : [],
  );

  return {
    configured: true,
    delivered: errors.length < transports.length,
    errors,
  };
}
