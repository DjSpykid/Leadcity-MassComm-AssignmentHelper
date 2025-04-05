// app/api/paystack/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const signature = headers().get("x-paystack-signature")!;

  try {
    const body = await request.text();

    // Verify the webhook signature
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      await connectToDB();

      const { reference, amount, metadata } = event.data;
      const orderId = metadata.orderId;

      // Update the order status
      await Order.findByIdAndUpdate(orderId, {
        status: "PAID",
        paymentStatus: "successful",
        paymentDate: new Date(),
        paymentReference: reference,
      });

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
