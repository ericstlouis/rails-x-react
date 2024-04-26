import Tasks from '@/components/tasks';
import TaskInput from '@/components/task-input';
import { ModeToggle } from '@/components/mode-toggle';
import * as todoApi from '@/utils/todoApi';
import { Task, TaskList } from '@/lib/types';

export default async function Home() {
  const data = await todoApi.getTasks();

  return (
    <main className="flex min-h-screen flex-col items-center px-20 py-8">
      <ModeToggle />
      <div className="w-full p-3">
        <h1 className="text-4xl font-bold text-center">Rails x React</h1>
        <br />
        <TaskInput />
        <br />
        <Tasks data={data as TaskList} />
      </div>
    </main>
  );
}

