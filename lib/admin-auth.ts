// lib/admin-auth.ts
import { cookies } from "next/headers";

export async function setAdminToken() {
  await cookies().set("admin-token", process.env.ADMIN_SECRET_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin-token")?.value;
  return token === process.env.ADMIN_SECRET_TOKEN;
}

export async function deleteAdminToken() {
  await cookies().delete("admin-token");
}
