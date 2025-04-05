import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    await connectToDB();

    // Get token from Authorization header first
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1].trim()
      : null;

    // Fallback to cookie if not in header
    if (!token) {
      const cookieHeader = request.headers.get("cookie") || "";
      token = cookieHeader
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token missing" },
        { status: 401 }
      );
    }

    // Additional token format validation
    if (token.split(".").length !== 3) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const orders = await Order.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Orders fetch error:", error);

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "Invalid token - please login again" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
