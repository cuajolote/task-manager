import { useTaskStore } from "@/stores/task.store";
import type { Task } from "@/lib/types";

const mockTask: Task = {
  id: "task-1",
  title: "Test task",
  description: "A test description",
  status: "pending",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

const mockTask2: Task = {
  id: "task-2",
  title: "Another task",
  description: "",
  status: "completed",
  createdAt: "2025-01-02T00:00:00.000Z",
  updatedAt: "2025-01-02T00:00:00.000Z",
};

describe("useTaskStore", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      filters: { status: "all", search: "" },
      isLoading: false,
    });
  });

  it("should start with an empty task list", () => {
    const { tasks } = useTaskStore.getState();
    expect(tasks).toEqual([]);
  });

  it("should set tasks", () => {
    useTaskStore.getState().setTasks([mockTask, mockTask2]);

    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].id).toBe("task-1");
  });

  it("should add a task to the beginning of the list", () => {
    useTaskStore.getState().setTasks([mockTask]);
    useTaskStore.getState().addTask(mockTask2);

    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].id).toBe("task-2");
  });

  it("should update a task by id", () => {
    useTaskStore.getState().setTasks([mockTask]);
    useTaskStore.getState().updateTask("task-1", { status: "completed", title: "Updated" });

    const { tasks } = useTaskStore.getState();
    expect(tasks[0].status).toBe("completed");
    expect(tasks[0].title).toBe("Updated");
    expect(tasks[0].description).toBe("A test description");
  });

  it("should remove a task by id", () => {
    useTaskStore.getState().setTasks([mockTask, mockTask2]);
    useTaskStore.getState().removeTask("task-1");

    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe("task-2");
  });

  it("should update filters", () => {
    useTaskStore.getState().setFilters({ status: "completed" });

    const { filters } = useTaskStore.getState();
    expect(filters.status).toBe("completed");
    expect(filters.search).toBe("");
  });

  it("should toggle loading state", () => {
    useTaskStore.getState().setLoading(true);
    expect(useTaskStore.getState().isLoading).toBe(true);

    useTaskStore.getState().setLoading(false);
    expect(useTaskStore.getState().isLoading).toBe(false);
  });
});
