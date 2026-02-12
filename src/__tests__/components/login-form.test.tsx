import { render, screen } from "@testing-library/react";
import { LoginForm } from "@/components/auth/login-form";

const mockLogin = jest.fn();

jest.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
    error: null,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("LoginForm", () => {
  it("renders the login title and submit button", () => {
    render(<LoginForm />);
    const matches = screen.getAllByText("Log in");
    expect(matches.length).toBeGreaterThanOrEqual(2); // title + button
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders the demo credentials", () => {
    render(<LoginForm />);
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
  });

  it("renders a link to register", () => {
    render(<LoginForm />);
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
