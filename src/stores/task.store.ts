import { create } from "zustand";
import type { Task, TaskStatus } from "@/lib/types";

interface TaskFilters {
  status: TaskStatus | "all";
  search: string;
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;

  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  setLoading: (loading: boolean) => void;
}

// Not persisted — tasks are fetched from the API on every mount.
// Keeps filters and loading state alongside the task list for co-located updates.
export const useTaskStore = create<TaskState>()((set) => ({
  tasks: [],
  filters: { status: "all", search: "" },
  isLoading: false,

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({ tasks: [task, ...state.tasks] })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  setLoading: (loading) => set({ isLoading: loading }),
}));
