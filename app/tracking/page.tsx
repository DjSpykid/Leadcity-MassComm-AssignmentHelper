// app/tracking/page.tsx
"use client";

import { useOrderStore } from "@/store/useOder";
import { useState } from "react";



export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const { orders } = useOrderStore();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Order ID
        </label>
        <div className="flex">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 p-2 border rounded-l-md"
            placeholder="e.g. x7a9b3c"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md">
            Track
          </button>
        </div>
      </div>

      {order && (
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>

          <div className="space-y-4">
            <div>
              <span className="text-gray-600">Service:</span>
              <span className="ml-2 font-medium">{order.service}</span>
            </div>

            <div>
              <span className="text-gray-600">Status:</span>
              <span
                className={`ml-2 font-medium ${
                  order.status === "completed"
                    ? "text-green-600"
                    : order.status === "in-progress"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status.replace("-", " ")}
              </span>
            </div>

            <div>
              <span className="text-gray-600">Price:</span>
              <span className="ml-2 font-medium">₦{order.price}</span>
            </div>

            <div>
              <span className="text-gray-600">Date:</span>
              <span className="ml-2 font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="mt-8">
            <h3 className="font-medium mb-4">Progress</h3>
            <div className="space-y-4">
              {[
                "pending",
                "in-progress",
                "completed",
                "ready",
                "delivered",
              ].map((status) => (
                <div key={status} className="flex items-start">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                      order.status === status
                        ? "bg-indigo-600"
                        : ["completed", "ready", "delivered"].includes(
                            order.status
                          ) &&
                          [
                            "pending",
                            "in-progress",
                            "completed",
                            "ready",
                          ].indexOf(status) <=
                            [
                              "pending",
                              "in-progress",
                              "completed",
                              "ready",
                              "delivered",
                            ].indexOf(order.status)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  >
                    {order.status === status ? (
                      <span className="text-white text-sm">✓</span>
                    ) : null}
                  </div>
                  <div>
                    <div className="font-medium">
                      {status.replace("-", " ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {status === "pending" && "We received your order"}
                      {status === "in-progress" && "Working on your request"}
                      {status === "completed" && "Assignment is ready"}
                      {status === "ready" && "Ready for pickup/delivery"}
                      {status === "delivered" && "Completed"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
