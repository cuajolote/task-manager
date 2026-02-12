import { render, screen } from "@testing-library/react";
import { RegisterForm } from "@/components/auth/register-form";

jest.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    register: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("RegisterForm", () => {
  it("renders the register title", () => {
    render(<RegisterForm />);
    expect(screen.getByText("Create account")).toBeInTheDocument();
  });

  it("renders all required fields", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("renders a link to login", () => {
    render(<RegisterForm />);
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });
});
