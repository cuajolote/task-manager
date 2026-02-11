import { NextRequest, NextResponse } from "next/server";
import { delay, tasks } from "../../_db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/tasks/:id
export async function GET(_request: NextRequest, { params }: RouteParams) {
  await delay();
  const { id } = await params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ error: { message: "Task not found" } }, { status: 404 });
  }

  return NextResponse.json({ data: task });
}

// PUT /api/tasks/:id
export async function PUT(request: NextRequest, { params }: RouteParams) {
  await delay();
  const { id } = await params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: { message: "Task not found" } }, { status: 404 });
  }

  const body = await request.json();
  tasks[index] = { ...tasks[index], ...body, updatedAt: new Date().toISOString() };

  return NextResponse.json({ data: tasks[index] });
}

// DELETE /api/tasks/:id
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  await delay();
  const { id } = await params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: { message: "Task not found" } }, { status: 404 });
  }

  tasks.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}
