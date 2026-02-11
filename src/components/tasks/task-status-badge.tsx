import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/lib/types";

const statusConfig: Record<TaskStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  pending: { label: "Pending", variant: "outline" },
  in_progress: { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
