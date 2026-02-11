"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskStatusBadge } from "./task-status-badge";
import type { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1 flex-1 min-w-0 pr-2">
          <CardTitle className="text-base truncate">{task.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TaskStatusBadge status={task.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="text-lg leading-none">&#8943;</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(task)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
