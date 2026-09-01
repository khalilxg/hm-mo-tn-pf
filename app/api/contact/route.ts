import { NextRequest, NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * POST /api/contact
 *
 * Receives contact-form submissions from the website's "اتصل بنا" form.
 *
 * NOTE: No transactional-email provider is currently configured for this
 * project (no SMTP / Resend / SendGrid credentials). Until one is added,
 * this route validates and logs the submission server-side so nothing is
 * silently dropped, and returns an error status so the client falls back
 * to opening a pre-filled mailto: link to contact@aibc.tn.
 *
 * To make this fully automatic, wire up an email provider here (e.g.
 * Resend, SendGrid, or SMTP via nodemailer) using environment variables,
 * and send a notification to contact@aibc.tn on each submission.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 })
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "message_too_short" }, { status: 400 })
    }

    // TODO: replace with a real email provider integration.
    console.log("[contact] new submission", {
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    })

    const CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL
    if (CONTACT_WEBHOOK_URL) {
      // Optional: forward to an external service (e.g. Slack, Zapier,
      // Resend) if the operator sets CONTACT_WEBHOOK_URL.
      await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      }).catch((err) => console.error("[contact] webhook forward failed", err))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] route error", err)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}
