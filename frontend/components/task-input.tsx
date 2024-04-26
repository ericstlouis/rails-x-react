'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Task } from '@/lib/types';
import { createTask } from '@/app/action';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';

const initialState = {
  title: '',
  completed: false,
};

const TaskInput = () => {
  const status = useFormStatus();
  const onSubmit = async (data: FormData) => {
    try {
      const promise = await createTask(data);
      toast.success('Task created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create task');
    }
  };

  return (
    <form action={onSubmit} className="flex h-10 justify-between items-center">
      <Textarea
        placeholder="Enter your task"
        className="w-4/5 min-h-14 resize-none"
        name="title"
        id="title"
      />
      <Button type="submit" className="w-2/12 min-h-14">
        <Plus />
      </Button>
    </form>
  );
};

export default TaskInput;

