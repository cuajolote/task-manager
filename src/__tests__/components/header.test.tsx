import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

const mockLogout = jest.fn();

jest.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    user: { id: "usr_1", name: "John Doe", email: "john@example.com" },
    logout: mockLogout,
  }),
}));

describe("Header", () => {
  it("renders the app title", () => {
    render(<Header />);
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("renders the user initials", () => {
    render(<Header />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders the logout button", () => {
    render(<Header />);
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });
});
