import { Task } from '@/lib/types';

export const RAILS_API_URL = 'http://localhost:3000/api/v1/tasks';

//Basic CRUD operations this is the api for the tasks from the rails api

//Read 
export async function getTasks() {
  const res = await fetch(RAILS_API_URL, { next: { revalidate: 0 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

//Create
export const addTask = async (task: Task) => {
  const res = await fetch(RAILS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: task.title,
      completed: task.completed,
    }),
  });
  return res.json();
};

//Delete
export const deleteTask = async (id: Task['id']) => {
  const res = await fetch(`${RAILS_API_URL}/${id}`, {
    method: 'DELETE',
  });
  return { message: ' delete todo' };
};

//Update
export const updateTask = async (task: Task) => {
  const res = await fetch(`${RAILS_API_URL}/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: task.title,
    }),
  });
  return res.json();
};


