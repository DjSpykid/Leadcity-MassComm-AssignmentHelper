// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { deleteAdminToken } from "@/lib/admin-auth";

export async function POST() {
  await deleteAdminToken();
  return NextResponse.json({ success: true });
}
