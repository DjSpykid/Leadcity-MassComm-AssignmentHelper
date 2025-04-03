// components/admin/AdminNavbar.tsx
"use client";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800"
      >
        Logout
      </button>
    </header>
  );
}
