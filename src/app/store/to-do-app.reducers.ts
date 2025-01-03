// import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { createReducer, on } from '@ngrx/store';
import { Task } from '../shared/interfaces/task.interface';

import { ToDoActions } from './actions/to-do-app.actions';

export interface AppStoreI {
  today: Date;
  tasks: Task[];
}
export const initialTackState: AppStoreI = {
  today: new Date(),
  tasks: [],
};

export const toDoAppReducers = createReducer(
  initialTackState,
  on(ToDoActions.getInitialDate, (state) => ({ ...state, today: new Date() })),
  on(ToDoActions.loadInitialTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),
  on(ToDoActions.addTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),
  on(ToDoActions.deleteTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),
  on(ToDoActions.editTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
  }))
);
