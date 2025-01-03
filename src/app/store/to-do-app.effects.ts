import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ToDoAppService } from '../services/to-do-app.service';
import { ToDoActions } from './actions/to-do-app.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { AppStoreI } from './reducers/to-do-app.reducers';
import { selectTasks } from './to-do-app.selectors';

@Injectable()
export class ToDoAppEffects {
  private actions$ = inject(Actions);
  private toDoAppService = inject(ToDoAppService);
  private store = inject(Store<AppStoreI>);

  LoadInitialTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.loadInitialTasks),
      switchMap(() =>
        this.toDoAppService.getInitialTasks().pipe(
          map((tasks) => ToDoActions.loadInitialTasksSuccess({ tasks: tasks })),
          catchError((err) =>
            of(ToDoActions.loadInitialTasksFailure(err.message))
          )
        )
      )
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.addTask),
      concatLatestFrom((action) => this.store.select(selectTasks)),
      switchMap(([action, taskList]) => {
        const newTaskList = [action.task, ...taskList];
        return this.toDoAppService.updateTaskList(newTaskList).pipe(
          map((tasks) => ToDoActions.addTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.editTaskFailure(err.message)))
        );
      })
    );
  });
  editTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.editTask),
      concatLatestFrom((action) => this.store.select(selectTasks)),
      switchMap(([action, taskList]) => {
        const { task } = action;
        const newTaskList = taskList.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        });
        return this.toDoAppService.updateTaskList(newTaskList).pipe(
          map((tasks) => ToDoActions.editTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.editTaskFailure(err.message)))
        );
      })
    );
  });
  deleteTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.deleteTask),
      concatLatestFrom((action) => this.store.select(selectTasks)),
      switchMap(([action, taskList]) => {
        const { id } = action;
        const newTaskList = taskList.filter((task) => task.id !== id);
        return this.toDoAppService.updateTaskList(newTaskList).pipe(
          map((tasks) => ToDoActions.deleteTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.deleteTaskFailure(err.message)))
        );
      })
    );
  });
}
