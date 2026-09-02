'use server'

import { redirect } from 'next/navigation'
import { SUBSCRIPTION_PRICE_MILLIMES } from '@/lib/pricing'

const BOT_API_URL = "https://loi.morched.tn/api/v1";
const BOT_URL = "https://loi.morched.tn";
const WORKSPACE = "loi";
const FLOUCI_BASE = "https://developers.flouci.com/api/v2";

// The "bigger" Morched platform that hosts every enterprise workspace, not
// just the "loi" (student) one. If enterprise clients get their own
// dedicated domain/URL, set NEXT_PUBLIC_ENTERPRISE_URL in your .env and this
// will be used instead of the fallback below.
const ENTERPRISE_URL = process.env.NEXT_PUBLIC_ENTERPRISE_URL || BOT_URL;

// NOTE: a 'use server' file may only export async functions — that's why
// the price constants live in @/lib/pricing instead of being exported here.

function shortId() {
  return Math.random().toString(36).slice(2, 10); // 8 chars
}

// ─── STUDENT / TEST USER (10-message limit, "loi" workspace) ────────────────
// This is the flow behind the "student test" entry points: the hero's free
// button and, conceptually, the quick-test chat bubble in the corner.

export async function handleFreeStart() {
  const API_KEY = process.env.BOTAPI;
  const username = `f_${shortId()}`; // "f_xxxxxxxx" = 10 chars

  try {
    const userRes = await fetch(`${BOT_API_URL}/admin/users/new`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: "TempPassword123!", role: "default" }),
    });

    const userData = await userRes.json();
    const userId = userData.user?.id;
    if (!userId) throw new Error(`User creation failed: ${JSON.stringify(userData)}`);

    await fetch(`${BOT_API_URL}/admin/workspaces/${WORKSPACE}/manage-users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIds: [userId], reset: false }),
    });

    const tokenRes = await fetch(`${BOT_API_URL}/users/${userId}/issue-auth-token`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });

    const { token } = await tokenRes.json();
    redirect(`${BOT_URL}/sso/simple?token=${token}&redirectTo=/workspace/${WORKSPACE}`);
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Free SSO flow failed:", error);
    redirect(BOT_URL);
  }
}

// ─── ENTERPRISE USER (redirects to the main/bigger Morched platform) ────────
// Same SSO mechanism as the student flow, but: (1) the account is tagged as
// an enterprise lead (`e_` prefix) so it's easy to filter in the AnythingLLM
// admin panel, and (2) instead of dropping the user straight into the "loi"
// workspace, it sends them to the platform root so they land on the general
// workspace view (where every workspace the account can see is listed) —
// i.e. "the bigger platform / main workspaces" rather than a single one.
//
// TODO(morched): if enterprise clients should ultimately land on a separate
// domain/app entirely, set NEXT_PUBLIC_ENTERPRISE_URL in .env — see
// ENTERPRISE_URL above. Right now it falls back to the same BOT_URL.

export async function handleEnterpriseStart() {
  const API_KEY = process.env.BOTAPI;
  const username = `e_${shortId()}`; // "e_xxxxxxxx" = 10 chars

  try {
    const userRes = await fetch(`${BOT_API_URL}/admin/users/new`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: "TempPassword123!", role: "default" }),
    });

    const userData = await userRes.json();
    const userId = userData.user?.id;
    if (!userId) throw new Error(`User creation failed: ${JSON.stringify(userData)}`);

    await fetch(`${BOT_API_URL}/admin/workspaces/${WORKSPACE}/manage-users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIds: [userId], reset: false }),
    });

    const tokenRes = await fetch(`${BOT_API_URL}/users/${userId}/issue-auth-token`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });

    const { token } = await tokenRes.json();
    // No `redirectTo` → lands on the main platform view instead of one
    // single workspace.
    redirect(`${ENTERPRISE_URL}/sso/simple?token=${token}`);
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Enterprise SSO flow failed:", error);
    redirect(ENTERPRISE_URL);
  }
}

// ─── PAID USER (Flouci) ───────────────────────────────────────────────────────
// `amount` is bound in first via `handleFlouciStart.bind(null, "94000")` from
// a <form action={...}>, so every subscribe button can charge the right
// amount instead of a single hard-coded value.

export async function handleFlouciStart(amount: string = SUBSCRIPTION_PRICE_MILLIMES) {
  const shopUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  try {
    // Docs: POST /api/v2/generate_payment
    // Auth: Bearer <PUBLIC_KEY>:<PRIVATE_KEY>
    // Amount: in millimes (e.g. 94000 = 94 TND)
    //
    // CRITICAL: Both success_link and fail_link point to the SAME verify route.
    // Flouci appends ?payment_id=<ID> to whichever link it redirects to.
    // The verify route calls the Flouci API to check the REAL status —
    // never trust which link Flouci chose to redirect to.
    const res = await fetch(`${FLOUCI_BASE}/generate_payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLOUCI_PUBLIC_KEY}:${process.env.FLOUCI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        
        success_link: `${shopUrl}/api/flouci/verify`,    // Flouci appends ?payment_id=xxx
        fail_link: `${shopUrl}/api/flouci/verify`,       // same — we verify server-side
        developer_tracking_id: `order_${shortId()}`,
      }),
      cache: "no-store",
    });

    const data = await res.json();
    console.log("Flouci generate_payment response:", JSON.stringify(data));

    // Docs success shape: { result: { success: true, payment_id: "...", link: "..." } }
    if (!data.result?.success || !data.result?.link) {
      throw new Error(`Flouci generate_payment failed: ${JSON.stringify(data)}`);
    }

    redirect(data.result.link);
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    console.error("Flouci redirect failed:", error);
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL!}/?flouci=error`);
  }
}
