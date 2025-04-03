"use client";

export default function OrderStatusBadge({ status }: { status: string }) {
  const statusClasses = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    SUBMITTED: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`ml-2 px-2 py-1 rounded text-xs ${
        statusClasses[status as keyof typeof statusClasses]
      }`}
    >
      {status}
    </span>
  );
}
