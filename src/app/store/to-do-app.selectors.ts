import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStoreI } from './to-do-app.reducers';

export const selectTasks = createSelector(
  createFeatureSelector('toDoApp'),
  (state: AppStoreI) => {
    return state.tasks;
  }
);
