// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { saveUploadedFile } from "@/lib/server/file-upload";

export async function POST(request: Request) {
  try {
    await connectToDB();

    // Authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // Process form data
    const formData = await request.formData();
    const data = JSON.parse(formData.get("data") as string);
    const files = formData.getAll("files") as File[];

    // Save files
    const attachments = await Promise.all(
      files.map(async (file) => await saveUploadedFile(file))
    );

    // Create order
    const order = new Order({
      ...data,
      user: decoded.userId,
      status: "PAID",
      paymentStatus: "successful",
      paymentDate: new Date(),
      details: {
        ...data.details,
        attachments,
        deadline: new Date(data.details.deadline),
      },
    });

    await order.save();

    return NextResponse.json({ orderId: order._id.toString() });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {
  try {
    await connectToDB();

    // Authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing or malformed" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const orders = await Order.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

