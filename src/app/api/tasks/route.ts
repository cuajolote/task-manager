import { NextRequest, NextResponse } from "next/server";
import { delay, tasks, generateId } from "../_db";
import type { CreateTaskInput, Task } from "@/lib/types";

// GET /api/tasks
export async function GET(request: NextRequest) {
  await delay();

  const status: string | null = request.nextUrl.searchParams.get("status");
  let filtered: Task[] = [...tasks];

  if (status && status !== "all") {
    filtered = filtered.filter((t) => t.status === status);
  }

  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ data: filtered });
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  await delay();

  const { title, description }: CreateTaskInput = await request.json();
  const now = new Date().toISOString();

  const task = {
    id: generateId.task(),
    title,
    description: description ?? "",
    status: "pending" as const,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);
  return NextResponse.json({ data: task }, { status: 201 });
}
