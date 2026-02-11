// -- Task --

export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

// -- User & Auth --

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DbUser extends User {
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
}

// -- API --

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: { message: string };
}
