import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToDoAppService } from '../services/to-do-app.service';
import { ToDoActions } from './actions/to-do-app.actions';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';

@Injectable()
export class ToDoAppEffects {
  private actions$ = inject(Actions);
  private toDoAppService = inject(ToDoAppService);

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
  saveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.addTask),
      switchMap((action) => {
        const { task } = action;
        return this.toDoAppService.saveTask(task).pipe(
          map((tasks) => ToDoActions.addTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.editTaskFailure(err.message)))
        );
      })
    );
  });
  editTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.editTask),
      switchMap((action) => {
        const { task } = action;
        return this.toDoAppService.editTask(task).pipe(
          map((tasks) => ToDoActions.editTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.editTaskFailure(err.message)))
        );
      })
    );
  });
  deleteTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.deleteTask),
      switchMap((action) => {
        const { id } = action;
        return this.toDoAppService.deleteTask(id).pipe(
          map((tasks) => ToDoActions.deleteTaskSuccess({ tasks: tasks })),
          catchError((err) => of(ToDoActions.deleteTaskFailure(err.message)))
        );
      })
    );
  });
}
