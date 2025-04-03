// app/admin/(admin)/page.tsx
export default async function AdminDashboard() {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Orders</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Pending Orders</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Completed Orders</h3>
          <p className="text-2xl">0</p>
        </div>
      </div>
    </div>
  );
}
