import { Injectable } from '@angular/core';
import { TASKS_STORED } from '../core/to-do.const';
import { Task } from '../shared/interfaces/task.interface';
import { map, Observable, of, tap, timer } from 'rxjs';
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
  saveTask(task: Task): Observable<Task[]> {
    return of(task).pipe(
      tap(() => {
        const tasks: Task[] = JSON.parse(
          localStorage.getItem(TASKS_STORED) || '[]'
        );
        const updatedTasks = tasks.map((t) => ({ ...t, task }));
        localStorage.setItem(TASKS_STORED, JSON.stringify(updatedTasks));
      }),
      map(
        () => JSON.parse(localStorage.getItem(TASKS_STORED) || '[]') as Task[]
      )
    );
  }
  editTask(updatedTask: Task): Observable<Task[]> {
    return of(updatedTask).pipe(
      tap(() => {
        const tasks: Task[] = JSON.parse(
          localStorage.getItem(TASKS_STORED) || '[]'
        );
        const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
          localStorage.setItem(TASKS_STORED, JSON.stringify(tasks));
        } else {
          throw new Error('Task not found');
        }
      }),
      map(() => JSON.parse(localStorage.getItem(TASKS_STORED) || '[]'))
    );
  }
  deleteTask(taskId: number): Observable<Task[]> {
    return timer(2000).pipe(
      map(() => {
        const tasks = JSON.parse(localStorage.getItem(TASKS_STORED) || '[]');
        const newTasks = tasks.filter((task: Task) => task.id !== taskId);
        localStorage.setItem(TASKS_STORED, JSON.stringify(newTasks));
        return newTasks;
      })
    );
  }
}
