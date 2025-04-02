import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const cookieHeader = request.headers.get("cookie") || "";
    const token = cookieHeader.match(/token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const orders = await Order.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
