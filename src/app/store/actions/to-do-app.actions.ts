import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task.interface';

//Todo: change actions group by responsability
export const ToDoActions = createActionGroup({
  source: 'To Do App',
  events: {
    'Get initial Date': emptyProps(),
    'Load initial tasks': emptyProps(),
    'Load initial tasks success': props<{ tasks: Task[] }>(),
    'Load initial tasks failure': props<{ error: string }>(),
    'Add task': props<{ task: Task }>(),
    'Add task success': props<{ tasks: Task[] }>(),
    'Add task failure': props<{ error: string }>(),
    'Edit task': props<{ task: Task }>(),
    'Edit task success': props<{ tasks: Task[] }>(),
    'Edit task failure': props<{ error: string }>(),
    'Delete task': props<{ id: number }>(),
    'Delete task success': props<{ tasks: Task[] }>(),
    'Delete task failure': props<{ error: string }>(),
  },
});
