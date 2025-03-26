// lib/api/orders.ts

import { Order, useOrderStore } from "@/store/useOder";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Creates a new order in the database
 * @param order Order data without auto-generated fields
 * @returns Promise with the created Order
 */
export const createOrder = async (
  order: Omit<Order, "id" | "createdAt" | "updatedAt">
): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

/**
 * Fetches all orders from the database and updates the store
 * @returns Promise that resolves when sync is complete
 */
export const syncOrders = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const orders: Order[] = await response.json();
  useOrderStore.setState({ orders });
};

/**
 * Updates an order's status
 * @param id Order ID
 * @param status New status
 */
export const updateOrderStatus = async (
  id: string,
  status: Order["status"]
): Promise<void> => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  // Update local store after successful API update
  useOrderStore.getState().updateOrderStatus(id, status);
};
