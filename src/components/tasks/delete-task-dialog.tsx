"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/types";

interface DeleteTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteTaskDialog({ open, task, onClose, onConfirm }: DeleteTaskDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!task) return;
    setIsDeleting(true);
    try {
      await onConfirm(task.id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{task?.title}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
