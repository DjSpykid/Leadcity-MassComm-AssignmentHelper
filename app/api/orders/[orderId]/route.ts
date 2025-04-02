// app/api/orders/[orderId]/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as fs from "fs/promises";
import { join } from "path";
import { writeFile } from "fs/promises";

// Module configuration
export const dynamic = "force-dynamic";

// GET handler
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const orderId = url.pathname.split("/").pop();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID parameter is missing" },
        { status: 400 }
      );
    }

    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: "Invalid Order ID format" },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      _id: orderId,
      user: decoded.userId,
    }).lean();

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: order._id.toString(),
      serviceType: order.serviceType,
      details: order.details,
      price: order.price,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    await connectToDB();

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing or malformed" }, 
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const formData = await request.formData();
    const files = formData.getAll("files");
    const attachments = [];
    const uploadsDir = join(process.cwd(), "public/uploads");

    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error("Error creating uploads directory:", err);
    }

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
        const path = join(uploadsDir, fileName);

        await writeFile(path, buffer);
        attachments.push(`/uploads/${fileName}`);
      } catch (err) {
        console.error(`Error processing file ${file.name}:`, err);
      }
    }

    const order = new Order({
      serviceType: formData.get("serviceType"),
      details: {
        ...JSON.parse(formData.get("details")),
        attachments,
      },
      price: parseFloat(formData.get("price")),
      user: decoded.userId,
      status: "pending",
    });

    await order.save();

    return NextResponse.json(
      {
        orderId: order._id,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}