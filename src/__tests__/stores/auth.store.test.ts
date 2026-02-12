import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/lib/types";

const mockUser: User = {
  id: "usr_1",
  name: "John Doe",
  email: "john@example.com",
};

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it("should start unauthenticated", () => {
    const { isAuthenticated, user, token } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
    expect(token).toBeNull();
  });

  it("should set auth state on login", () => {
    useAuthStore.getState().setAuth(mockUser, "fake-token-123");

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe("fake-token-123");
    expect(isAuthenticated).toBe(true);
  });

  it("should clear auth state on logout", () => {
    useAuthStore.getState().setAuth(mockUser, "fake-token-123");
    useAuthStore.getState().logout();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});
