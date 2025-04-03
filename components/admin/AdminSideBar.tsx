// components/admin/AdminSidebar.tsx
import Link from "next/link";


export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Users
            </Link>
          </li>
          <li>
            <form
            >
              <button
                type="submit"
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
