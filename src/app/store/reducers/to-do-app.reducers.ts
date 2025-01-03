// import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { createReducer, on } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task.interface';

import { ToDoActions } from '../actions/to-do-app.actions';

export interface AppStoreI {
  today: Date;
  tasks: Task[];
  isLoading?: boolean;
}
export const initialTackState: AppStoreI = {
  today: new Date(),
  tasks: [],
  isLoading: false,
};

export const toDoAppReducers = createReducer(
  initialTackState,
  on(ToDoActions.getInitialDate, (state) => ({ ...state, today: new Date() })),
  on(ToDoActions.loadInitialTasks, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ToDoActions.loadInitialTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    isLoading: false,
  })),
  on(ToDoActions.addTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ToDoActions.addTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    isLoading: false,
  })),
  on(ToDoActions.deleteTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ToDoActions.deleteTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    isLoading: false,
  })),
  on(ToDoActions.editTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ToDoActions.editTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
    isLoading: false,
  }))
);
