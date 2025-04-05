import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { reference } = await request.json();

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      return NextResponse.json({
        success: true,
        amount: response.data.data.amount / 100,
        reference: response.data.data.reference,
      });
    }

    return NextResponse.json({ error: "Payment failed" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Verification failed" },
      { status: 500 }
    );
  }
}
