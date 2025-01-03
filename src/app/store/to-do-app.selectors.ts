import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStoreI } from './to-do-app.reducers';

export const selectFeature = createFeatureSelector<AppStoreI>('toDoApp');

export const selectTasks = createSelector(selectFeature, (state: AppStoreI) => {
  if (!state || !state.tasks || !Array.isArray(state.tasks)) {
    return []; // Handle null/undefined or non-array cases
  }
  const incompleteTasks = state.tasks.filter((task) => !task.completed);
  const completedTasks = state.tasks.filter((task) => task.completed);
  return [...incompleteTasks, ...completedTasks];
});
export const selectDate = createSelector(selectFeature, (state: AppStoreI) => {
  return state.today;
});
