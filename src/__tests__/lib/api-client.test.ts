import { apiClient } from "@/lib/api-client";

// Mock the auth store to return a token
jest.mock("@/stores/auth.store", () => ({
  useAuthStore: {
    getState: () => ({ token: "test-token" }),
  },
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("apiClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("should make a GET request", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: [1, 2, 3] }),
    });

    const result = await apiClient.get("/api/tasks");

    expect(mockFetch).toHaveBeenCalledWith("/api/tasks", {
      headers: expect.objectContaining({
        "Content-Type": "application/json",
        Authorization: "Bearer test-token",
      }),
    });
    expect(result).toEqual({ data: [1, 2, 3] });
  });

  it("should make a POST request with body", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve({ data: { id: "1" } }),
    });

    await apiClient.post("/api/tasks", { title: "New task" });

    expect(mockFetch).toHaveBeenCalledWith("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: "New task" }),
      headers: expect.objectContaining({
        "Content-Type": "application/json",
      }),
    });
  });

  it("should throw on error responses", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: { message: "Not found" } }),
    });

    await expect(apiClient.get("/api/tasks/999")).rejects.toThrow("Not found");
  });

  it("should handle 204 No Content", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await apiClient.delete("/api/tasks/1");
    expect(result).toBeUndefined();
  });
});
