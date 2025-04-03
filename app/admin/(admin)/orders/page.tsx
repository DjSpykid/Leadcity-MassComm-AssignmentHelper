// app/admin/(admin)/orders/page.tsx

import OrderTable from "../../../../components/admin/OrderTable";




export default function OrdersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="bg-white p-4 rounded shadow">
        <OrderTable />
      </div>
    </div>
  );
}
