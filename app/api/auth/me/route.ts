// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import jwt from "jsonwebtoken";
import { User } from "@/lib/db/models";

export async function GET(request: Request) {
  try {
    await connectToDB();

    // Get token from either Authorization header or cookies
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      // Fallback to cookie parsing
      const cookieHeader = request.headers.get("cookie") || "";
      token = cookieHeader
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
    }

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Verify token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}