"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskStatus } from "@/lib/types";

interface TaskFiltersProps {
  status: TaskStatus | "all";
  search: string;
  onStatusChange: (status: TaskStatus | "all") => void;
  onSearchChange: (search: string) => void;
}

export function TaskFilters({
  status,
  search,
  onStatusChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-xs"
      />
      <Select value={status} onValueChange={(v) => onStatusChange(v as TaskStatus | "all")}>
        <SelectTrigger className="sm:w-[160px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
