import { Injectable } from '@angular/core';
import { TASKS_STORED } from '../core/to-do.const';
import { Task } from '../shared/interfaces/task.interface';
import { BehaviorSubject, map, Observable, of, tap, timer } from 'rxjs';
import { taskMocks } from '../shared/mocks/task.mocks';

@Injectable({
  providedIn: 'root',
})
export class ToDoAppService {
  getInitialTasks(): Observable<Task[]> {
    return timer(2000).pipe(
      map(() => {
        const task = localStorage.getItem(TASKS_STORED);
        return task ? JSON.parse(task) : [];
      })
    );
  }
  updateTaskList(tasks: Task[]): Observable<Task[]> {
    return timer(2000).pipe(
      tap(() => {
        localStorage.setItem(TASKS_STORED, JSON.stringify(tasks));
      }),
      map(
        () => JSON.parse(localStorage.getItem(TASKS_STORED) || '[]') as Task[]
      )
    );
  }
}
