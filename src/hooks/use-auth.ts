import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { apiClient } from "@/lib/api-client";
import type { AuthResponse, ApiResponse } from "@/lib/types";

/**
 * Handles the full auth lifecycle: login, register, and logout.
 * On success stores user + token in Zustand and redirects to /tasks.
 */
export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, logout: clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiClient.post<ApiResponse<AuthResponse>>("/api/auth/login", {
        email,
        password,
      });
      setAuth(res.data.user, res.data.token);
      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiClient.post<ApiResponse<AuthResponse>>("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword: password,
      });
      setAuth(res.data.user, res.data.token);
      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await apiClient.post("/api/auth/logout", {});
    clearAuth();
    router.push("/login");
  };

  return { user, isAuthenticated, isLoading, error, login, register, logout };
}
