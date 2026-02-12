import { loginSchema, registerSchema } from "@/lib/validations/auth.schema";

describe("loginSchema", () => {
  it("should validate correct credentials", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a short password", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "12345",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty fields", () => {
    const result = loginSchema.safeParse({ email: "", password: "" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    confirmPassword: "password123",
  };

  it("should validate correct registration data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject when passwords don't match", () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
  });

  it("should reject a short name", () => {
    const result = registerSchema.safeParse({ ...validData, name: "J" });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid email", () => {
    const result = registerSchema.safeParse({ ...validData, email: "bad" });
    expect(result.success).toBe(false);
  });
});
