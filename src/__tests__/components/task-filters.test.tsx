import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskFilters } from "@/components/tasks/task-filters";

describe("TaskFilters", () => {
  const defaultProps = {
    status: "all" as const,
    search: "",
    onStatusChange: jest.fn(),
    onSearchChange: jest.fn(),
  };

  it("renders the search input", () => {
    render(<TaskFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search tasks...")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", async () => {
    const onSearchChange = jest.fn();
    render(<TaskFilters {...defaultProps} onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText("Search tasks...");
    await userEvent.type(input, "test");

    expect(onSearchChange).toHaveBeenCalled();
  });

  it("displays the current search value", () => {
    render(<TaskFilters {...defaultProps} search="my search" />);
    expect(screen.getByDisplayValue("my search")).toBeInTheDocument();
  });
});
