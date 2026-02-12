import { render, screen } from "@testing-library/react";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";

describe("TaskStatusBadge", () => {
  it("renders 'Pending' label for pending status", () => {
    render(<TaskStatusBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders 'In Progress' label for in_progress status", () => {
    render(<TaskStatusBadge status="in_progress" />);
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders 'Completed' label for completed status", () => {
    render(<TaskStatusBadge status="completed" />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
