// app/api/paystack/callback/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    // Verify Paystack signature
    const signature = request.headers.get("x-paystack-signature");
    // You should implement signature verification here using Paystack's secret key

    if (body.event === "charge.success") {
      const reference = body.data.reference;

      const order = await Order.findOneAndUpdate(
        { paymentReference: reference },
        { status: "PAID" },
        { new: true }
      );

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
