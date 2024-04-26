'use client';
import React from 'react';
import { Task, TaskList } from '../lib/types';

import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { Trash, PenLine } from 'lucide-react';
import { deleteTask } from '@/app/action';
import { toast } from 'sonner';
import { EditTaskModal } from './edit-modal';


function Tasks({ data }: { data: TaskList }) {
  console.log(data); // Access 'data' property first

  const handleDelete = async (task: Task) => {
    // Handle the deletion of a task
    try {
      await deleteTask(task);
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <Separator />
      </CardHeader>
      {data.map((task) => (
        <CardContent key={task.id} className="grid gap-8">
          <div className="flex items-center gap-4 justify-between">
            <div className="grid gap-1 ">
              <p className="text-sm font-medium leading-none">{task.title}</p>
            </div>
            <div className="flex gap-4">
              <EditTaskModal task={task} />
              <Button className="" onClick={() => handleDelete(task)}>
                <Trash />
              </Button>
            </div>
          </div>
          <Separator />
        </CardContent>
      ))}
    </Card>
  );
}

export default Tasks;



