import { render, screen } from "@testing-library/react";
import { TaskCard } from "@/components/tasks/task-card";
import type { Task } from "@/lib/types";

const mockTask: Task = {
  id: "tsk_1",
  title: "Test task title",
  description: "Test description",
  status: "pending",
  createdAt: "2026-02-08T10:00:00.000Z",
  updatedAt: "2026-02-08T10:00:00.000Z",
};

describe("TaskCard", () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  it("renders the task title", () => {
    render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText("Test task title")).toBeInTheDocument();
  });

  it("renders the task description", () => {
    render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText("Feb 8")).toBeInTheDocument();
  });

  it("renders the status badge", () => {
    render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("hides description when empty", () => {
    const taskNoDesc = { ...mockTask, description: "" };
    render(<TaskCard task={taskNoDesc} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });
});
