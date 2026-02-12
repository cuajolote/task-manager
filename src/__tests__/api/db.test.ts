import { generateId, createToken, toSafeUser } from "@/app/api/_db";
import type { DbUser } from "@/lib/types";

describe("generateId", () => {
  it("should generate sequential user IDs", () => {
    const id1 = generateId.user();
    const id2 = generateId.user();
    expect(id1).toMatch(/^usr_\d+$/);
    expect(id2).toMatch(/^usr_\d+$/);
    expect(id1).not.toBe(id2);
  });

  it("should generate sequential task IDs", () => {
    const id1 = generateId.task();
    const id2 = generateId.task();
    expect(id1).toMatch(/^tsk_\d+$/);
    expect(id2).toMatch(/^tsk_\d+$/);
    expect(id1).not.toBe(id2);
  });
});

describe("createToken", () => {
  it("should return a base64 encoded string", () => {
    const token = createToken("usr_1", "john@example.com");
    const decoded = JSON.parse(atob(token));

    expect(decoded.sub).toBe("usr_1");
    expect(decoded.email).toBe("john@example.com");
    expect(decoded.iat).toBeDefined();
  });
});

describe("toSafeUser", () => {
  it("should strip the password from a DbUser", () => {
    const dbUser: DbUser = {
      id: "usr_1",
      name: "John Doe",
      email: "john@example.com",
      password: "secret",
    };

    const safeUser = toSafeUser(dbUser);
    expect(safeUser).toEqual({
      id: "usr_1",
      name: "John Doe",
      email: "john@example.com",
    });
    expect(safeUser).not.toHaveProperty("password");
  });
});
