import { createTaskSchema, updateTaskSchema } from "@/lib/validations/task.schema";

describe("createTaskSchema", () => {
  it("should validate a correct input", () => {
    const result = createTaskSchema.safeParse({
      title: "My task",
      description: "Some description",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("My task");
    }
  });

  it("should require a title", () => {
    const result = createTaskSchema.safeParse({ title: "" });
    expect(result.success).toBe(false);
  });

  it("should reject a title longer than 100 characters", () => {
    const result = createTaskSchema.safeParse({
      title: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("should reject a description longer than 500 characters", () => {
    const result = createTaskSchema.safeParse({
      title: "Valid title",
      description: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("should default description to empty string when omitted", () => {
    const result = createTaskSchema.safeParse({ title: "No desc" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe("");
    }
  });
});

describe("updateTaskSchema", () => {
  it("should allow partial updates", () => {
    const result = updateTaskSchema.safeParse({ status: "completed" });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("completed");
      expect(result.data.title).toBeUndefined();
    }
  });

  it("should reject invalid status values", () => {
    const result = updateTaskSchema.safeParse({ status: "invalid" });
    expect(result.success).toBe(false);
  });
});
