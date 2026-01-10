import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { triggerProjectProcessing } from "@/lib/actions/images";
import { handlePolarOrderPaid, handlePolarPaymentFailure } from "@/lib/actions/payments";
import { db } from "@/lib/db";
import { createAffiliateEarningFromPolarOrder } from "@/lib/db/queries";
import { projectPayment } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headers = Object.fromEntries(request.headers.entries());

  let event;

  try {
    event = validateEvent(body, headers, process.env.POLAR_WEBHOOK_SECRET!);
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      console.error("[webhook/polar] Verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }
    throw err;
  }

  console.log(`[webhook/polar] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "order.paid": {
        const order = event.data;
        const checkoutId = order.checkoutId;

        if (!checkoutId) {
          console.log("[webhook/polar] order.paid without checkoutId, skipping");
          break;
        }

        const result = await handlePolarOrderPaid(checkoutId, order.id);

        if (result.success) {
          await triggerProjectProcessing(result.data.projectId);
          console.log(
            `[webhook/polar] Payment successful, processing triggered for project: ${result.data.projectId}`,
          );

          const payment = await db.query.projectPayment.findFirst({
            where: eq(projectPayment.projectId, result.data.projectId),
          });

          if (payment) {
            await createAffiliateEarningFromPolarOrder({
              workspaceId: payment.workspaceId,
              polarOrderId: order.id,
              orderAmountCents: order.totalAmount,
            });
          }
        } else {
          console.error(`[webhook/polar] Failed to handle order.paid: ${result.error}`);
        }
        break;
      }

      case "checkout.updated": {
        const checkout = event.data;

        if (checkout.status === "failed" || checkout.status === "expired") {
          const result = await handlePolarPaymentFailure(checkout.id);

          if (result.success) {
            console.log(
              `[webhook/polar] Checkout ${checkout.status} for project: ${result.data.projectId}`,
            );
          }
        }
        break;
      }

      default:
        console.log(`[webhook/polar] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[webhook/polar] Error processing event ${event.type}:`, error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
