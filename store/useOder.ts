// lib/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ServiceType =
  | "complete"
  | "print-bind"
  | "print"
  | "bind"
  | "custom";

export type OrderStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "ready"
  | "delivered";

export interface Order {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  service: ServiceType;
  serviceName: string;
  details: string;
  files: string[]; // URLs or file paths
  pages?: number;
  urgency: boolean;
  price: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (
    order: Omit<
      Order,
      "id" | "status" | "paymentStatus" | "createdAt" | "updatedAt"
    >
  ) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updatePaymentStatus: (
    id: string,
    status: "pending" | "paid" | "failed"
  ) => void;
  addOrderNote: (id: string, note: string) => void;
  findOrder: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getPendingOrders: () => Order[];
  getCompletedOrders: () => Order[];
  searchOrders: (query: string) => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: generateOrderId(),
          status: "pending",
          paymentStatus: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        return newOrder;
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                  updatedAt: new Date(),
                }
              : order
          ),
        }));
      },

      updatePaymentStatus: (id, paymentStatus) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  paymentStatus,
                  updatedAt: new Date(),
                }
              : order
          ),
        }));
      },

      addOrderNote: (id, note) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  notes: order.notes
                    ? `${order.notes}\n${new Date().toLocaleString()}: ${note}`
                    : `${new Date().toLocaleString()}: ${note}`,
                  updatedAt: new Date(),
                }
              : order
          ),
        }));
      },

      findOrder: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status);
      },

      getPendingOrders: () => {
        return get().orders.filter(
          (order) =>
            order.status === "pending" || order.status === "in-progress"
        );
      },

      getCompletedOrders: () => {
        return get().orders.filter(
          (order) =>
            order.status === "completed" || order.status === "delivered"
        );
      },

      searchOrders: (query) => {
        const q = query.toLowerCase();
        return get().orders.filter(
          (order) =>
            order.studentName.toLowerCase().includes(q) ||
            order.studentEmail.toLowerCase().includes(q) ||
            order.id.toLowerCase().includes(q) ||
            order.serviceName.toLowerCase().includes(q)
        );
      },
    }),
    {
      name: "assignment-orders-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage), // or sessionStorage
      // Optional: Only persist certain fields
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);

// Helper function to generate more readable order IDs
function generateOrderId(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "23456789";
  const datePart = new Date().getTime().toString().slice(-4);

  let id = "ORD-";
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  id += "-";
  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  id += `-${datePart}`;

  return id;
}
