import { Task } from '../interfaces/task.interface';

export const taskMocks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    due_date: new Date(),
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    due_date: new Date(),
    completed: true,
  },
];
