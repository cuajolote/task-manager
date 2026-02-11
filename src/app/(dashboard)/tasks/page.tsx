"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Task, TaskStatus } from "@/lib/types";

export default function TasksPage() {
  const {
    tasks,
    allTasks,
    isLoading,
    filters,
    setFilters,
    createTask,
    editTask,
    deleteTask,
  } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: {
    title: string;
    description?: string;
    status?: TaskStatus;
  }) => {
    if (editingTask) {
      await editTask(editingTask.id, data);
      toast.success("Task updated");
    } else {
      await createTask(data);
      toast.success("Task created");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    toast.success("Task deleted");
  };

  const counts = {
    total: allTasks.length,
    pending: allTasks.filter((t) => t.status === "pending").length,
    in_progress: allTasks.filter((t) => t.status === "in_progress").length,
    completed: allTasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {counts.total} total &middot; {counts.pending} pending &middot;{" "}
            {counts.in_progress} in progress &middot; {counts.completed} completed
          </p>
        </div>
        <Button onClick={handleCreate}>New Task</Button>
      </div>

      <TaskFilters
        status={filters.status}
        search={filters.search}
        onStatusChange={(status) => setFilters({ status })}
        onSearchChange={(search) => setFilters({ search })}
      />

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {filters.status !== "all" || filters.search
              ? "No tasks match your filters."
              : "No tasks yet."}
          </p>
          {!filters.search && filters.status === "all" && (
            <Button variant="link" onClick={handleCreate}>
              Create your first task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={setDeletingTask}
            />
          ))}
        </div>
      )}

      <TaskFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />

      <DeleteTaskDialog
        open={!!deletingTask}
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
