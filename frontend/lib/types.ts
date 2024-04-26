import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskListSchema = z.array(TaskSchema);

export type TaskList = z.infer<typeof TaskListSchema>;