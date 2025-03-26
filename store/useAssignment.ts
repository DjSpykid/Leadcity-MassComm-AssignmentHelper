import create from "zustand";

interface AssignmentStore {
  assignments: any[];
  setAssignments: (assignments: any[]) => void;
  addAssignment: (assignment: any) => void;
  orders: any[];
  setOrders: (orders: any[]) => void;
}

export const useAssignment = create<AssignmentStore>((set) => ({
  assignments: [],
  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [...state.assignments, assignment],
    })),
  orders: [],
  setOrders: (orders) => set({ orders }),
}));
