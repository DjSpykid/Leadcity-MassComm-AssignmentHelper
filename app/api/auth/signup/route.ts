// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/db/models";
import { connectToDB } from "../../../../lib/db/connect";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, email, password, phone } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      role: "student",
    });

    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
