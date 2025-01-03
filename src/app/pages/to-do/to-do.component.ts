import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActionsComponent } from '../../components/actions/actions.component';
import { TaskComponent } from '../../components/task/task.component';

import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStoreI } from '../../store/reducers/to-do-app.reducers';
import { selectTasks } from '../../store/to-do-app.selectors';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModalComponent } from '../../components/create-task-modal/create-task-modal.component';
import { BehaviorSubject, combineLatest, filter, map, pipe } from 'rxjs';
import { ToDoActions } from '../../store/actions/to-do-app.actions';
import { Task } from '../../shared/interfaces/task.interface';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [ActionsComponent, TaskComponent, AsyncPipe],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent {
  store = inject(Store<AppStoreI>);
  _matDialog = inject(MatDialog);

  tasksList$ = this.store.select(selectTasks);
  private filterTask = new BehaviorSubject<string>('');
  filterTask$ = this.filterTask.asObservable();

  vm$ = combineLatest([this.tasksList$, this.filterTask$]).pipe(
    map(([tasks, filter]) => {
      if (filter.length === 0) {
        return tasks;
      }
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(filter.toLowerCase())
      );
    })
  );

  filterList(filter: string) {
    console.log('filter', filter);
    this.filterTask.next(filter);
  }

  createTask() {
    this._matDialog
      .open(CreateTaskModalComponent, {
        width: '500px',
        panelClass: 'custom-container-no-padding',
      })
      .afterClosed()
      .pipe(filter((task) => !!task))
      .subscribe((task) => {
        this.store.dispatch(ToDoActions.addTask({ task }));
      });
  }

  deleteTask(id: number) {
    this.store.dispatch(ToDoActions.deleteTask({ id }));
  }
  editTask(task: Task) {
    this.store.dispatch(ToDoActions.editTask({ task }));
  }
}
