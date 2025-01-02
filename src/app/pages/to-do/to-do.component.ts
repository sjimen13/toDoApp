import { Component, inject } from '@angular/core';
import { ActionsComponent } from '../../components/actions/actions.component';
import { TaskComponent } from '../../components/task/task.component';
import { Task } from '../../shared/interfaces/task.interface';
import { taskMocks } from '../../shared/mocks/task.mocks';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStoreI } from '../../store/to-do-app.reducers';
import { selectTasks } from '../../store/to-do-app.selectors';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [ActionsComponent, TaskComponent, AsyncPipe],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
})
export class ToDoComponent {
  store = inject(Store<AppStoreI>);
  tasksList$ = this.store.select(selectTasks);
}
