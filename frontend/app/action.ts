'use server';

import * as todoApi from '@/utils/todoApi';
import { Task } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createTask = async (formData: FormData) => {
  const schema = z.object({
    title: z.string().min(3),
    // completed: z.boolean(),
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    // completed: formData.get('completed'),
  });

  if (!parse.success) {
    return { message: 'Failed to create todo' };
  }

  const data = parse.data;
  console.log(parse.data);

  try {
    const res = await todoApi.addTask({
      title: data.title,
      completed: false,
    });
    revalidatePath('/');
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (task: Task) => {
  const schema = z.object({
    id: z.number(),
    title: z.string(),
  });

  const parse = schema.safeParse({
    id: task.id,
    title: task.title,
  });

  const data = parse.data;
  console.log(data?.id);

  try {
    await todoApi.deleteTask(data?.id);
    revalidatePath('/');
    return { message: 'Todo Deleted successfully' };
  } catch (error) {
    return { message: 'Failed to delete todo' };
  }
};

export const updateTask = async (task: Task) => {
  const schema = z.object({
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
  });
  const parse = schema.safeParse({
    id: task.id,
    title: task.title,
    completed: task.completed,
  });
  const data = parse.data;
  if (data) {
    const { id, title } = data;
    const updatedData = { id, title, completed: false }; // Assuming you want to set `completed` to false

    console.log(updatedData);
    try {
      await todoApi.updateTask(updatedData);
      revalidatePath('/');
      return { message: 'Todo Updated successfully' };
    } catch (error) {
      console.error('Error updating todo:', error);
      return { error: 'Failed to update todo' };
    }
  } else {
    return { error: 'Invalid data' };
  }
};

