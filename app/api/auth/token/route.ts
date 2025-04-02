// app/api/auth/token/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// app/api/auth/token/route.ts
export async function GET(request: Request) {
  try {
    // First try to get token from cookies
    const cookieHeader = request.headers.get("cookie") || "";
    const cookieToken = cookieHeader.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    if (cookieToken) {
      return NextResponse.json({ token: cookieToken });
    }

    // Fallback to Authorization header
    const authHeader = request.headers.get("Authorization");
    const headerToken = authHeader?.split(" ")[1];

    if (headerToken) {
      return NextResponse.json({ token: headerToken });
    }

    return NextResponse.json(
      { error: "Authorization token required" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}