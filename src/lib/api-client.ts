import { useAuthStore } from "@/stores/auth.store";
import type { ApiErrorResponse } from "./types";

// Empty base URL — API routes live on the same Next.js origin
const BASE_URL = "";

/**
 * Centralized HTTP client that wraps fetch with auth headers and error handling.
 * Reads the JWT token directly from Zustand (outside React) to attach it on every request.
 */
class ApiClient {
  private getToken(): string | null {
    // Access store outside React via getState() — avoids prop drilling the token
    return useAuthStore.getState().token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody: ApiErrorResponse = await response.json();
      throw new Error(errorBody.error.message);
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
