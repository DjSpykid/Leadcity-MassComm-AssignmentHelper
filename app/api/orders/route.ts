
// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const order = new Order(body);
    await order.save();
    return NextResponse.json(order);
  } catch (error) {
     console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
     console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
