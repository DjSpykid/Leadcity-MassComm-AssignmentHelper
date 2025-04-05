// app/api/paystack/initialize/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email, amount, metadata } = await request.json();
    
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Convert to kobo
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/student/orders/payment-callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Paystack initialization error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}