"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteNotebookMenuProps {
  notebookId: string;
  className?: string;
}

export function DeleteNotebookMenu({
  notebookId,
  className,
}: DeleteNotebookMenuProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete notebook");

      // Show success notification
      toast.success("Notebook deleted successfully");

      setShowDialog(false);
      if (pathname === `/notebook/${notebookId}`) {
        router.push("/dashboard");
      } else {
        router.refresh();
      }
    } catch {
      // Show error notification
      toast.error("Failed to delete notebook");
      setShowDialog(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-0 opacity-70 group-hover:opacity-100"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              setShowDialog(true);
            }}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Notebook</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this notebook? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={deleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
