import type { Task, DbUser, User, TokenPayload } from "@/lib/types";

// In-memory mock data — resets on server restart

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

let userCounter: number = users.length;
let taskCounter: number = tasks.length;

export const generateId = {
  user: (): string => `usr_${++userCounter}`,
  task: (): string => `tsk_${++taskCounter}`,
};

// Simulates network latency for a realistic feel
export const delay = (ms: number = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Simulated JWT — base64-encoded payload without real cryptographic signing
export function createToken(userId: string, email: string): string {
  const payload: TokenPayload = { sub: userId, email, iat: Date.now() };
  return btoa(JSON.stringify(payload));
}

// Strips password before sending user data to the client
export function toSafeUser(user: DbUser): User {
  return { id: user.id, name: user.name, email: user.email };
}
