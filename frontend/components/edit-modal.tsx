import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenLine } from 'lucide-react';
import { Task } from '@/lib/types';
import { updateTask } from '@/app/action';
import { useState } from 'react';
import { toast } from 'sonner';

export function EditTaskModal({ task }: { task: Task }) {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    // Handle edit logic here
    try {
      await updateTask(updatedTask);
      toast.success('Task updated successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Something went wrong');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            <p>Edit your task here. Click save when you&apos;re done.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              id="title"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleEdit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

