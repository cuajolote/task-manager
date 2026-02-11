import { useCallback, useEffect, useMemo } from "react";
import { useTaskStore } from "@/stores/task.store";
import { apiClient } from "@/lib/api-client";
import type { Task, CreateTaskInput, UpdateTaskInput, ApiResponse } from "@/lib/types";

export function useTasks() {
  const {
    tasks,
    filters,
    isLoading,
    setTasks,
    addTask,
    updateTask,
    removeTask,
    setLoading,
    setFilters,
  } = useTaskStore();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<ApiResponse<Task[]>>("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [setTasks, setLoading]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (input: CreateTaskInput) => {
    const res = await apiClient.post<ApiResponse<Task>>("/api/tasks", input);
    addTask(res.data);
    return res.data;
  };

  const editTask = async (id: string, input: UpdateTaskInput) => {
    const res = await apiClient.put<ApiResponse<Task>>(`/api/tasks/${id}`, input);
    updateTask(id, res.data);
    return res.data;
  };

  const deleteTask = async (id: string) => {
    await apiClient.delete(`/api/tasks/${id}`);
    removeTask(id);
  };

  // client-side filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesSearch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filters]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    isLoading,
    filters,
    setFilters,
    createTask,
    editTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
