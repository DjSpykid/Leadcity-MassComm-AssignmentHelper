import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. Properly await cookies() - THIS IS THE FIX
    const cookieStore = await cookies(); // Added await here
    const cookieToken = cookieStore.get("token")?.value;

    if (cookieToken) {
      return NextResponse.json({
        token: cookieToken,
        source: "cookie",
      });
    }

    // 2. Check Authorization header
    const authHeader = request.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (headerToken) {
      return NextResponse.json({
        token: headerToken,
        source: "header",
      });
    }

    // 3. No token found
    return NextResponse.json(
      {
        error: "No active session found",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Token endpoint error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}