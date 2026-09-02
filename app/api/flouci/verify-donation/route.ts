import { NextRequest, NextResponse } from "next/server";

const FLOUCI_BASE = "https://developers.flouci.com/api/v2";
const SHOP_URL = process.env.NEXT_PUBLIC_BASE_URL!;

/**
 * GET /api/flouci/verify-donation?payment_id=xxx
 *
 * Same verification logic as /api/flouci/verify, but for donations: a
 * donation doesn't grant chat access, so on success we simply send the
 * donor back to the homepage (same domain) with `?donation=success` so the
 * page can show a thank-you message — instead of provisioning a bot user
 * and redirecting to the workspace like the subscription flow does.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("payment_id");

  if (!paymentId) {
    console.error("Donation verify: no payment_id in query string");
    return NextResponse.redirect(`${SHOP_URL}/?donation=error`);
  }

  try {
    const verifyRes = await fetch(
      `${FLOUCI_BASE}/verify_payment/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLOUCI_PUBLIC_KEY}:${process.env.FLOUCI_SECRET_KEY}`,
        },
        cache: "no-store",
      }
    );

    const verifyData = await verifyRes.json();
    console.log(`Donation verify [${paymentId}]:`, JSON.stringify(verifyData));

    if (verifyData.success !== true) {
      console.warn("Donation verify: success=false", verifyData);
      return NextResponse.redirect(`${SHOP_URL}/?donation=failed`);
    }

    const status = verifyData.result?.status;

    if (status !== "SUCCESS") {
      if (status === "FAILURE") {
        return NextResponse.redirect(`${SHOP_URL}/?donation=failed`);
      }
      return NextResponse.redirect(`${SHOP_URL}/?donation=cancelled`);
    }

    return NextResponse.redirect(`${SHOP_URL}/?donation=success`);
  } catch (err) {
    console.error("Donation verify route error:", err);
    return NextResponse.redirect(`${SHOP_URL}/?donation=error`);
  }
}
