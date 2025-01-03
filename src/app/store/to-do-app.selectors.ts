import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStoreI } from './reducers/to-do-app.reducers';

export const selectFeature = createFeatureSelector<AppStoreI>('toDoApp');

export const selectTasks = createSelector(selectFeature, (state: AppStoreI) => {
  if (!state || !state.tasks || !Array.isArray(state.tasks)) {
    return [];
  }
  const incompleteTasks = state.tasks
    .filter((task) => !task.completed)
    .map((task) => {
      const isPastDue = new Date(task.due_date) < state.today;
      return { ...task, isPastDue };
    });
  const completedTasks = state.tasks.filter((task) => task.completed);
  return [...incompleteTasks, ...completedTasks];
});

export const selectDate = createSelector(selectFeature, (state: AppStoreI) => {
  return state.today;
});

export const selectLoading = createSelector(
  selectFeature,
  (state: AppStoreI) => {
    return state.isLoading;
  }
);
