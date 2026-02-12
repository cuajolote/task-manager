import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import type { Task } from "@/lib/types";

const mockTask: Task = {
  id: "tsk_1",
  title: "Task to delete",
  description: "",
  status: "pending",
  createdAt: "2026-02-08T10:00:00.000Z",
  updatedAt: "2026-02-08T10:00:00.000Z",
};

describe("DeleteTaskDialog", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task title in the confirmation message", () => {
    render(
      <DeleteTaskDialog open={true} task={mockTask} onClose={onClose} onConfirm={onConfirm} />
    );
    expect(screen.getByText(/Task to delete/)).toBeInTheDocument();
  });

  it("renders Cancel and Delete buttons", () => {
    render(
      <DeleteTaskDialog open={true} task={mockTask} onClose={onClose} onConfirm={onConfirm} />
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    render(
      <DeleteTaskDialog open={true} task={mockTask} onClose={onClose} onConfirm={onConfirm} />
    );
    await userEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm with task id when Delete is clicked", async () => {
    render(
      <DeleteTaskDialog open={true} task={mockTask} onClose={onClose} onConfirm={onConfirm} />
    );
    await userEvent.click(screen.getByText("Delete"));
    expect(onConfirm).toHaveBeenCalledWith("tsk_1");
  });

  it("does not render content when closed", () => {
    render(
      <DeleteTaskDialog open={false} task={mockTask} onClose={onClose} onConfirm={onConfirm} />
    );
    expect(screen.queryByText("Delete task")).not.toBeInTheDocument();
  });
});
