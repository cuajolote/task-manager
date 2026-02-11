import type { Task, User } from "@/lib/types";

// In-memory mock data — resets on server restart

interface DbUser extends User {
  password: string;
}

export const users: DbUser[] = [
  { id: "usr_1", name: "John Doe", email: "john@example.com", password: "password123" },
];

export const tasks: Task[] = [
  {
    id: "tsk_1",
    title: "Set up project structure",
    description: "Initialize the Next.js project with TypeScript and Tailwind CSS",
    status: "completed",
    createdAt: "2026-02-08T10:00:00.000Z",
    updatedAt: "2026-02-09T14:30:00.000Z",
  },
  {
    id: "tsk_2",
    title: "Implement authentication flow",
    description: "Add login and register pages with form validation",
    status: "in_progress",
    createdAt: "2026-02-09T09:00:00.000Z",
    updatedAt: "2026-02-09T09:00:00.000Z",
  },
  {
    id: "tsk_3",
    title: "Design database schema",
    description: "",
    status: "pending",
    createdAt: "2026-02-10T08:00:00.000Z",
    updatedAt: "2026-02-10T08:00:00.000Z",
  },
  {
    id: "tsk_4",
    title: "Write API documentation",
    description: "Document all endpoints with request/response examples",
    status: "pending",
    createdAt: "2026-02-10T11:00:00.000Z",
    updatedAt: "2026-02-10T11:00:00.000Z",
  },
];

let userCounter = users.length;
let taskCounter = tasks.length;

export const generateId = {
  user: () => `usr_${++userCounter}`,
  task: () => `tsk_${++taskCounter}`,
};

export const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export function createToken(userId: string, email: string) {
  return btoa(JSON.stringify({ sub: userId, email, iat: Date.now() }));
}

export function toSafeUser(user: DbUser): User {
  return { id: user.id, name: user.name, email: user.email };
}

export function setAuthCookie(response: Response, token: string) {
  (response as any).cookies?.set?.("auth-token", token, {
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
